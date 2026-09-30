'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { DocumentCategory } from '@/types';
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Cpu,
  Layers,
  Database,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (docId: string) => void;
}

export function UploadModal({ isOpen, onClose, onSuccess }: UploadModalProps) {
  const { uploadDocumentFile } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'Auto'>('Auto');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [completedDocId, setCompletedDocId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processingSteps = [
    { title: 'Uploading', desc: 'Securely receiving document & validating binary signatures', icon: UploadCloud },
    { title: 'OCR Processing', desc: 'Extracting text & layout coordinates from pages', icon: Cpu },
    { title: 'Understanding', desc: 'Parsing dates, entities, numbers, and document schema', icon: Sparkles },
    { title: 'Embedding', desc: 'Generating semantic vector embeddings (1536-dim)', icon: Layers },
    { title: 'Indexing', desc: 'Storing chunks in vector database for instant RAG search', icon: Database },
    { title: 'Ready', desc: 'Document fully indexed and ready for natural language queries', icon: CheckCircle2 }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setErrorMsg(null);
    setUploadedFileName(file.name);
    setIsProcessing(true);
    setCurrentStepIndex(0);
    setUploadProgress(10);

    // Step progression ticker
    const timer1 = setTimeout(() => { setCurrentStepIndex(1); setUploadProgress(30); }, 600);
    const timer2 = setTimeout(() => { setCurrentStepIndex(2); setUploadProgress(55); }, 1300);
    const timer3 = setTimeout(() => { setCurrentStepIndex(3); setUploadProgress(75); }, 2000);
    const timer4 = setTimeout(() => { setCurrentStepIndex(4); setUploadProgress(90); }, 2500);

    try {
      const categoryParam = selectedCategory === 'Auto' ? undefined : selectedCategory;
      const createdDoc = await uploadDocumentFile(file, categoryParam);
      
      setCurrentStepIndex(5);
      setUploadProgress(100);
      setCompletedDocId(createdDoc.id);

      if (onSuccess) {
        setTimeout(() => {
          onSuccess(createdDoc.id);
        }, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to process document');
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setIsProcessing(false);
    setCompletedDocId(null);
    setUploadedFileName('');
    setUploadProgress(0);
    setCurrentStepIndex(0);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Smart Document Ingestion</h3>
              <p className="text-xs text-slate-400">Upload PDF, Images, DOCX or TXT with automated OCR & vectorization</p>
            </div>
          </div>
          
          <button
            onClick={() => { resetModal(); onClose(); }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {!isProcessing ? (
            <>
              {/* Category selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Target Category (Optional)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['Auto', 'Education', 'Identity', 'Finance', 'Bills', 'Employment', 'Certificates', 'Insurance', 'Personal'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        selectedCategory === cat
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-medium'
                          : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {cat === 'Auto' ? '✨ Auto-Detect' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drag & Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-500/10 scale-[0.99]'
                    : 'border-slate-700/80 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-800/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple={false}
                  accept=".pdf,.jpg,.jpeg,.png,.docx,.txt,.csv"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600/20 to-blue-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10">
                  <UploadCloud className="w-7 h-7 animate-bounce" />
                </div>

                <h4 className="text-sm font-semibold text-white mb-1">
                  Click to browse or drag & drop files here
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mb-4">
                  Supports PDF, JPG, PNG, DOCX, and TXT up to 50MB with instant OCR text extraction
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
                  <span>🔒 End-to-end encrypted</span>
                  <span>•</span>
                  <span>Zero-knowledge data isolation</span>
                </div>
              </div>

              {/* Sample Document Quick-Upload pills for instant demo */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Or Upload a Sample Test Document
                  </span>
                  <span className="text-[11px] text-indigo-400">1-click demo</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'University_Marksheet.pdf', cat: 'Education' as DocumentCategory },
                    { name: 'Driver_License_Card.pdf', cat: 'Identity' as DocumentCategory },
                    { name: 'Broadband_Invoice.pdf', cat: 'Bills' as DocumentCategory }
                  ].map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const blob = new Blob([`Sample document content for ${sample.name}. Extracted registration number: DL-04-2022-0941. Valid until 15 October 2032.`], { type: 'application/pdf' });
                        const fakeFile = new File([blob], sample.name, { type: 'application/pdf' });
                        processFile(fakeFile);
                      }}
                      className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:bg-slate-800 hover:border-indigo-500/40 text-left transition-all group flex items-center justify-between"
                    >
                      <div className="truncate pr-1">
                        <p className="text-xs font-medium text-slate-200 truncate group-hover:text-indigo-300">{sample.name}</p>
                        <p className="text-[10px] text-slate-500">{sample.cat}</p>
                      </div>
                      <FileText className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Live Multi-Stage Processing Visualizer */
            <div className="py-4 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{uploadedFileName}</h4>
                    <p className="text-xs text-indigo-400 flex items-center gap-1.5 mt-0.5">
                      {currentStepIndex < 5 ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>{processingSteps[currentStepIndex].title}...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Processing Complete & Vector Indexed</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-bold text-white">{uploadProgress}%</span>
                  <p className="text-[10px] text-slate-500">Pipeline status</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-[1px]">
                <div
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              {/* Visual Step Tree */}
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  AI Processing Pipeline
                </p>
                {processingSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = currentStepIndex > idx || currentStepIndex === 5;
                  const isCurrent = currentStepIndex === idx && currentStepIndex < 5;
                  return (
                    <div
                      key={step.title}
                      className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                        isCurrent
                          ? 'bg-indigo-500/10 border border-indigo-500/30'
                          : isDone
                          ? 'bg-slate-900/40 border border-slate-800/40'
                          : 'opacity-40'
                      }`}
                    >
                      <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isCurrent
                          ? 'bg-indigo-500 text-white animate-pulse'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold ${isDone ? 'text-emerald-300' : isCurrent ? 'text-indigo-300' : 'text-slate-400'}`}>
                            Step {idx + 1}: {step.title}
                          </span>
                          {isCurrent && <span className="text-[10px] text-indigo-400 font-mono">Running...</span>}
                          {isDone && <span className="text-[10px] text-emerald-400 font-mono">Completed</span>}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {completedDocId && (
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    Upload Another File
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetModal();
                      onClose();
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                  >
                    <span>Done & View in Library</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
