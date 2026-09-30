'use client';

import React from 'react';
import { RAGChatInterface } from '@/components/chat/RAGChatInterface';
import { Bot, Sparkles, ShieldCheck } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Bot className="w-6 h-6 text-indigo-400" />
            <span>AI Conversational Document Intelligence</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Chat with your document knowledge base using vector RAG, verifiable page citations, and zero hallucinations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Strict Source Grounding Enabled</span>
        </div>
      </div>

      {/* Main RAG Chat Interface */}
      <RAGChatInterface />
    </div>
  );
}
