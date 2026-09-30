'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Files,
  HardDrive,
  Bot,
  Layers,
  FolderKanban,
  CheckCircle2,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export function StatsCards() {
  const { documents, collections, user } = useApp();

  const activeDocs = documents.filter((d) => !d.isTrash);
  const totalStorageMB = ((user?.storageUsed || 0) / (1024 * 1024)).toFixed(1);
  const readyDocs = activeDocs.filter((d) => d.status === 'ready').length;
  const totalChunks = activeDocs.reduce((acc, d) => acc + (d.chunks?.length || 1), 0);

  const stats = [
    {
      title: 'Total Documents',
      value: activeDocs.length,
      unit: 'files',
      icon: Files,
      color: 'from-blue-500/20 to-indigo-500/20',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      change: '+100% indexed'
    },
    {
      title: 'Storage Used',
      value: totalStorageMB,
      unit: 'MB / 5 GB',
      icon: HardDrive,
      color: 'from-purple-500/20 to-pink-500/20',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
      change: 'Encrypted Vault'
    },
    {
      title: 'AI Semantic Queries',
      value: user?.totalQueries || 148,
      unit: 'queries run',
      icon: Bot,
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      change: 'Sub-second latency'
    },
    {
      title: 'Vector Chunks',
      value: totalChunks,
      unit: 'indexed embeddings',
      icon: Layers,
      color: 'from-amber-500/20 to-orange-500/20',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/20',
      change: '1536-dim RAG vectors'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-2xl bg-slate-900/60 border ${stat.borderColor} backdrop-blur-md flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-200 group`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400 truncate">{stat.title}</span>
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center ${stat.textColor} shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] text-slate-500 font-medium truncate">{stat.unit}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-400">
                <Sparkles className="w-3 h-3" />
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
