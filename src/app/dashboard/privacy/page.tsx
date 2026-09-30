'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle2,
  FileKey,
  Database,
  RotateCcw
} from 'lucide-react';

export default function PrivacyVaultPage() {
  const { auditLogs, documents, clearAllUserData, resetToDemoData } = useApp();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');

  const handleExportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      platform: 'AI-PIRS SaaS Knowledge System',
      documentsCount: documents.length,
      documents: documents.map((d) => ({
        id: d.id,
        name: d.name,
        category: d.category,
        summary: d.summary,
        extractedEntities: d.extractedEntities,
        chunksCount: d.chunks?.length
      })),
      auditLogs
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_PIRS_Vault_Export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePurge = () => {
    if (confirmInput === 'DELETE ALL MY DATA') {
      clearAllUserData();
      setIsConfirmDeleteOpen(false);
      setConfirmInput('');
      alert('All documents, OCR text, and vector embeddings were permanently purged.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <span>Privacy Vault & Cryptographic Security</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your documents belong to you. Transparent audit logs, zero-knowledge vector storage, and data sovereignty.
        </p>
      </div>

      {/* Privacy Guarantees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/20 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Zero-Knowledge Isolation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-tenant boundary strictly prevents access across accounts. Documents and vector embeddings are keyed by cryptographic user tokens.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-indigo-500/20 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <EyeOff className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">No Model Training</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your personal credentials, financial statements, and certificates are never used to train public LLMs or external models.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-blue-500/20 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <FileKey className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">AES-256 Storage</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All stored document binaries and high-dimensional semantic chunks are encrypted at rest with AES-256 and transmitted via TLS 1.3.
          </p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-white">Immutable Security Audit Logs</h3>
            <p className="text-xs text-slate-400">Real-time trace of every query, OCR processing event, and session access.</p>
          </div>

          <button
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit & Data JSON</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 border-b border-slate-800 text-[10px] uppercase font-semibold text-slate-400">
              <tr>
                <th className="p-3">Action</th>
                <th className="p-3">Event Details</th>
                <th className="p-3">Source Document</th>
                <th className="p-3">IP / Tunnel</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-indigo-300">{log.action}</td>
                  <td className="p-3 text-slate-300 max-w-xs truncate font-sans">{log.details}</td>
                  <td className="p-3 text-slate-400">{log.documentName || '—'}</td>
                  <td className="p-3 text-slate-500">{log.ipAddress}</td>
                  <td className="p-3 text-slate-400">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className="p-3 text-right">
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dangerous Controls Zone */}
      <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>Data Sovereignty & Permanent Purge</span>
        </div>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          You can wipe all documents and vector embeddings from the server at any moment. This completely deletes all OCR text, entities, and search histories.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => setIsConfirmDeleteOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-600/20 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge All Vault Data</span>
          </button>

          <button
            onClick={() => {
              resetToDemoData();
              alert('Default demo documents and seed vectors restored!');
            }}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Demo State</span>
          </button>
        </div>
      </div>

      {/* Purge Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white">Permanently Delete All Data?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This action is irreversible. All uploaded PDFs, OCR records, vector chunks, and search histories will be immediately deleted.
            </p>

            <div className="space-y-1 text-xs">
              <label className="text-slate-400">Type <strong className="text-rose-400 font-mono">DELETE ALL MY DATA</strong> to confirm:</label>
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder="DELETE ALL MY DATA"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => { setIsConfirmDeleteOpen(false); setConfirmInput(''); }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                disabled={confirmInput !== 'DELETE ALL MY DATA'}
                onClick={handlePurge}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-semibold text-xs"
              >
                Confirm Complete Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
