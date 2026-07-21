"use client";

import React from "react";
import { BackgroundParticles } from "@/components/canvas/BackgroundParticles";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedSection } from "@/components/sections/TrustedSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090B] text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Background Grid & Particles */}
      <BackgroundParticles />

      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section with 3D Core */}
      <HeroSection />

      {/* Trusted Client Logos 3D Marquee */}
      <TrustedSection />

      {/* Features Section with 3D Mini-Canvases */}
      <FeaturesSection />

      {/* Interactive 3D Journey Timeline */}
      <TimelineSection />

      {/* Product Modules */}
      <ProductsSection />

      {/* 3D Floating Laptop Live OS Demo */}
      <DemoSection />

      {/* Animated Glowing Statistics Counters */}
      <StatsSection />

      {/* Spatial 3D Floating Testimonials */}
      <TestimonialsSection />

      {/* 3D Pricing Matrix */}
      <PricingSection />

      {/* FAQ Accordion */}
      <FAQSection />

      {/* Final Conversion CTA */}
      <CTASection />

      {/* Constellation Footer */}
      <Footer />
    </main>
  );
}
