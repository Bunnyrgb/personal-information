'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Trash2, RotateCcw, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function TrashPage() {
  const { documents, restoreDocument, deleteDocument } = useApp();

  const trashDocs = documents.filter((d) => d.isTrash);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Trash2 className="w-6 h-6 text-rose-400" />
            <span>Trash Bin</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Documents moved to trash are unindexed from AI searches. You can restore them or permanently delete them.
          </p>
        </div>

        {trashDocs.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Permanently purge all items in trash?')) {
                trashDocs.forEach((d) => deleteDocument(d.id, true));
              }
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md self-start sm:self-auto"
          >
            Empty Trash ({trashDocs.length})
          </button>
        )}
      </div>

      {trashDocs.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-2">
          <Trash2 className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">Trash is empty</h3>
          <p className="text-xs text-slate-500">Deleted files will appear here before permanent purging.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {trashDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 truncate">
                <FileText className="w-5 h-5 text-slate-500 shrink-0" />
                <div className="truncate">
                  <h4 className="text-xs font-semibold text-slate-200 truncate">{doc.name}</h4>
                  <span className="text-[10px] text-slate-500">
                    {doc.category} • {(doc.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => restoreDocument(doc.id)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore</span>
                </button>
                <button
                  onClick={() => deleteDocument(doc.id, true)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Purge Forever</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
