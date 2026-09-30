'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Logo } from '@/components/common/Logo';
import { NotificationsDrawer } from '@/components/modals/NotificationsDrawer';
import { UploadModal } from '@/components/modals/UploadModal';
import {
  Search,
  UploadCloud,
  Bell,
  Sun,
  Moon,
  Laptop,
  RotateCcw,
  Shield,
  User,
  LogOut,
  Sparkles,
  ChevronDown,
  FileCheck
} from 'lucide-react';

export function Navbar({ onOpenGlobalSearch }: { onOpenGlobalSearch?: () => void }) {
  const { user, theme, setTheme, notifications, resetToDemoData, logoutUser, loginDemoUser } = useApp();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl transition-colors">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          
          {/* Left: Brand Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-6">
            <Logo size="md" showTagline={false} />
            
            {/* Quick stats pill on desktop */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vector Neural Index: <strong className="text-emerald-400">Online</strong></span>
            </div>
          </div>

          {/* Center: Global Search Bar Trigger */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <button
              onClick={onOpenGlobalSearch || (() => router.push('/dashboard/chat'))}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 rounded-xl hover:border-slate-700 hover:bg-slate-900 transition-all group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                <span className="truncate">Ask your documents: "What is my Aadhaar number?"</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700/80 rounded">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Actions (Upload, Notifications, Theme, User) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Reset Demo Data button */}
            <button
              onClick={() => {
                resetToDemoData();
                alert('Demo documents and seed data have been reloaded!');
              }}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-indigo-300 rounded-lg hover:bg-slate-900 border border-slate-800 transition-colors"
              title="Reset Sample Documents"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>

            {/* Quick Upload Button */}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-xl transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.98]"
            >
              <UploadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Document</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotifsOpen(!isNotifsOpen)}
                className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              <NotificationsDrawer isOpen={isNotifsOpen} onClose={() => setIsNotifsOpen(false)} />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors hidden sm:flex"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* User Profile / Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 transition-colors text-left"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover border border-slate-700"
                  />
                  <div className="hidden md:block">
                    <p className="text-xs font-semibold text-white leading-tight">{user.name}</p>
                    <p className="text-[10px] text-indigo-400 leading-none">{user.plan} Plan</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                      <p className="font-semibold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Account Settings</span>
                    </Link>

                    <Link
                      href="/dashboard/privacy"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Privacy Vault</span>
                    </Link>

                    <Link
                      href="/login"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-600/10 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Switch Account / Sign In</span>
                    </Link>

                    <div className="my-1 border-t border-slate-800" />

                    <button
                      onClick={() => {
                        logoutUser();
                        setIsUserMenuOpen(false);
                        router.push('/login');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={loginDemoUser}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Upload Modal */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  );
}
