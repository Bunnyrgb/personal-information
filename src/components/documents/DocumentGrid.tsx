'use client';

import React, { useState } from 'react';
import { DocumentItem, DocumentCategory } from '@/types';
import { useApp } from '@/context/AppContext';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import {
  FileText,
  Star,
  MoreVertical,
  Download,
  Trash2,
  ExternalLink,
  Tag,
  Clock,
  CheckCircle2,
  FolderPlus,
  Edit2,
  ShieldCheck
} from 'lucide-react';

interface DocumentGridProps {
  documents: DocumentItem[];
  onUploadClick?: () => void;
}

export function DocumentGrid({ documents, onUploadClick }: DocumentGridProps) {
  const { toggleFavorite, deleteDocument, renameDocument, updateDocumentCategory, collections, updateDocumentCollection } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [activeMenuDocId, setActiveMenuDocId] = useState<string | null>(null);
  const [renameDocId, setRenameDocId] = useState<string | null>(null);
  const [newNameInput, setNewNameInput] = useState('');

  if (documents.length === 0) {
    return (
      <div className="py-16 px-4 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-white">No documents found</h3>
        <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
          Upload your personal documents, certificates, bills, or IDs to enable instant AI semantic search.
        </p>
        {onUploadClick && (
          <button
            onClick={onUploadClick}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/25"
          >
            Upload First Document
          </button>
        )}
      </div>
    );
  }

  const handleStartRename = (doc: DocumentItem) => {
    setRenameDocId(doc.id);
    setNewNameInput(doc.name);
    setActiveMenuDocId(null);
  };

  const handleSaveRename = (id: string) => {
    if (newNameInput.trim()) {
      renameDocument(id, newNameInput.trim());
    }
    setRenameDocId(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {documents.map((doc) => {
          const isMenuOpen = activeMenuDocId === doc.id;
          const isRenaming = renameDocId === doc.id;

          return (
            <div
              key={doc.id}
              className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              {/* Card Header & Thumbnail */}
              <div className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      {isRenaming ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={newNameInput}
                            onChange={(e) => setNewNameInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(doc.id)}
                            className="text-xs bg-slate-950 border border-indigo-500 rounded px-1.5 py-0.5 text-white w-32 focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveRename(doc.id)}
                            className="text-[10px] px-1.5 py-0.5 bg-indigo-600 text-white rounded"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <h4
                          onClick={() => setSelectedDoc(doc)}
                          className="text-xs font-semibold text-slate-200 hover:text-indigo-300 truncate cursor-pointer transition-colors"
                          title={doc.name}
                        >
                          {doc.name}
                        </h4>
                      )}
                      <span className="text-[10px] text-slate-500 block">
                        {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.pageCount} {doc.pageCount === 1 ? 'Page' : 'Pages'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleFavorite(doc.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        doc.isFavorite
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                      title="Favorite"
                    >
                      <Star className={`w-3.5 h-3.5 ${doc.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>

                    {/* 3-dots Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenuDocId(isMenuOpen ? null : doc.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {isMenuOpen && (
                        <div className="absolute right-0 top-8 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-30 text-xs space-y-0.5 animate-in fade-in duration-150">
                          <button
                            onClick={() => {
                              setSelectedDoc(doc);
                              setActiveMenuDocId(null);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Open in Reader</span>
                          </button>
                          <button
                            onClick={() => handleStartRename(doc)}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>Rename Document</span>
                          </button>
                          <button
                            onClick={() => {
                              deleteDocument(doc.id, false);
                              setActiveMenuDocId(null);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Move to Trash</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Document Summary Snippet */}
                <p
                  onClick={() => setSelectedDoc(doc)}
                  className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed cursor-pointer hover:text-slate-300 transition-colors mb-3"
                >
                  {doc.summary}
                </p>

                {/* Key Entities / Expiry Pill */}
                {doc.extractedEntities.expiryDate && (
                  <div className="mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 inline-flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      Expires: {doc.extractedEntities.expiryDate}
                    </span>
                  </div>
                )}
                {doc.extractedEntities.cgpa && (
                  <div className="mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 inline-flex items-center gap-1 font-medium">
                      🎓 {doc.extractedEntities.cgpa}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                  {doc.category}
                </span>

                <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>OCR Indexed</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={selectedDoc}
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </>
  );
}
