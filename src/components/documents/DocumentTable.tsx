'use client';

import React, { useState } from 'react';
import { DocumentItem } from '@/types';
import { useApp } from '@/context/AppContext';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import {
  FileText,
  Star,
  Download,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock
} from 'lucide-react';

export function DocumentTable({ documents }: { documents: DocumentItem[] }) {
  const { toggleFavorite, deleteDocument } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  if (documents.length === 0) return null;

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 w-10"></th>
              <th className="py-3 px-4">Document Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Size & Pages</th>
              <th className="py-3 px-4">Extracted Key Info</th>
              <th className="py-3 px-4">OCR Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => setSelectedDoc(doc)}
              >
                {/* Favorite */}
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleFavorite(doc.id)}
                    className="text-slate-500 hover:text-amber-400"
                  >
                    <Star className={`w-3.5 h-3.5 ${doc.isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
                  </button>
                </td>

                {/* Name */}
                <td className="py-3 px-4 font-semibold text-white group-hover:text-indigo-300">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="truncate max-w-xs">{doc.name}</span>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-medium">
                    {doc.category}
                  </span>
                </td>

                {/* Size & Pages */}
                <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                  {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.pageCount} {doc.pageCount === 1 ? 'pg' : 'pgs'}
                </td>

                {/* Key Info */}
                <td className="py-3 px-4 max-w-xs truncate text-[11px] text-slate-400">
                  {doc.extractedEntities.expiryDate ? (
                    <span className="text-amber-300">Exp: {doc.extractedEntities.expiryDate}</span>
                  ) : doc.extractedEntities.cgpa ? (
                    <span className="text-blue-300">{doc.extractedEntities.cgpa}</span>
                  ) : (
                    doc.extractedEntities.summaryBulletPoints?.[0] || 'Vector indexed'
                  )}
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-emerald-400 text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ready</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                      title="Open Document"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteDocument(doc.id, false)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                      title="Move to Trash"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DocumentViewerModal
        document={selectedDoc}
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </>
  );
}
