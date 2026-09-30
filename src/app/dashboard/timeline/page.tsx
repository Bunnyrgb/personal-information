'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DocumentItem } from '@/types';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import {
  GitBranch,
  Calendar,
  FileText,
  ExternalLink,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Receipt,
  Landmark,
  Sparkles
} from 'lucide-react';

export default function SmartTimelinePage() {
  const { documents } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const timelineEvents = [
    {
      year: '2026',
      date: '28 Feb 2026',
      title: 'Health Insurance Policy Renewal Due',
      category: 'Insurance',
      docName: 'Star_Health_Comprehensive_Insurance.pdf',
      desc: 'Annual policy renewal for ₹15 Lakhs sum insured under Star Comprehensive Insurance.',
      icon: ShieldCheck,
      color: '#ec4899'
    },
    {
      year: '2025',
      date: '24 Oct 2025',
      title: 'Tata Power Electricity Bill Due Date',
      category: 'Bills',
      docName: 'Electricity_Bill_Oct2025.pdf',
      desc: 'Monthly residential power invoice of ₹1,842.50 due for payment.',
      icon: Receipt,
      color: '#f59e0b'
    },
    {
      year: '2025',
      date: '01 Mar 2025',
      title: 'Star Health Insurance Policy Commenced',
      category: 'Insurance',
      docName: 'Star_Health_Comprehensive_Insurance.pdf',
      desc: 'Individual medical policy initiated with comprehensive cashless network coverage.',
      icon: ShieldCheck,
      color: '#ec4899'
    },
    {
      year: '2021',
      date: '12 Jul 2021',
      title: 'Graduated B.Tech in Computer Science & Engineering',
      category: 'Education',
      docName: 'B.Tech_Degree_Certificate.pdf',
      desc: 'Conferred First Class with Distinction (8.84 CGPA) by Delhi Technological University.',
      icon: GraduationCap,
      color: '#3b82f6'
    },
    {
      year: '2021',
      date: '19 Mar 2021',
      title: 'Republic of India Passport Issued',
      category: 'Identity',
      docName: 'Passport_Document.pdf',
      desc: '10-Year passport Z8924018 issued at Regional Passport Office Delhi. Valid until 18 March 2031.',
      icon: ShieldCheck,
      color: '#10b981'
    },
    {
      year: '2020',
      date: '31 Aug 2020',
      title: 'Completed Software Development Internship at XYZ Tech',
      category: 'Employment',
      docName: 'XYZ_Tech_Internship_Certificate.pdf',
      desc: '3-Month tenure working with Go, Python, React and telemetry pipelines with 32% latency improvement.',
      icon: Briefcase,
      color: '#8b5cf6'
    },
    {
      year: '2018',
      date: '10 Jun 2018',
      title: 'UIDAI Aadhaar Card Generated',
      category: 'Identity',
      docName: 'Aadhaar_Card.pdf',
      desc: '12-Digit national biometric identity 4589 1234 8921 issued by UIDAI.',
      icon: ShieldCheck,
      color: '#10b981'
    }
  ];

  const handleOpenDocByName = (name: string) => {
    const doc = documents.find((d) => d.name.toLowerCase().includes(name.toLowerCase()));
    if (doc) setSelectedDoc(doc);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <GitBranch className="w-6 h-6 text-indigo-400" />
          <span>Smart Personal Timeline</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Chronological neural map connecting academic credentials, career history, government IDs, and life events.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8 my-6">
        {timelineEvents.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div key={idx} className="relative group">
              
              {/* Timeline Marker Dot */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-125"
                style={{ backgroundColor: evt.color }}
              >
                <Icon className="w-3 h-3" />
              </div>

              {/* Event Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-semibold text-white text-sm">{evt.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {evt.date}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                      {evt.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {evt.desc}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Source: {evt.docName}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenDocByName(evt.docName)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                  >
                    <span>View Document</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
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
    </div>
  );
}
