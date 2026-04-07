import React, { useState } from 'react';
import {
  LayoutTemplate, Palette, Copy,
  FileStack, Code2, CheckCircle2, ChevronRight,
  MousePointer2, Layers
} from 'lucide-react';

const CoreFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Easy Drag & Drop",
      desc: "Creating your site is as simple as dragging and dropping elements exactly where you want them.",
      icon: <LayoutTemplate size={24} />,
      detail: ["Visual building", "No coding needed", "Instant preview"]
    },
    {
      title: "Custom Colors & Styles",
      desc: "Change how your whole site looks in just a few clicks. Your brand, your colors, your way.",
      icon: <Palette size={24} />,
      detail: ["Personalized styles", "Auto-matching colors", "One-click updates"]
    },
    {
      title: "Ready-made blocks",
      desc: "No need to start from scratch. Use our pre-designed blocks to build sections in seconds.",
      icon: <Copy size={24} />,
      detail: ["Save your favorites", "Pro designs", "Quick and easy"]
    },
    {
      title: "Manage your pages",
      desc: "Easily add new pages and keep things organized. Everything is where it should be.",
      icon: <FileStack size={24} />,
      detail: ["Easy navigation", "Clean structure", "Simple links"]
    }
  ];

  return (
    <section className="py-24 bg-[#001D3D] relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* --- LEFT: TEXT CONTENT --- */}
          <div className="lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <Layers size={14} />
              <span>Modular Architecture</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
              Create your site <br />
              <span className="text-blue-500 italic">the simple way.</span>
            </h2>

            <div className="space-y-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveFeature(i)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${activeFeature === i
                    ? 'bg-white/10 border-white/20 shadow-2xl'
                    : 'bg-transparent border-transparent opacity-50 hover:opacity-100'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 ${activeFeature === i ? 'text-blue-400' : 'text-gray-400'}`}>
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                      {activeFeature === i && (
                        <div className="animate-fade-in">
                          <p className="text-blue-100/70 text-sm leading-relaxed mb-4">{f.desc}</p>
                          <div className="flex flex-wrap gap-3">
                            {f.detail.map((d, j) => (
                              <span key={j} className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                                <CheckCircle2 size={12} /> {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: DYNAMIC UI MOCKUP --- */}
          <div className="lg:w-7/12 w-full relative">
            <div className="relative bg-[#020C1B] rounded-[3rem] border border-white/10 p-4 lg:p-8 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden min-h-[500px]">

              {/* Interface Header */}
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Code2 size={16} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Buildora Console V4</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map(dot => <div key={dot} className="w-2 h-2 rounded-full bg-white/10" />)}
                </div>
              </div>

              {/* Dynamic Content based on active state */}
              <div className="grid grid-cols-12 gap-6 h-full transition-all duration-500">

                {/* Visual Representation of Active Feature */}
                <div className="col-span-12 lg:col-span-8 space-y-4">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5 h-[300px] flex items-center justify-center overflow-hidden group">
                    {activeFeature === 0 && (
                      <div className="grid grid-cols-2 gap-4 w-full animate-in zoom-in-95">
                        <div className="h-32 rounded-xl border-2 border-dashed border-blue-500/50 bg-blue-500/10 flex items-center justify-center"><LayoutTemplate className="text-blue-500" /></div>
                        <div className="h-32 rounded-xl border-2 border-dashed border-blue-500/20 bg-white/5" />
                        <div className="h-12 col-span-2 rounded-xl border-2 border-dashed border-blue-500/20 bg-white/5" />
                      </div>
                    )}
                    {activeFeature === 1 && (
                      <div className="flex flex-col items-center gap-6 animate-in slide-in-from-right-8">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                          <div className="w-12 h-12 rounded-full bg-indigo-500" />
                          <div className="w-12 h-12 rounded-full bg-cyan-500" />
                        </div>
                        <div className="w-48 h-2 bg-blue-500 rounded-full" />
                        <div className="w-32 h-2 bg-blue-500/50 rounded-full" />
                      </div>
                    )}
                    {activeFeature === 2 && (
                      <div className="w-full space-y-4 animate-in fade-in zoom-in-90">
                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-400 uppercase">Header_Section_V2</span>
                          <div className="px-3 py-1 bg-blue-500 text-[10px] rounded-full font-black uppercase tracking-tighter">Sync Active</div>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 opacity-40">
                          <span className="text-xs font-bold text-gray-400 uppercase">Footer_Minimal</span>
                        </div>
                      </div>
                    )}
                    {activeFeature === 3 && (
                      <div className="w-full space-y-2 animate-in slide-in-from-bottom-8">
                        <div className="flex items-center gap-3 text-blue-400"><ChevronRight size={14} /> <span className="text-sm font-bold">Home</span></div>
                        <div className="ml-6 flex items-center gap-3 text-gray-500"><ChevronRight size={14} /> <span className="text-sm font-bold">Pricing</span></div>
                        <div className="ml-6 flex items-center gap-3 text-gray-500"><ChevronRight size={14} /> <span className="text-sm font-bold">Resources</span></div>
                        <div className="ml-12 flex items-center gap-3 text-gray-600 border-l border-white/10 pl-4"><span className="text-sm">Documentation</span></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar Mockup */}
                <div className="hidden lg:block col-span-4 bg-white/5 rounded-2xl border border-white/5 p-4 space-y-4">
                  <div className="h-2 w-full bg-white/10 rounded" />
                  <div className="h-2 w-3/4 bg-white/10 rounded" />
                  <div className="pt-4 space-y-3">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-6 w-full bg-white/5 rounded border border-white/5" />)}
                  </div>
                </div>

              </div>

              {/* Cursor Interaction */}
              <div className="absolute bottom-10 right-10 animate-bounce">
                <MousePointer2 className="text-blue-500 fill-blue-500" size={32} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;