import React, { useState, useEffect } from 'react';
import { MousePointer2, Image as ImageIcon, Send, Wand2, Layers, CheckCircle } from 'lucide-react';

const AthenaHeroRedesign = () => {
  const [prompt, setPrompt] = useState("");
  const fullText = "Create Instagram post for coffee shop";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPrompt(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    // Background using Gray 50 (#f5f5f5) from system
    <section className="relative min-h-screen bg-[#f5f5f5] overflow-hidden flex items-center">
      {/* Background Accent using Sky Blue with low opacity */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#60a5fa]/10 -skew-x-12 translate-x-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 text-left">
            {/* Title using Georgia/Serif font style */}
            <h1 className="font-serif text-6xl lg:text-7xl text-[#0c4a6e] leading-[1.1] mb-8">
              Design <br />
              Anything in <br />
              <span className="italic text-[#3b82f6]">Minutes </span>
              with AI
            </h1>

            {/* Body Text using Inter/Sans style */}
            <p className="font-sans text-xl text-[#475569] mb-10 max-w-md leading-relaxed">
              Create stunning graphics, videos, and brand assets without design skills.
              The future of creativity is just one prompt away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary Button: Gold/Amber Gradient style */}
              <button className="px-10 py-5 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-black rounded-[8px] font-bold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 group">
                Start Designing Now
                <Wand2 size={18} className="group-hover:rotate-12 transition-transform" />
              </button>

              {/* Outline Button style */}
              <button className="px-10 py-5 bg-white text-[#3b82f6] border-2 border-[#3b82f6] rounded-[8px] font-bold hover:bg-[#3b82f6]/5 transition-all flex items-center justify-center gap-2">
                Explore Templates
                <Layers size={18} />
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-[#64748b]">
              <div className="flex items-center gap-2 text-sm font-medium"><CheckCircle size={16} className="text-[#3b82f6]" /> No Card Required</div>
              <div className="flex items-center gap-2 text-sm font-medium"><CheckCircle size={16} className="text-[#3b82f6]" /> 100+ AI Models</div>
            </div>
          </div>

          {/* RIGHT CONTENT: The Interactive Workspace */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-20 group">
              {/* Main Dashboard UI: Using Navy Dark (#0f172a) for the frame */}
              <div className="bg-[#0f172a] rounded-[2rem] p-3 shadow-2xl overflow-hidden border-8 border-white">
                <div className="bg-[#1e293b] rounded-[1.5rem] overflow-hidden">
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                    </div>
                    <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Canvas Area */}
                  <div className="aspect-[4/3] p-6 relative">
                    <div className="w-full h-full rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center bg-white/5 relative group/canvas overflow-hidden">

                      {/* Animated Generating Effect: Using Sky Blue */}
                      <div className="relative z-10 flex flex-col items-center animate-pulse">
                        <div className="w-16 h-16 bg-[#3b82f6]/20 rounded-xl flex items-center justify-center text-[#60a5fa] mb-4 shadow-2xl">
                          <ImageIcon size={32} />
                        </div>
                        <p className="text-[#60a5fa] font-sans text-xs tracking-widest uppercase font-semibold">Generating magic...</p>
                      </div>

                      {/* Floating Prompt Bar */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white p-4 rounded-lg shadow-2xl flex items-center gap-3 transform group-hover/canvas:-translate-y-2 transition-transform">
                          {/* Prompt Icon using Blue Secondary Gradient style */}
                          <div className="p-2 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] rounded-md text-white">
                            <Send size={18} />
                          </div>
                          <div className="text-[#475569] font-sans text-sm border-r-2 border-[#3b82f6] pr-1 overflow-hidden whitespace-nowrap">
                            {prompt}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            {/* Background Glow using the Hero Gradient palette */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#3b82f6]/20 rounded-full blur-[100px] -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AthenaHeroRedesign;