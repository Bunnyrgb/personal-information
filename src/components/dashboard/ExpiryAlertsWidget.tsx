'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { DocumentItem } from '@/types';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import {
  Clock,
  AlertTriangle,
  Calendar,
  FileText,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export function ExpiryAlertsWidget() {
  const { documents } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const activeDocs = documents.filter((d) => !d.isTrash);
  const expiringDocs = activeDocs.filter(
    (d) => d.extractedEntities.expiryDate || d.name.toLowerCase().includes('bill') || d.name.toLowerCase().includes('insurance')
  );

  if (expiringDocs.length === 0) return null;

  return (
    <>
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Smart Expiry & Renewal Intelligence</h3>
              <p className="text-[11px] text-slate-400">AI monitors validities, renewals, and due dates across your vault</p>
            </div>
          </div>

          <Link
            href="/dashboard/expiry"
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {expiringDocs.slice(0, 3).map((doc) => {
            const isBill = doc.category === 'Bills';
            const isInsurance = doc.category === 'Insurance';
            const isPassport = doc.name.toLowerCase().includes('passport');

            const expiryText = doc.extractedEntities.expiryDate || (isBill ? 'Due: 24 Oct 2025' : 'Active');
            const alertColor = isBill
              ? 'border-amber-500/30 bg-amber-500/5 text-amber-300'
              : isInsurance
              ? 'border-rose-500/30 bg-rose-500/5 text-rose-300'
              : 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300';

            return (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-indigo-300">
                      {doc.name}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${alertColor}`}>
                    {expiryText}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                  {doc.summary}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {doc.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>View Expiry Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DocumentViewerModal
        document={selectedDoc}
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </>
  );
}
