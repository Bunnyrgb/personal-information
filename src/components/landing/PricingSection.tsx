'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export function PricingSection() {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      name: 'Starter Vault',
      desc: 'Ideal for individuals organizing essential personal IDs, certificates & bills.',
      price: '$0',
      period: 'forever free',
      highlighted: false,
      cta: 'Start for Free',
      features: [
        'Up to 25 Documents indexed',
        'Standard OCR & Entity Extraction',
        '100 AI Semantic Queries / month',
        'Direct Source Citations',
        '1 GB Encrypted Vault Storage',
        'Smart Collections & Tags'
      ]
    },
    {
      name: 'Pro Intelligence',
      desc: 'For power users needing unlimited OCR, cross-document reasoning & expiry alerts.',
      price: annualBilling ? '$9' : '$12',
      period: 'per month',
      highlighted: true,
      badge: 'Most Popular',
      cta: 'Get Started with Pro',
      features: [
        'Unlimited Documents & OCR',
        'Cross-Document Comparative Reasoning',
        'Sub-second RAG retrieval',
        'Automated Expiry & Renewal Alerts',
        '50 GB Encrypted Vault Storage',
        'Multi-Page PDF Text Highlighter',
        'Priority Vector Processing Pipeline',
        'Export All Vectors & Audit Logs'
      ]
    },
    {
      name: 'Family & Enterprise',
      desc: 'For families and professionals requiring multi-member vaults with audit controls.',
      price: annualBilling ? '$24' : '$29',
      period: 'per month',
      highlighted: false,
      cta: 'Contact Enterprise',
      features: [
        'Up to 5 Family / Team Member Vaults',
        'Zero-knowledge inter-member sharing',
        '500 GB Storage with redundancy',
        'Dedicated Vector Pipeline & SLA',
        'Custom OCR Models for specialized docs',
        '24/7 Priority Support & Onboarding'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 relative border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simple, Transparent Plans
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Start free with full RAG capabilities. Upgrade when you need higher storage or multi-member vaults.
          </p>

          {/* Annual Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs ${!annualBilling ? 'text-white font-semibold' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className="w-12 h-6 rounded-full bg-slate-800 border border-slate-700 p-0.5 relative transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-full bg-indigo-500 transition-transform ${annualBilling ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-xs flex items-center gap-1.5 ${annualBilling ? 'text-white font-semibold' : 'text-slate-400'}`}>
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Save 25%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-indigo-950/70 via-slate-900 to-slate-900 border-2 border-indigo-500/60 shadow-2xl shadow-indigo-600/15 scale-105 z-10'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-6 min-h-[32px]">{plan.desc}</p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-800">
                  <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Features included:</p>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/dashboard"
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-lg ${
                  plan.highlighted
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
