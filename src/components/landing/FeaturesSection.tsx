'use client';

import React from 'react';
import {
  Brain,
  FileSearch,
  ShieldCheck,
  GitCompare,
  Clock,
  Layers,
  Cpu,
  Sparkles,
  ArrowRight,
  Database,
  Lock,
  Zap
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      title: 'Semantic Vector Retrieval',
      desc: 'Searches by meaning rather than exact keywords. Ask "What did I pay for electricity last month?" and retrieve bills mentioning "Total Amount Payable: ₹1,842".',
      icon: Brain,
      color: 'from-blue-500/20 to-indigo-500/20',
      textColor: 'text-blue-400',
      tag: 'Neural RAG'
    },
    {
      title: 'Automated OCR & Layout Parsing',
      desc: 'Extracts clean structured text, tables, dates, IDs, and amounts from scanned PDFs, photos, receipts, certificates, and ID cards.',
      icon: Cpu,
      color: 'from-purple-500/20 to-pink-500/20',
      textColor: 'text-purple-400',
      tag: 'Tesseract v5'
    },
    {
      title: 'Verifiable Source Citations',
      desc: 'Every AI answer provides clickable page citations with highlighted snippets. Eliminates hallucinations and gives 100% auditable trust.',
      icon: FileSearch,
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-400',
      tag: 'Zero Hallucinations'
    },
    {
      title: 'Cross-Document Reasoning',
      desc: 'Compare facts across multiple documents. Correlate your resume credentials with internship certificates and graduation transcripts automatically.',
      icon: GitCompare,
      color: 'from-amber-500/20 to-orange-500/20',
      textColor: 'text-amber-400',
      tag: 'Multi-Doc Intelligence'
    },
    {
      title: 'Smart Expiry & Renewal Alerts',
      desc: 'Automatically parses validity periods on passports, health insurance policies, utility bills, and vehicle registrations with proactive alerts.',
      icon: Clock,
      color: 'from-rose-500/20 to-red-500/20',
      textColor: 'text-rose-400',
      tag: 'Deadline Tracking'
    },
    {
      title: 'Zero-Knowledge Privacy Vault',
      desc: 'End-to-end user isolation. Your documents and vectors are never used to train public models and are protected by strict cryptographic access policies.',
      icon: ShieldCheck,
      color: 'from-indigo-500/20 to-cyan-500/20',
      textColor: 'text-indigo-400',
      tag: 'Bank-Grade Security'
    }
  ];

  return (
    <section id="features" className="py-20 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Core Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Real-World Personal Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Move beyond static folder trees and sluggish keyword filters. Experience a unified neural knowledge assistant for your life's paperwork.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center ${feat.textColor} border border-slate-700/50`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-indigo-400 font-medium group-hover:text-indigo-300">
                  <span>Explore capability</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Pipeline Architecture Visual Box */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-1">The AI-PIRS 6-Stage Retrieval Pipeline</h3>
            <p className="text-xs text-slate-400">How your documents transform from raw binaries into sub-millisecond semantic answers</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'File Ingestion', desc: 'Secure multipart upload & MIME validation' },
              { step: '02', title: 'OCR & Parsing', desc: 'Text & bounding box extraction' },
              { step: '03', title: 'Smart Chunking', desc: 'Context-preserving semantic segmenting' },
              { step: '04', title: 'Vector Embeddings', desc: '1536-dimensional dense vectors' },
              { step: '05', title: 'Hybrid RAG', desc: 'Dense vector + BM25 keyword rerank' },
              { step: '06', title: 'Audited Answer', desc: 'Direct citation with page highlights' }
            ].map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-indigo-400 font-bold block mb-1">STEP {p.step}</span>
                <h4 className="text-xs font-semibold text-white mb-1">{p.title}</h4>
                <p className="text-[10px] text-slate-400 leading-tight">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
