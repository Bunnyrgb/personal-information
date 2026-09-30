'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { queryDocumentsRAG } from '@/lib/rag-engine';
import { RAGAnswerResponse, DocumentItem } from '@/types';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import {
  Search,
  Sparkles,
  ArrowRight,
  FileText,
  CheckCircle2,
  ExternalLink,
  Bot,
  Copy,
  Check,
  Zap,
  CornerDownLeft
} from 'lucide-react';

export function AskAIHeroBox() {
  const { documents, addMessageToConversation, createNewConversation } = useApp();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<RAGAnswerResponse | null>(null);
  const [selectedDocForModal, setSelectedDocForModal] = useState<DocumentItem | null>(null);
  const [modalHighlight, setModalHighlight] = useState<string | undefined>(undefined);
  const [modalPage, setModalPage] = useState<number>(1);
  const [copiedAnswer, setCopiedAnswer] = useState(false);
  const router = useRouter();

  const suggestedQuestions = [
    'What is my Aadhaar number?',
    'When does my passport expire?',
    'What was my CGPA in 3rd year?',
    'What was the amount on my electricity bill?',
    'Show the document containing my internship details',
    'Compare the details in my resume and internship certificate'
  ];

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setResult(null);

    setTimeout(() => {
      const ragResponse = queryDocumentsRAG(searchQuery, documents);
      setResult(ragResponse);
      setIsSearching(false);
    }, 450);
  };

  const handleOpenSourceDoc = (docId: string, pageNumber: number, highlight?: string) => {
    const doc = documents.find((d) => d.id === docId);
    if (doc) {
      setSelectedDocForModal(doc);
      setModalPage(pageNumber);
      setModalHighlight(highlight);
    }
  };

  const handleContinueInChat = () => {
    if (!query.trim() && !result) return;
    const q = query || result?.query || 'Document Search';
    const convId = createNewConversation(q.slice(0, 30));
    
    // Append user message
    addMessageToConversation({
      conversationId: convId,
      role: 'user',
      content: q
    });

    // If we already have a result, add assistant response
    if (result) {
      addMessageToConversation({
        conversationId: convId,
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
        confidence: result.confidence,
        followUps: result.followUpSuggestions
      });
    }

    router.push('/dashboard/chat');
  };

  const copyAnswerText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2000);
  };

  return (
    <>
      <div className="relative rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-900/80 border border-indigo-500/20 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
        
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Ask AI Document Intelligence
              </h2>
              <p className="text-xs text-slate-400">
                Natural language semantic retrieval with source transparency
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Sub-millisecond RAG Retrieval</span>
          </div>
        </div>

        {/* Interactive Search Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="relative flex items-center mb-4"
        >
          <div className="absolute left-4 text-indigo-400">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your certificates, Aadhaar, passport, electricity bills, marks, or resume..."
            className="w-full pl-12 pr-28 py-3.5 bg-slate-950/90 border border-indigo-500/30 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            <button
              type="submit"
              disabled={!query.trim() || isSearching}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
            >
              {isSearching ? (
                <span>Retrieving...</span>
              ) : (
                <>
                  <span>Search</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggestion Prompt Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Suggested Queries
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(q);
                  handleSearch(q);
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Instant RAG Response Card */}
        {result && (
          <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-white">AI-PIRS Verified Answer</span>
                {result.confidence > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {(result.confidence * 100).toFixed(0)}% Confidence
                  </span>
                )}
                {result.intentDetected && (
                  <span className="hidden md:inline text-[10px] text-indigo-400 font-mono">
                    [{result.intentDetected}]
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyAnswerText(result.answer)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  title="Copy Answer"
                >
                  {copiedAnswer ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleContinueInChat}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium px-2 py-1 rounded-lg hover:bg-indigo-500/10 transition-colors"
                >
                  <span>Open Full Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Answer text */}
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {result.answer}
            </div>

            {/* Cross-Document Comparison Table if available */}
            {result.comparisonData && (
              <div className="my-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
                <div className="bg-slate-800/80 px-3 py-1.5 text-[11px] font-semibold text-indigo-300">
                  Cross-Document Entity Comparison Matrix
                </div>
                <div className="divide-y divide-slate-800 text-xs">
                  {result.comparisonData.entities.map((ent, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-2.5 gap-2">
                      <span className="font-medium text-slate-400">{ent.label}</span>
                      <span className="text-slate-200">{ent.doc1Val}</span>
                      <span className="text-indigo-300">{ent.doc2Val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source Citations */}
            {result.sources.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified Sources ({result.sources.length})
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.sources.map((src, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-indigo-300">
                            {src.documentName}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded font-mono shrink-0">
                          Pg {src.pageNumber}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-2 italic mb-2">
                        "{src.snippet}"
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                        <span className="text-[10px] text-emerald-400">
                          {(src.score * 100).toFixed(0)}% Match
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenSourceDoc(src.documentId, src.pageNumber, src.highlightText)}
                          className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                          <span>Open Document</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Document Viewer Modal for source viewing */}
      <DocumentViewerModal
        document={selectedDocForModal}
        isOpen={!!selectedDocForModal}
        onClose={() => setSelectedDocForModal(null)}
        highlightText={modalHighlight}
        initialPage={modalPage}
      />
    </>
  );
}
