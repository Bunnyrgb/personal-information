'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DocumentItem } from '@/types';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import {
  Clock,
  AlertTriangle,
  FileText,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export default function ExpiryIntelligencePage() {
  const { documents } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const activeDocs = documents.filter((d) => !d.isTrash);
  const expiringDocs = activeDocs.filter(
    (d) => d.extractedEntities.expiryDate || d.name.toLowerCase().includes('bill') || d.name.toLowerCase().includes('insurance')
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-amber-400" />
            <span>Expiry & Renewal Intelligence</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automated timeline alerts detecting passport renewals, insurance policies, and utility invoice deadlines.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 self-start sm:self-auto">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{expiringDocs.length} Tracked Validities</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
        <div>
          <strong className="text-white">How Expiry Intelligence Works:</strong> During ingestion, our OCR pipeline extracts contextual dates tagged with "Valid Until", "Due Date", "Period of Insurance", or "Date of Expiry". These are indexed into your personal lifecycle calendar.
        </div>
      </div>

      {/* List of Tracked Expiring Documents */}
      <div className="space-y-4">
        {expiringDocs.map((doc) => {
          const isBill = doc.category === 'Bills';
          const isInsurance = doc.category === 'Insurance';
          const isPassport = doc.name.toLowerCase().includes('passport');

          const expiryText = doc.extractedEntities.expiryDate || (isBill ? 'Due: 24 Oct 2025' : 'Active');
          const badgeClass = isBill
            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            : isInsurance
            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';

          return (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-semibold text-white">{doc.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                      {doc.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${badgeClass}`}>
                      {expiryText}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    {doc.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(doc)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Verify Validity</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={selectedDoc}
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
