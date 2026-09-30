'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Trash2,
  FileKey,
  Server,
  Fingerprint,
  CheckCircle2
} from 'lucide-react';

export function SecuritySection() {
  const securityPillars = [
    {
      title: 'Zero-Knowledge Data Isolation',
      desc: 'Each user operates inside an isolated logical boundary. Vector embeddings and chunks are keyed exclusively by cryptographic user tokens.',
      icon: EyeOff
    },
    {
      title: 'AES-256 Bit Encryption',
      desc: 'All stored documents, metadata, and vectors are encrypted at rest with AES-256 and in-transit with TLS 1.3 tunnels.',
      icon: Lock
    },
    {
      title: 'No Public Model Training',
      desc: 'Your personal documents, financial data, and credentials are strictly private and never used to train public foundational AI models.',
      icon: ShieldCheck
    },
    {
      title: 'Instant 1-Click Data Purge',
      desc: 'You maintain absolute ownership. Delete individual documents or execute a complete account wipe at any time with verified deletion.',
      icon: Trash2
    }
  ];

  return (
    <section id="security" className="py-20 relative border-t border-slate-800/80 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Privacy First Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Documents Belong to You. Always.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Personal documents contain sensitive identifiers, financial data, and health records. Security is not an afterthought—it is the foundational core of AI-PIRS.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Policy</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Vault Callout Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-indigo-950/30 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Ready to test our Privacy Vault live?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Upload sample documents in our sandboxed demo mode. See OCR extraction, vector chunking, and verifiable source retrieval without risking private data.
            </p>
          </div>

          <Link
            href="/dashboard/privacy"
            className="px-6 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg shadow-emerald-600/25 shrink-0"
          >
            Visit Privacy Vault
          </Link>
        </div>
      </div>
    </section>
  );
}
