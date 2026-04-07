import React from 'react';
import {
  MousePointer2,
  Calendar,
  Wand2,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const FinalCTA = () => {
  return (
    /* Full-width background using the Athena Blue Gradient */
    <section className="relative w-full py-32 lg:py-48 bg-gradient-to-br from-[#0c4a6e] via-[#1e40af] to-[#3b82f6] overflow-hidden">

      {/* Background Architectural Elements */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />

      {/* Dynamic light glows */}
      <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-white/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#fbbf24]/10 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-20">

          {/* LEFT SIDE: EDITORIAL CONTENT */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[#fbbf24] font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
              <Sparkles size={14} fill="currentColor" />
              Empowering 100k+ Creators
            </div>

            <h2 className="font-serif text-6xl md:text-8xl text-white mb-8 leading-[0.9] tracking-tighter">
              Ready to <br />
              <span className="italic font-light text-white/80">Design Smarter?</span>
            </h2>

            <p className="font-sans text-xl md:text-2xl text-white/70 max-w-xl leading-relaxed font-light">
              Skip the technical friction. Start creating professional,
              <span className="text-white font-medium"> precision-grade visuals </span>
              in a matter of minutes.
            </p>
          </div>

          {/* RIGHT SIDE: ACTION MODULES */}
          <div className="flex flex-col gap-6 w-full lg:max-w-md">

            {/* Primary Action Button */}
            <button className="group relative w-full p-1 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-500 overflow-hidden">
              <div className="flex items-center justify-between bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] px-8 py-6 rounded-[calc(1rem-2px)] shadow-2xl">
                <div className="text-left">
                  <span className="block text-black font-black text-xl tracking-tight">Get Started Now</span>
                  <span className="block text-black/60 text-xs font-bold uppercase tracking-widest">Free for individuals</span>
                </div>
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={24} />
                </div>
              </div>
            </button>

            {/* Secondary Action Button */}
            <button className="group w-full flex items-center justify-between px-8 py-6 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Calendar size={20} className="text-[#fbbf24]" />
                </div>
                <div className="text-left">
                  <span className="block font-bold">Book a Demo</span>
                  <span className="block text-white/40 text-[10px] uppercase tracking-widest">15-min walkthrough</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
            </button>

            {/* Micro Trust Indicator */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-2 px-2">

              <span className="text-white/40 text-xs font-medium tracking-wide">
                Joined by top-tier designers globally
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Brand Marks */}
      <Wand2 className="absolute -bottom-20 left-10 text-white/5 w-64 h-64 -rotate-12 pointer-events-none" />
    </section>
  );
};

export default FinalCTA;