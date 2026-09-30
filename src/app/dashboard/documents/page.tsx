'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { DocumentCategory, DocumentItem } from '@/types';
import { DocumentGrid } from '@/components/documents/DocumentGrid';
import { DocumentTable } from '@/components/documents/DocumentTable';
import { UploadModal } from '@/components/modals/UploadModal';
import {
  Files,
  Search,
  LayoutGrid,
  List,
  UploadCloud,
  Star,
  Loader2
} from 'lucide-react';

function DocumentsContent() {
  const { documents } = useApp();
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as DocumentCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const activeDocs = documents.filter((d) => !d.isTrash);

  const filteredDocs = activeDocs.filter((doc) => {
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
    if (onlyFavorites && !doc.isFavorite) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchSummary = doc.summary.toLowerCase().includes(q);
      const matchTags = doc.tags.some((t) => t.toLowerCase().includes(q));
      const matchOCR = doc.ocrText?.toLowerCase().includes(q);
      if (!matchName && !matchSummary && !matchTags && !matchOCR) return false;
    }
    return true;
  });

  const categories: (DocumentCategory | 'all')[] = [
    'all',
    'Education',
    'Identity',
    'Employment',
    'Certificates',
    'Bills',
    'Finance',
    'Insurance',
    'Personal'
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Files className="w-6 h-6 text-indigo-400" />
            <span>Smart Document Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize, preview, and manage your personal documents with neural OCR search.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-xl transition-all shadow-lg shadow-indigo-600/25 active:scale-95 self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document name, tags, or OCR text..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          
          {/* Favorites toggle */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              onlyFavorites
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                : 'border-slate-800 text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400' : ''}`} />
            <span>Favorites</span>
          </button>

          {/* Grid / Table View Mode Toggle */}
          <div className="flex rounded-xl bg-slate-950 border border-slate-800 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl border transition-all shrink-0 capitalize ${
              selectedCategory === cat
                ? 'bg-indigo-600 border-indigo-500 text-white font-medium shadow-md shadow-indigo-600/20'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat === 'all' ? `All Documents (${activeDocs.length})` : cat}
          </button>
        ))}
      </div>

      {/* Main Document Listing */}
      {viewMode === 'grid' ? (
        <DocumentGrid documents={filteredDocs} onUploadClick={() => setIsUploadOpen(true)} />
      ) : (
        <DocumentTable documents={filteredDocs} />
      )}

      {/* Upload Modal */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex items-center justify-center text-xs text-slate-500 gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
          <span>Loading Document Hub...</span>
        </div>
      }
    >
      <DocumentsContent />
    </Suspense>
  );
}
