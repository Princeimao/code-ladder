"use client"
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ProblemsSection from "@/components/ProblemsSection";
import StatsOverview from "@/components/StatsOverview";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsOverview />
      <ProblemsSection />
      <Features />
    </main>
  );
}
