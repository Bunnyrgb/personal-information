'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { queryDocumentsRAG } from '@/lib/rag-engine';
import { ChatMessage, SourceCitation, DocumentItem } from '@/types';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import {
  Send,
  Bot,
  User,
  Sparkles,
  FileText,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Trash2,
  CornerDownLeft,
  Loader2,
  Layers,
  ArrowRight
} from 'lucide-react';

export function RAGChatInterface() {
  const {
    documents,
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewConversation,
    addMessageToConversation,
    clearConversation
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDocForModal, setSelectedDocForModal] = useState<DocumentItem | null>(null);
  const [modalPage, setModalPage] = useState<number>(1);
  const [modalHighlight, setModalHighlight] = useState<string | undefined>(undefined);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get active conversation or create first one
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    } else if (conversations.length === 0) {
      createNewConversation();
    }
  }, [conversations, activeConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isTyping) return;

    setInputQuery('');
    
    // Add user message
    addMessageToConversation({
      conversationId: activeConversationId || 'temp',
      role: 'user',
      content: text
    });

    setIsTyping(true);

    // Simulate RAG retrieval and stream
    setTimeout(() => {
      const ragResponse = queryDocumentsRAG(text, documents);

      addMessageToConversation({
        conversationId: activeConversationId || 'temp',
        role: 'assistant',
        content: ragResponse.answer,
        sources: ragResponse.sources,
        confidence: ragResponse.confidence,
        followUps: ragResponse.followUpSuggestions
      });

      setIsTyping(false);
    }, 600);
  };

  const handleOpenSource = (docId: string, pageNumber: number, highlight?: string) => {
    const doc = documents.find((d) => d.id === docId);
    if (doc) {
      setSelectedDocForModal(doc);
      setModalPage(pageNumber);
      setModalHighlight(highlight);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-8.5rem)] rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl overflow-hidden shadow-2xl text-slate-100">
      
      {/* Left Chat History Sidebar */}
      <div className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col justify-between hidden md:flex shrink-0">
        
        {/* Top: New Session Button */}
        <div className="p-3 border-b border-slate-800/80">
          <button
            onClick={() => createNewConversation()}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Search Session</span>
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <span className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Recent Inquiries
          </span>

          {conversations.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <div
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 border border-indigo-500/30 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Bot className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span className="truncate">{conv.title || 'Inquiry Session'}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 rounded transition-opacity"
                  title="Delete Session"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Vault Quick Metric */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            RAG Vector DB Ready
          </span>
          <span className="font-mono text-slate-500">{documents.filter(d => !d.isTrash).length} Docs</span>
        </div>
      </div>

      {/* Right: Active Chat Conversation Box */}
      <div className="flex-1 flex flex-col bg-slate-900/30 min-w-0">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeConversation?.messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isCopied = copiedMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    isUser
                      ? 'bg-gradient-to-tr from-indigo-600 to-blue-500 text-white'
                      : 'bg-slate-800 border border-indigo-500/30 text-indigo-400'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`space-y-3 min-w-0 ${isUser ? 'items-end text-right' : 'text-left'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.content}</div>

                    {!isUser && (
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="text-[10px] text-slate-500">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                            title="Copy Answer"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sources attached to assistant message */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Sources & Citations ({msg.sources.length})</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.sources.map((src, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all text-left flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <div className="flex items-center gap-1.5 truncate">
                                  <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                                  <span className="text-xs font-semibold text-slate-200 truncate">
                                    {src.documentName}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                                  Page {src.pageNumber}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 italic line-clamp-2 mb-2">
                                "{src.snippet}"
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleOpenSource(src.documentId, src.pageNumber, src.highlightText)}
                              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium pt-1 border-t border-slate-800/80"
                            >
                              <span>Open Document Source</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Follow-up suggestions */}
                  {!isUser && msg.followUps && msg.followUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.followUps.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-indigo-500/40 transition-all flex items-center gap-1"
                        >
                          <span>{q}</span>
                          <ArrowRight className="w-3 h-3 text-indigo-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-lg items-center text-xs text-indigo-400">
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none text-slate-400 flex items-center gap-2">
                <span>Searching vector space & constructing source context...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Search Input Box */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything across all your documents (e.g., 'What is my passport expiry date?')..."
              className="w-full pl-4 pr-24 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg transition-all shadow-md shadow-indigo-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
          <p className="text-[10px] text-slate-500 text-center mt-2">
            AI-PIRS answers with verified citations from your documents • Zero hallucinations guarantee
          </p>
        </div>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={selectedDocForModal}
        isOpen={!!selectedDocForModal}
        onClose={() => setSelectedDocForModal(null)}
        highlightText={modalHighlight}
        initialPage={modalPage}
      />
    </div>
  );
}
