'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Bell, Check, Trash2, X, Info, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-indigo-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 text-slate-100">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-white">Notifications</span>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded-full font-mono">
            {notifications.filter((n) => !n.read).length} new
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={markAllNotificationsRead}
            className="text-[11px] text-slate-400 hover:text-indigo-300 px-2 py-1 rounded transition-colors"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto p-2 space-y-1">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No notifications at this time.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                n.read
                  ? 'bg-transparent hover:bg-slate-800/40 text-slate-400'
                  : 'bg-indigo-500/10 border border-indigo-500/20 text-slate-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-semibold truncate ${n.read ? 'text-slate-300' : 'text-white'}`}>
                    {n.title}
                  </h4>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{n.message}</p>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
