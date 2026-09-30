'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingHero } from '@/components/landing/LandingHero';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { SecuritySection } from '@/components/landing/SecuritySection';
import { PricingSection } from '@/components/landing/PricingSection';
import { LandingFooter } from '@/components/landing/LandingFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <FeaturesSection />
        <SecuritySection />
        <PricingSection />
      </main>
      <LandingFooter />
    </div>
  );
}
