'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  Search,
  FileText,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Bot,
  Zap,
  Play
} from 'lucide-react';

export function LandingHero() {
  const router = useRouter();
  const [activeDemoQuestion, setActiveDemoQuestion] = useState('Where is my graduation certificate?');

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-blue-600/10 to-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-300 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-semibold">Next-Gen Personal RAG 2.0</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Semantic OCR & Zero Hallucinations</span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
            Your Personal Information, <br />
            <span className="ai-gradient-text">Powered by AI.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload your documents once. Ask questions naturally. Find the exact information you need with AI-powered semantic search.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-xl transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 group"
            >
              <span>Start for Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href="#demo"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current text-indigo-400" />
              <span>See How It Works</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% User Data Isolation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              Verifiable Page Citations
            </span>
          </div>
        </div>

        {/* Hero Interactive Visual Interface Demonstration */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/30 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl">
            
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-2">AI-PIRS Search Intelligence Engine</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <Zap className="w-3 h-3" />
                <span>Vector Index Active</span>
              </div>
            </div>

            {/* Query bar mock */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 mb-4">
              <Search className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="text-xs sm:text-sm text-white font-medium flex-1 truncate">
                “Where is my graduation certificate?”
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                Ask AI
              </span>
            </div>

            {/* AI Response Card with exact requested structure */}
            <div className="space-y-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-white">AI-PIRS Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                    99% Confidence
                  </span>
                </div>
              </div>

              {/* Exact Answer text */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Your graduation certificate was found in <strong className="text-white">B.Tech_Documents.pdf</strong> (Delhi Technological University). You graduated with <strong className="text-indigo-300">First Class with Distinction (CGPA: 8.84)</strong> in Computer Science & Engineering.
              </p>

              {/* Source Card Display */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white truncate">B.Tech_Documents.pdf</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                        Page 1
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      "Degree of Bachelor of Technology in Computer Science and Engineering with First Class with Distinction."
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-md"
                >
                  <span>Open Document</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Interactive Try Live Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-400">Try these live sample queries:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'What is my Aadhaar number?',
                  'When does my passport expire?',
                  'What was my electricity bill amount?'
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => router.push('/dashboard')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-[11px]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
