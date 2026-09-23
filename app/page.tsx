import React from 'react';
import Hero from '@/components/home/Hero';
import IntroSection from '@/components/home/IntroSection';
import PracticeGrid from '@/components/home/PracticeGrid';
import IndustriesSection from '@/components/home/IndustriesSection';
import PeopleSection from '@/components/home/PeopleSection';
import ContactCTA from '@/components/home/ContactCTA';
import LatestNews from '@/components/home/LatestNews';
import PartnersMarquee from '@/components/home/PartnersMarquee';
import { getActivePartners } from '@/lib/partners';

export default async function HomePage() {
  const activePartners = await getActivePartners();
  return (
    <main className="min-h-screen">
      {/* SECTION 1 — HERO */}
      <Hero />

      {/* SECTION 3 — INTRODUCTION */}
      <IntroSection />

      {/* SECTION 4 — PRACTICE AREAS */}
      <PracticeGrid />

      {/* SECTION 5 — FEATURED INSIGHT (DARK SECTION) */}

      {/* SECTION 6 — LEGAL INTELLIGENCE */}

      {/* SECTION 7 — INDUSTRIES */}
      <IndustriesSection />

      {/* SECTION 8 — PEOPLE */}
      <PeopleSection />

      {/* SECTION 9 — WHY US */}

      {/* SECTION 10 — CONTACT CTA */}
      <LatestNews />

      {/* SECTION 10 — PARTNERS */}
      <PartnersMarquee partners={activePartners} />

      {/* SECTION 11 — CONTACT CTA */}
      <ContactCTA />
    </main>
  );
}
