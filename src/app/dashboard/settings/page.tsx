'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Settings,
  User,
  Shield,
  Bot,
  Sun,
  Moon,
  HardDrive,
  CheckCircle2,
  Lock,
  Laptop
} from 'lucide-react';

export default function SettingsPage() {
  const { user, setUser, theme, setTheme } = useApp();
  const [name, setName] = useState(user?.name || 'Aditya Sharma');
  const [email, setEmail] = useState(user?.email || 'aditya.sharma@example.com');
  const [aiModel, setAiModel] = useState('Gemini 2.0 Flash / Pro');
  const [strictSources, setStrictSources] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => (prev ? { ...prev, name, email } : prev));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-indigo-400" />
          <span>Platform Settings & Preferences</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal vault profile, AI retrieval configurations, and appearance.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Profile Section */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-400" />
          <span>User Profile & Vault Identity</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1.5 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1.5 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Current Plan:</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">Pro Intelligence ($9/mo)</span>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* AI Search & Retrieval Preferences */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Bot className="w-4 h-4 text-indigo-400" />
          <span>AI Retrieval & Model Configuration</span>
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Inference Engine</label>
            <select
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Gemini 2.0 Flash / Pro">Gemini 2.0 Flash (Fast Neural RAG - Default)</option>
              <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet (Deep Reasoning)</option>
              <option value="GPT-4o Omnimodal">GPT-4o (High-Fidelity Structured Parsing)</option>
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white">Strict Source Grounding</h4>
              <p className="text-slate-400 text-[11px]">Enforces verifiable citations for every single AI output and blocks hallucinations.</p>
            </div>
            <input
              type="checkbox"
              checked={strictSources}
              onChange={(e) => setStrictSources(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Sun className="w-4 h-4 text-indigo-400" />
          <span>Interface Appearance</span>
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'dark', label: 'Dark Mode', icon: Moon },
            { id: 'light', label: 'Light Mode', icon: Sun },
            { id: 'system', label: 'System Default', icon: Laptop }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id as any)}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
