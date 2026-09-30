'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UploadModal } from '@/components/modals/UploadModal';
import {
  LayoutDashboard,
  Files,
  Bot,
  FolderKanban,
  Clock,
  GitBranch,
  BarChart3,
  ShieldAlert,
  Trash2,
  Settings,
  UploadCloud,
  HardDrive,
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { documents, collections, user } = useApp();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const activeDocs = documents.filter((d) => !d.isTrash);
  const trashDocs = documents.filter((d) => d.isTrash);
  const expiringCount = activeDocs.filter((d) => d.extractedEntities.expiryDate).length;

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null },
    { label: 'My Documents', href: '/dashboard/documents', icon: Files, badge: activeDocs.length },
    { label: 'AI Search & RAG', href: '/dashboard/chat', icon: Bot, badge: 'AI' },
    { label: 'Collections', href: '/dashboard/collections', icon: FolderKanban, badge: collections.length },
    { label: 'Expiry Intelligence', href: '/dashboard/expiry', icon: Clock, badge: expiringCount > 0 ? expiringCount : null, alert: expiringCount > 0 },
    { label: 'Smart Timeline', href: '/dashboard/timeline', icon: GitBranch, badge: null },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, badge: null },
    { label: 'Privacy Vault', href: '/dashboard/privacy', icon: ShieldAlert, badge: null },
    { label: 'Trash', href: '/dashboard/trash', icon: Trash2, badge: trashDocs.length > 0 ? trashDocs.length : null },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings, badge: null },
  ];

  // Storage calculation
  const storageUsedMB = (user?.storageUsed || 0) / (1024 * 1024);
  const storageLimitMB = (user?.storageLimit || 5368709120) / (1024 * 1024);
  const storagePercent = Math.min(100, Math.max(1, (storageUsedMB / storageLimitMB) * 100));

  return (
    <>
      <aside className="w-64 border-r border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shrink-0 select-none">
        
        {/* Navigation Section */}
        <div className="p-3 space-y-6 overflow-y-auto">
          
          {/* Quick Action Button */}
          <button
            onClick={() => setIsUploadOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Document</span>
          </button>

          {/* Core Navigation Items */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Workspace
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                        item.alert
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : isActive
                          ? 'bg-indigo-500/25 text-indigo-300'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Collection Shortcuts */}
          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between px-3 mb-1">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Smart Categories
              </span>
              <Link href="/dashboard/collections" className="text-[10px] text-indigo-400 hover:underline">
                View All
              </Link>
            </div>
            {collections.slice(0, 4).map((col) => (
              <Link
                key={col.id}
                href={`/dashboard/documents?category=${col.category}`}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                  <span className="truncate">{col.name}</span>
                </div>
                <span className="text-[10px] text-slate-500">{col.documentCount}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom: Storage Used Meter */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                <span>Vault Storage</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {storageUsedMB.toFixed(1)} MB / 5 GB
              </span>
            </div>

            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                style={{ width: `${Math.max(2, storagePercent)}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Secure Encrypted
              </span>
              <Link href="/dashboard/settings" className="text-[10px] text-indigo-400 hover:underline">
                Upgrade
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Upload Modal */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  );
}
