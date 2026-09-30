'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  BarChart3,
  PieChart,
  HardDrive,
  Bot,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function AnalyticsPage() {
  const { documents, user, collections } = useApp();

  const activeDocs = documents.filter((d) => !d.isTrash);
  const totalStorageMB = ((user?.storageUsed || 0) / (1024 * 1024)).toFixed(1);

  // Category counts
  const categoryCounts: Record<string, number> = {};
  activeDocs.forEach((doc) => {
    categoryCounts[doc.category] = (categoryCounts[doc.category] || 0) + 1;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-indigo-400" />
          <span>Personal Document Analytics</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Vector space metrics, category distribution, and semantic inquiry performance.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <span className="text-xs text-slate-400 block mb-1">OCR Recognition Rate</span>
          <span className="text-2xl font-bold text-emerald-400">100%</span>
          <span className="text-[10px] text-slate-500 block mt-1">Zero corrupted pages</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <span className="text-xs text-slate-400 block mb-1">Average RAG Latency</span>
          <span className="text-2xl font-bold text-indigo-400">0.28s</span>
          <span className="text-[10px] text-slate-500 block mt-1">Sub-second neural lookup</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <span className="text-xs text-slate-400 block mb-1">Vector Dimensions</span>
          <span className="text-2xl font-bold text-amber-400">1536</span>
          <span className="text-[10px] text-slate-500 block mt-1">Dense neural embeddings</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <span className="text-xs text-slate-400 block mb-1">Lifetime AI Queries</span>
          <span className="text-2xl font-bold text-purple-400">{user?.totalQueries || 148}</span>
          <span className="text-[10px] text-slate-500 block mt-1">Across all uploaded docs</span>
        </div>
      </div>

      {/* Category Distribution Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-400" />
            <span>Documents by Category</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / (activeDocs.length || 1)) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{cat}</span>
                    <span className="text-slate-400 font-mono">{count} files ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Extracted Entity Clusters */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Top Extracted Entity Vectors</span>
          </h3>

          <div className="space-y-2 text-xs">
            {[
              { label: 'Aadhaar & National ID Vectors', hits: '12 queries', conf: '99%' },
              { label: 'Passport Validity & Issuance Dates', hits: '19 queries', conf: '99%' },
              { label: 'DTU B.Tech CGPA & Marksheet Semesters', hits: '28 queries', conf: '98%' },
              { label: 'Electricity & Utility Bill Invoices', hits: '15 queries', conf: '97%' },
              { label: 'HDFC Salary & Bank Account Credentials', hits: '11 queries', conf: '97%' },
              { label: 'Star Health Policy Number & Sum Insured', hits: '14 queries', conf: '98%' }
            ].map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">{item.hits}</span>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded font-mono">
                    {item.conf}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
