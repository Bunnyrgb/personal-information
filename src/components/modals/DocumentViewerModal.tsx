'use client';

import React, { useState } from 'react';
import { DocumentItem } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  X,
  FileText,
  Star,
  Download,
  Trash2,
  Calendar,
  Building,
  User,
  CreditCard,
  Hash,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Share2,
  Copy,
  Check,
  Tag,
  Clock,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface DocumentViewerModalProps {
  document: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
  highlightText?: string;
  initialPage?: number;
}

export function DocumentViewerModal({
  document: doc,
  isOpen,
  onClose,
  highlightText,
  initialPage = 1
}: DocumentViewerModalProps) {
  const { toggleFavorite, deleteDocument, collections, updateDocumentCollection } = useApp();
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState<string>(highlightText || '');
  const [copiedText, setCopiedText] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'entities' | 'raw_ocr' | 'chunks'>('overview');

  if (!isOpen || !doc) return null;

  const totalPages = doc.pageCount || 1;
  const currentChunk = doc.chunks?.find((c) => c.pageNumber === currentPage) || doc.chunks?.[0];

  const handleCopyEntity = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownload = () => {
    const textContent = `=== AI-PIRS DOCUMENT DUMP: ${doc.name} ===\nCategory: ${doc.category}\nSummary: ${doc.summary}\n\nOCR CONTENT:\n${doc.ocrText || 'No OCR text available'}`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${doc.name.split('.')[0]}_AIPIRS_Export.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white truncate">{doc.name}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {doc.category}
                </span>
                {doc.extractedEntities.expiryDate && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Exp: {doc.extractedEntities.expiryDate}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.pageCount} {doc.pageCount === 1 ? 'Page' : 'Pages'} • OCR Vector Indexed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => toggleFavorite(doc.id)}
              className={`p-2 rounded-lg border transition-colors ${
                doc.isFavorite
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Toggle Favorite"
            >
              <Star className={`w-4 h-4 ${doc.isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Export Document Data"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                deleteDocument(doc.id, false);
                onClose();
              }}
              className="p-2 rounded-lg border border-slate-800 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-colors"
              title="Move to Trash"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-6 bg-slate-800 mx-1" />
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content: Split View (Document Canvas + AI Intelligence Panel) */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          
          {/* Left / Main: Document Viewer Canvas */}
          <div className="flex-1 flex flex-col bg-slate-950/90 border-r border-slate-800 min-h-0">
            
            {/* Canvas Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/40 text-xs">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-slate-300">
                  Page <span className="font-semibold text-white">{currentPage}</span> of {totalPages}
                </span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Text Search Inside Document */}
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
                <input
                  type="text"
                  placeholder="Find in page text..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800/80 border border-slate-700/60 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-44"
                />
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
                  className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400 w-10 text-center font-mono">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                  className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Document Render Area with simulated authentic document canvas */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-950/80">
              <div
                className="bg-white text-slate-900 rounded-lg shadow-2xl p-8 max-w-2xl w-full min-h-[500px] transition-transform duration-150 relative border border-slate-200"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                {/* Document watermarks & headers */}
                <div className="border-b-2 border-indigo-900/30 pb-3 mb-6 flex justify-between items-start">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-950">
                      {doc.category === 'Identity' ? 'Official Identification Record' : doc.category === 'Education' ? 'Academic Transcript / Certificate' : 'Personal Verified Document'}
                    </h2>
                    <p className="text-[10px] text-slate-500 font-mono">FILE: {doc.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      VERIFIED OCR
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Page {currentPage} of {totalPages}</p>
                  </div>
                </div>

                {/* Simulated structured page content */}
                <div className="space-y-4 text-xs font-serif leading-relaxed text-slate-800">
                  {doc.ocrText ? (
                    <div className="font-mono text-xs whitespace-pre-wrap leading-6 bg-slate-50 p-4 rounded border border-slate-200">
                      {searchTerm ? (
                        doc.ocrText.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) =>
                          part.toLowerCase() === searchTerm.toLowerCase() ? (
                            <mark key={i} className="bg-amber-300 text-slate-950 font-bold px-1 rounded">
                              {part}
                            </mark>
                          ) : (
                            part
                          )
                        )
                      ) : (
                        doc.ocrText
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-600 italic">Page text rendering in progress...</p>
                  )}
                </div>

                {/* Page Bottom Signature / Seal */}
                <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>AI-PIRS ID: {doc.id}</span>
                  <span>DIGITALLY INDEXED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: AI Document Intelligence Sidebar */}
          <div className="w-full md:w-80 lg:w-96 flex flex-col bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 min-h-0 shrink-0">
            
            {/* Sidebar Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/40 p-1 gap-1 text-xs">
              {(['overview', 'entities', 'chunks', 'raw_ocr'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {tab === 'raw_ocr' ? 'Raw OCR' : tab}
                </button>
              ))}
            </div>

            {/* Sidebar Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {/* Summary Box */}
                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Document Summary</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{doc.summary}</p>
                  </div>

                  {/* Key Highlights */}
                  {doc.extractedEntities.summaryBulletPoints && (
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Extracted Highlights
                      </h4>
                      <div className="space-y-1.5">
                        {doc.extractedEntities.summaryBulletPoints.map((point, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 text-slate-300 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata fields */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      File Metadata
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 block">Category</span>
                        <span className="font-semibold text-slate-200">{doc.category}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 block">Pages</span>
                        <span className="font-semibold text-slate-200">{doc.pageCount}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 block">OCR Engine</span>
                        <span className="font-semibold text-emerald-400">Tesseract v5</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 block">Vector Chunks</span>
                        <span className="font-semibold text-indigo-300">{doc.chunks?.length || 1} chunks</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'entities' && (
                <div className="space-y-3">
                  <p className="text-[11px] text-slate-400">
                    Named entities automatically recognized from OCR text. Click any item to copy.
                  </p>

                  {/* Expiry Date */}
                  {doc.extractedEntities.expiryDate && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <div>
                          <span className="text-[10px] text-amber-400/80 block uppercase font-semibold">Expiry Date</span>
                          <span className="font-semibold text-amber-200">{doc.extractedEntities.expiryDate}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyEntity(doc.extractedEntities.expiryDate!)}
                        className="p-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                      >
                        {copiedText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}

                  {/* ID / Numbers */}
                  {doc.extractedEntities.idNumbers && doc.extractedEntities.idNumbers.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Identification Numbers</span>
                      {doc.extractedEntities.idNumbers.map((id, i) => (
                        <div
                          key={i}
                          onClick={() => handleCopyEntity(id)}
                          className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-indigo-500/40 transition-colors"
                        >
                          <span className="font-mono text-slate-200">{id}</span>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Academic CGPA */}
                  {doc.extractedEntities.cgpa && (
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-blue-400 block uppercase font-semibold">Academic Score / CGPA</span>
                        <span className="font-semibold text-blue-200 text-sm">{doc.extractedEntities.cgpa}</span>
                      </div>
                      <button
                        onClick={() => handleCopyEntity(doc.extractedEntities.cgpa!)}
                        className="p-1 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Amounts */}
                  {doc.extractedEntities.amounts && doc.extractedEntities.amounts.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Amounts & Financials</span>
                      {doc.extractedEntities.amounts.map((amt, i) => (
                        <div
                          key={i}
                          onClick={() => handleCopyEntity(amt)}
                          className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-emerald-500/40 transition-colors"
                        >
                          <span className="font-medium text-emerald-400">{amt}</span>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Organizations */}
                  {doc.extractedEntities.organizations && doc.extractedEntities.organizations.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Institutions & Organizations</span>
                      {doc.extractedEntities.organizations.map((org, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 text-slate-300 flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{org}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'chunks' && (
                <div className="space-y-3">
                  <p className="text-[11px] text-slate-400">
                    Semantic chunks indexed in vector space for RAG retrieval.
                  </p>
                  {doc.chunks && doc.chunks.length > 0 ? (
                    doc.chunks.map((chunk, idx) => (
                      <div key={chunk.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-indigo-400">
                          <span className="font-mono">Chunk #{idx + 1} (Page {chunk.pageNumber})</span>
                          <span>{chunk.tokens || 50} tokens</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed font-mono bg-slate-900/80 p-2 rounded border border-slate-800/80">
                          {chunk.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-center py-4">No chunks generated</p>
                  )}
                </div>
              )}

              {activeTab === 'raw_ocr' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Tesseract OCR Output</span>
                    <button
                      onClick={() => handleCopyEntity(doc.ocrText || '')}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Full Text</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap overflow-x-auto max-h-96">
                    {doc.ocrText || 'No OCR text available'}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
