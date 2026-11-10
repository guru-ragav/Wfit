import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { GYM_IMAGES } from '../assets/images';

interface SplashScreenProps {
  onGetStarted: () => void;
  onLoginClick: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onGetStarted,
  onLoginClick
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[#10110D] text-white flex flex-col justify-between overflow-hidden">
      {/* Background Hero Image with Dark Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={GYM_IMAGES.heroEquipment}
          alt="WFIT Gym Equipment"
          className="w-full h-full object-cover opacity-25 filter saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#10110D]/90 via-[#10110D]/75 to-[#10110D]" />
        {/* Neon Lime ambient glow circle */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#B2DF10]/15 rounded-full blur-[90px] pointer-events-none" />
      </div>

      {/* Top Bar with Language/Status */}
      <header className="relative z-10 p-6 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-white/70 bg-[#26291F]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
          <MapPin size={13} className="text-[#B2DF10]" />
          <span>Madurai, Tamil Nadu</span>
        </div>

        <button
          onClick={onLoginClick}
          className="text-xs font-semibold text-white/90 hover:text-white px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          Sign In
        </button>
      </header>

      {/* Main Center Content: Brand Hero */}
      <main className="relative z-10 px-6 py-8 flex flex-col items-center text-center max-w-lg mx-auto">
        {/* Pulsing WFIT MADURAI Logo */}
        <div className="p-4 rounded-3xl bg-[#26291F]/40 backdrop-blur-md border border-white/10 shadow-2xl mb-6">
          <BrandLogo size="lg" />
        </div>

        {/* Animated Neon Lime Green Divider Line */}
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#B2DF10] to-[#D1EF51] mb-6 shadow-[0_0_12px_rgba(178,223,16,0.6)]" />

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-md">
          Forge Your Strongest Body in the Temple City
        </h1>

        <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-sm">
          Madurai's premier performance fitness center across KK Nagar, Anna Nagar & Bypass Road. State-of-the-art strength zones, tailored South Indian nutrition & elite coaches.
        </p>

        {/* 3 Quick Value Highlights */}
        <div className="mt-8 grid grid-cols-3 gap-2 w-full max-w-sm">
          <div className="p-2.5 rounded-xl bg-[#26291F] border border-white/5 text-center">
            <span className="text-base font-bold text-[#D1EF51] tabular-nums">3</span>
            <span className="block text-[11px] text-white/60 font-medium">Clubs</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#26291F] border border-white/5 text-center">
            <span className="text-base font-bold text-[#D1EF51] tabular-nums">15+</span>
            <span className="block text-[11px] text-white/60 font-medium">Coaches</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#26291F] border border-white/5 text-center">
            <span className="text-base font-bold text-[#D1EF51] tabular-nums">100%</span>
            <span className="block text-[11px] text-white/60 font-medium">Results</span>
          </div>
        </div>
      </main>

      {/* Bottom Action Area */}
      <footer className="relative z-10 p-6 pb-8 max-w-md mx-auto w-full space-y-3">
        <button
          onClick={onGetStarted}
          className="w-full py-4 rounded-2xl btn-wfit-primary text-base font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#B2DF10]/20"
        >
          <span>Get Started — Enter WFIT</span>
          <ArrowRight size={18} />
        </button>

        <p className="text-center text-[11px] text-white/40">
          Instant QR check-in & personalized workouts included
        </p>
      </footer>
    </div>
  );
};
