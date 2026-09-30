'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AskAIHeroBox } from '@/components/dashboard/AskAIHeroBox';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ExpiryAlertsWidget } from '@/components/dashboard/ExpiryAlertsWidget';
import { DocumentGrid } from '@/components/documents/DocumentGrid';
import { UploadModal } from '@/components/modals/UploadModal';
import {
  Sparkles,
  Files,
  ArrowRight,
  UploadCloud,
  Filter,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

export function DashboardPage() {
  const { user, documents } = useApp();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recent' | 'favorites'>('all');

  const activeDocs = documents.filter((d) => !d.isTrash);
  const filteredDocs = activeDocs.filter((d) => {
    if (selectedFilter === 'favorites') return d.isFavorite;
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {user?.name?.split(' ')[0] || 'Aditya'} 👋
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
              Pro Plan
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            All your personal documents are indexed and ready for natural language AI retrieval.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-xl transition-all shadow-lg shadow-indigo-600/25 active:scale-95 self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload New File</span>
        </button>
      </div>

      {/* Hero: Ask AI Semantic Search Box */}
      <AskAIHeroBox />

      {/* Telemetry Stats Cards */}
      <StatsCards />

      {/* Smart Expiry & Renewal Alerts */}
      <ExpiryAlertsWidget />

      {/* Recent Documents Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Files className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">Recent Documents</h3>
              <p className="text-[11px] text-slate-400">All OCR-indexed personal files</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({activeDocs.length})
              </button>
              <button
                onClick={() => setSelectedFilter('favorites')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedFilter === 'favorites'
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Favorites ({activeDocs.filter((d) => d.isFavorite).length})
              </button>
            </div>

            <Link
              href="/dashboard/documents"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium px-2 py-1"
            >
              <span>View Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Document Grid */}
        <DocumentGrid
          documents={filteredDocs.slice(0, 8)}
          onUploadClick={() => setIsUploadOpen(true)}
        />
      </div>

      {/* Upload Modal */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
}

export default DashboardPage;
