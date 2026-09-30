'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { ShieldCheck } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <Logo size="md" showTagline={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              AI Personal Information Retrieval & Smart Document Intelligence. Ask your documents. Find anything. Instantly.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-knowledge data isolation</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">AI Search Hub</Link></li>
              <li><Link href="/dashboard/chat" className="hover:text-white transition-colors">Conversational RAG</Link></li>
              <li><Link href="/dashboard/documents" className="hover:text-white transition-colors">Smart Document Hub</Link></li>
              <li><Link href="/dashboard/expiry" className="hover:text-white transition-colors">Expiry Intelligence</Link></li>
              <li><Link href="/dashboard/timeline" className="hover:text-white transition-colors">Smart Timeline</Link></li>
            </ul>
          </div>

          {/* Security & Privacy */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Security & Trust</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard/privacy" className="hover:text-white transition-colors">Privacy Vault</Link></li>
              <li><Link href="/dashboard/privacy" className="hover:text-white transition-colors">Audit Logs & Verification</Link></li>
              <li><a href="#security" className="hover:text-white transition-colors">Encryption Architecture</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Data Deletion Guarantee</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">AI-PIRS Platform</h4>
            <p className="text-[11px] text-slate-500 mb-3">
              Production-ready enterprise SaaS for intelligent personal document understanding.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-1">Retrieval Engine:</span>
              <span className="font-mono text-xs text-indigo-300 font-semibold">Dense Vector + Hybrid RAG</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AI-PIRS Inc. All personal documents are stored with end-to-end user isolation.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/dashboard/privacy" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/dashboard/privacy" className="hover:text-slate-300">Security Whitepaper</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
