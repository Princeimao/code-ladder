
import React from 'react';
import Hero from '../components/Hero';
import StatsOverview from '../components/StatsOverview';
import ProblemsSection from '../components/ProblemsSection';
import Features from '../components/Features';

const LandingPage: React.FC = () => {
  return (
    <main>
      <Hero />
      <StatsOverview />
      <ProblemsSection />
      <Features />
    </main>
  );
};

export default LandingPage;
