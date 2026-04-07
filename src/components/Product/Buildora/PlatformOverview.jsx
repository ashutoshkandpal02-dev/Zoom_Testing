import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layout, MousePointer2,
  Layers, Move, Plus, ChevronRight,
  Eye, Zap, Smartphone, Monitor, Globe,
  Palette, Check, Code, Settings, Sparkles,
  Command
} from "lucide-react";

/**
 * PreBuiltSections - A balanced, high-fidelity "Website Editor" showcase.
 * Features soft gradients, clean light/vibrant themes, and "Under Development" cues.
 * Perfectly balances "Light & Professional" with "Interactive & Detailed".
 */
const PreBuiltSections = () => {
  const [activeTab, setActiveTab] = useState("top");
  const [activePalette, setActivePalette] = useState("ocean"); // Default to a soft, balanced gradient
  const [isBuilding, setIsBuilding] = useState(false);

  // Palettes with soft gradients and balanced light/vibrant colors
  const palettes = {
    ocean: {
      name: "Ocean Mist",
      primary: "bg-blue-600",
      secondary: "text-blue-500",
      bg: "bg-gradient-to-br from-blue-50 to-white",
      surface: "bg-white/80",
      border: "border-blue-100",
      text: "text-slate-800",
      accent: "blue",
      previewBg: "#f0f7ff"
    },
    sunset: {
      name: "Soft Sunset",
      primary: "bg-indigo-600",
      secondary: "text-indigo-500",
      bg: "bg-gradient-to-br from-indigo-50 via-white to-purple-50",
      surface: "bg-white/80",
      border: "border-indigo-100",
      text: "text-slate-800",
      accent: "indigo",
      previewBg: "#f5f3ff"
    },
    royal: {
      name: "Royal Clean",
      primary: "bg-[#001D3D]",
      secondary: "text-blue-600",
      bg: "bg-gradient-to-br from-slate-50 to-blue-50",
      surface: "bg-white",
      border: "border-slate-200",
      text: "text-[#001D3D]",
      accent: "navy",
      previewBg: "#f8fafc"
    }
  };

  const current = palettes[activePalette];

  // AI Thinking simulation
  useEffect(() => {
    setIsBuilding(true);
    const timer = setTimeout(() => setIsBuilding(false), 600);
    return () => clearTimeout(timer);
  }, [activeTab, activePalette]);

  const sections = {
    top: {
      title: "Hero Part",
      description: "Build a stunning header that grabs everyone's attention.",
      render: (p) => (
        <div className={`${p.bg} h-full flex flex-col items-center justify-center p-8 text-center space-y-8 relative overflow-hidden transition-all duration-700`}>
          {/* Subtle Dev Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:30px_30px]" />

          <div className={`w-full h-12 ${p.surface} backdrop-blur-md rounded-2xl flex items-center justify-between px-8 border ${p.border} shadow-sm relative z-10 transition-all duration-700`}>
            <div className="flex gap-2 items-center"><div className={`w-3 h-3 rounded-full ${p.primary}`} /><span className={`text-[11px] font-black uppercase ${p.text} tracking-widest`}>Creative AI</span></div>
            <div className="flex gap-6 text-[9px] font-bold text-slate-400 uppercase"><span>Features</span><span>Solutions</span><span>About</span></div>
            <div className={`px-5 py-2 ${p.primary} rounded-xl text-[9px] text-white font-black uppercase tracking-wider shadow-lg shadow-blue-500/10`}>Get Started</div>
          </div>

          <div className="space-y-6 pt-10 relative z-10">
            <div className={`inline-block px-4 py-1 rounded-full border ${p.border} text-slate-400 text-[8px] font-bold uppercase tracking-[0.3em] bg-white/50`}>[ Section: Hero ]</div>
            <h3 className={`text-5xl font-serif font-bold ${p.text} leading-tight tracking-tight`}>Expert Business <br /><span className={p.secondary}>made simple.</span></h3>
            <p className="text-[13px] text-slate-500 max-w-[280px] mx-auto leading-relaxed font-medium">Everything you need to grow your brand, built for you in seconds.</p>
            <div className="flex gap-4 justify-center">
              <div className={`w-32 h-10 ${p.primary} rounded-2xl flex items-center justify-center text-[10px] font-black uppercase text-white shadow-xl shadow-blue-500/20`}>Try Now</div>
              <div className={`w-32 h-10 bg-white border ${p.border} rounded-2xl flex items-center justify-center text-[10px] font-black uppercase text-slate-400`}>Explore</div>
            </div>
          </div>
        </div>
      )
    },
    middle: {
      title: "Feature Part",
      description: "Display your top services using high-tech grid blocks.",
      render: (p) => (
        <div className={`${p.bg} h-full p-12 relative overflow-hidden transition-all duration-700`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#00000002_0%,transparent_50%)]" />

          <div className="text-center mb-10">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 inline-block">[ Component: Services ]</span>
          </div>

          <div className="grid grid-cols-2 gap-8 relative z-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`bg-white p-6 rounded-[2.5rem] border ${p.border} shadow-sm flex flex-col gap-5 hover:scale-105 transition-transform duration-500`}>
                <div className={`w-10 h-10 rounded-2xl ${p.bg} flex items-center justify-center ${p.secondary} border ${p.border}`}>
                  <Zap size={20} className="animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className={`text-[13px] font-bold ${p.text}`}>Service {i}</p>
                    <div className={`w-2 h-2 rounded-full ${p.primary} animate-ping opacity-20`} />
                  </div>
                  <div className={`h-1.5 w-12 ${p.primary} opacity-10 rounded-full`} />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Smart AI checking layout and alignment for you...</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    bottom: {
      title: "Pricing Part",
      description: "Present your plans with world-class, conversion-ready cards.",
      render: (p) => (
        <div className={`${p.bg} h-full flex items-center justify-center p-8 relative overflow-hidden transition-all duration-700`}>
          <div className="grid grid-cols-2 gap-8 w-full relative z-10">
            <div className={`p-10 bg-white/60 backdrop-blur-sm rounded-[3rem] border ${p.border} flex flex-col items-center opacity-60`}>
              <span className="text-slate-300 text-[7px] font-black uppercase mb-6 tracking-[0.2em]">[ Type: Studio ]</span>
              <p className="text-[12px] font-bold text-slate-400 uppercase mb-4">Basic</p>
              <p className={`text-4xl font-serif font-bold ${p.text}`}>$0</p>
              <div className="w-full space-y-4 my-8">
                <div className="h-1.5 bg-slate-100 rounded-full" />
                <div className="h-1.5 bg-slate-100 rounded-full" />
              </div>
              <div className={`w-full py-4 bg-white border ${p.border} rounded-[1.5rem] text-[10px] font-black text-slate-300 text-center uppercase`}>Choose Plan</div>
            </div>
            <div className={`p-10 bg-white rounded-[3rem] border-2 ${p.border.replace('blue-100', 'blue-400')} shadow-2xl shadow-blue-900/5 flex flex-col items-center scale-110 relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 ${p.primary} text-white text-[9px] px-5 py-2 font-black rounded-bl-[1.5rem] uppercase`}>Popular</div>
              <span className="text-slate-300 text-[7px] font-black uppercase mb-6 tracking-[0.2em]">[ Type: Pro ]</span>
              <p className={`text-[12px] font-bold ${p.secondary} uppercase mb-4`}>Business</p>
              <p className={`text-4xl font-serif font-bold ${p.text}`}>$49</p>
              <div className="w-full space-y-4 my-8">
                <div className={`h-1.5 ${p.primary} opacity-20 rounded-full`} />
                <div className={`h-1.5 ${p.primary} opacity-20 rounded-full`} />
              </div>
              <div className={`w-full py-4 ${p.primary} rounded-[1.5rem] text-[10px] font-black text-white text-center uppercase tracking-widest shadow-xl shadow-blue-500/20`}>Get Started</div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* 1. LEFT COLUMN: Easy-to-understand Text */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 text-blue-600 font-bold text-[11px] uppercase tracking-[0.4em]"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Intelligent Builder
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="font-serif text-5xl lg:text-7xl text-[#001D3D] leading-tight font-bold"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Create your <br />
                <span className="text-blue-600">stunning site</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-lg text-slate-500 font-medium font-sans leading-relaxed"
              >
                Watch our AI build your layout piece by piece.
                Just pick a part, choose a vibe, and see the magic happen instantly.
              </motion.p>
            </div>

            {/* Part Selectors with Simplified Labels */}
            <div className="space-y-3">
              {Object.keys(sections).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left p-6 rounded-[2.5rem] transition-all border-2 flex items-center justify-between group ${activeTab === key
                      ? "bg-blue-50 border-blue-100 shadow-xl shadow-blue-900/5 translate-x-2"
                      : "bg-transparent border-transparent hover:bg-slate-50 text-slate-400"
                    }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${activeTab === key ? "bg-[#001D3D] text-white shadow-2xl" : "bg-slate-100 text-slate-300"
                      }`}>
                      {key === 'top' ? <Layout size={24} /> : key === 'middle' ? <Zap size={24} /> : <Eye size={24} />}
                    </div>
                    <div>
                      <h4 className={`text-[13px] font-black uppercase tracking-widest ${activeTab === key ? "text-[#001D3D]" : "text-slate-400"}`}>
                        {sections[key].title}
                      </h4>
                      <p className={`text-[12px] font-bold mt-1 ${activeTab === key ? "text-slate-500" : "text-slate-300"}`}>
                        {sections[key].description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className={`transition-all ${activeTab === key ? "text-[#001D3D] translate-x-1" : "text-slate-100"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* 2. RIGHT COLUMN: Interactive Laptop Mockup (Balanced Design Mode) */}
          <div className="lg:col-span-7 relative">

            {/* --- LAPTOP FRAME --- */}
            <div className="relative mx-auto w-full max-w-[650px] group/laptop">

              {/* Top Bezel / Lid */}
              <div className="relative bg-[#2d2d2d] rounded-t-[2rem] pt-3 pb-1 px-4 shadow-2xl border-t border-x border-[#444]">
                <div className="flex justify-center mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111] border border-white/5" />
                </div>

                {/* SCREEN CONTAINER */}
                <div className="relative bg-[#f8fafc] rounded-t-[1rem] overflow-hidden border border-[#222] shadow-inner">

                  {/* Browser Header Bar */}
                  <div className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <div className="flex gap-2 items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-full px-8 py-1.5 flex items-center gap-3">
                      <Globe size={10} className="text-slate-300" />
                      <span className="text-[8px] font-black text-slate-300 tracking-[0.2em] uppercase">BUILDORA.STUDIO/LIVE_PREVIEW</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-1.5 rounded-lg border border-slate-100 text-[8px] font-black text-slate-400 uppercase">
                        Status: {isBuilding ? "Optimizing..." : "Active"}
                      </div>
                      <Settings size={14} className="text-slate-200 animate-spin-slow" />
                    </div>
                  </div>

                  {/* Live Dashboard Area with Theme Panel */}
                  <div className="relative flex h-[350px] lg:h-[480px] overflow-hidden">

                    {/* LEFT MINI PANEL: Style Presets */}
                    <div className="w-20 bg-white border-r border-slate-100 flex flex-col items-center py-8 gap-10 z-30">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                        <Palette size={18} />
                      </div>
                      <div className="flex flex-col gap-6">
                        {Object.keys(palettes).map((key) => (
                          <button
                            key={key}
                            onClick={() => setActivePalette(key)}
                            className={`w-10 h-10 rounded-[1.25rem] border-2 flex items-center justify-center transition-all duration-300 relative group/btn ${activePalette === key ? "border-blue-500 scale-125 shadow-xl shadow-blue-500/10" : "border-transparent grayscale opacity-40 hover:opacity-100 hover:grayscale-0"
                              }`}
                            style={{ background: palettes[key].bg.includes('gradient') ? palettes[key].previewBg : palettes[key].previewBg }}
                          >
                            <div className={`w-6 h-6 rounded-lg ${palettes[key].primary} opacity-80`} />
                            {activePalette === key && (
                              <div className="absolute -right-1 -top-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                                <Check size={8} className="text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="mt-auto pb-4 text-slate-200">
                        <Code size={18} />
                      </div>
                    </div>

                    {/* CENTER PREVIEW: Balanced Website Preview */}
                    <div className="flex-1 overflow-hidden relative transition-all duration-700 bg-white">

                      {/* Soft AI Scan Indicator */}
                      <AnimatePresence>
                        {isBuilding && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-white/40 backdrop-blur-[2px] flex items-center justify-center"
                          >
                            <div className="flex flex-col items-center gap-6">
                              <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-500 animate-bounce">
                                <Sparkles size={24} />
                              </div>
                              <span className="text-[9px] font-black text-blue-500 tracking-[0.4em] uppercase">Analyzing Design...</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab + activePalette}
                          initial={{ opacity: 0, scale: 0.99 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.01 }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0"
                        >
                          {/* Website Canvas with Minimal Annotation Rulers */}
                          <div className="h-full flex flex-col relative">
                            <div className="h-8 border-b border-slate-100 flex items-center justify-between px-10 bg-white/50 relative z-20">
                              <div className="flex gap-1 items-center"><div className="w-1 h-1 rounded-full bg-slate-200" /><span className="text-[6px] text-slate-300 font-bold uppercase tracking-widest">Layout: 100% Optmized</span></div>
                              <div className="flex gap-4"><div className="w-4 h-0.5 bg-slate-100" /><div className="w-4 h-0.5 bg-slate-100" /></div>
                            </div>

                            <div className="flex-1 overflow-hidden">
                              {sections[activeTab].render(current)}
                            </div>

                            {/* Small Development Badge Overlay */}
                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1.5 h-16 bg-blue-500/10 rounded-r-full" />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white border border-slate-100 shadow-xl rounded-full flex items-center gap-2 pointer-events-none">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-[7px] font-black uppercase text-slate-400 tracking-widest">Ready to publish</span>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Interactive Cursor */}
                      <motion.div
                        animate={{
                          x: [80, 250, 180, 350, 100],
                          y: [100, 300, 150, 420, 200]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute z-50 pointer-events-none"
                      >
                        <div className="flex items-center gap-3">
                          <MousePointer2 className="text-blue-600 fill-current drop-shadow-xl" size={28} />
                          <div className="bg-white border border-blue-100 text-[#001D3D] text-[8px] font-black px-4 py-2 rounded-2xl shadow-xl uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            Perfecting Layout
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bezel */}
              <div className="relative">
                <div className="h-5 bg-[#2d2d2d] rounded-b-[0.5rem] border-b border-[#111] shadow-2xl relative z-20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-[#111] rounded-b-xl" />
                </div>
                <div className="absolute -bottom-4 left-[3%] right-[3%] h-4 bg-[#1a1a1a] rounded-b-[2rem] -z-10 shadow-lg" />
              </div>
            </div>

            {/* Decoration Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)] -z-20 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PreBuiltSections;
