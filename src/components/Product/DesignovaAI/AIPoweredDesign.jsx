import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, Maximize2, Palette, Image as ImageIcon,
  UserSquare2, Sparkles, Wand2, Type, ChevronRight,
  Cpu, MousePointer2, Terminal
} from 'lucide-react';

const AIDesignEngine = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const features = [
    {
      title: "Neural Prompting",
      desc: "Linguistic engine converts ideas into high-fidelity wireframes.",
      icon: <Sparkles size={20} />,
      prompt: "Synthesizing: 'Minimalist skincare landing page'...",
      color: "bg-blue-600"
    },
    {
      title: "Recursive Layouts",
      desc: "AI-driven spatial balance using the Golden Ratio.",
      icon: <Maximize2 size={20} />,
      prompt: "Calculating: 1.618 spatial distribution...",
      color: "bg-indigo-600"
    },
    {
      title: "Smart Palettes",
      desc: "Context-aware color theory and typography pairing.",
      icon: <Palette size={20} />,
      prompt: "Matching: Brand mood to chromatic scale...",
      color: "bg-cyan-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // 20deg tilt
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y });
  };

  return (
    <section className="py-24 bg-[#F0F7FF] relative overflow-hidden font-sans">
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#001D3D 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">

          {/* LEFT: Features Control Panel */}
          <div className="w-full lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest mb-8 border border-blue-200">
              <Cpu size={14} className="animate-spin-slow" />
              <span>Core Engine v4.0</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black text-[#001D3D] mb-8 leading-[0.9] tracking-tighter">
              AI That Sees <br />
              <span className="text-blue-600">The Future.</span>
            </h2>

            <div className="relative space-y-4 mb-12">
              {/* Vertical Connector Line */}
              <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-blue-100" />

              {features.map((f, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveFeature(i)}
                  className={`relative w-full text-left p-6 rounded-[2rem] transition-all duration-500 flex items-start gap-6 border ${activeFeature === i
                      ? 'bg-white border-blue-200 shadow-2xl shadow-blue-200/40 translate-x-4 scale-[1.02]'
                      : 'bg-transparent border-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
                    }`}
                >
                  <div className={`z-10 w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all duration-500 ${activeFeature === i ? `${f.color} text-white shadow-lg rotate-6` : 'bg-blue-50 text-blue-400'
                    }`}>
                    {f.icon}
                  </div>
                  <div className="pt-1 flex-1">
                    <h3 className={`text-xl font-black transition-colors ${activeFeature === i ? 'text-[#001D3D]' : 'text-gray-400'}`}>
                      {f.title}
                    </h3>
                    <div className={`overflow-hidden transition-all duration-500 ${activeFeature === i ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                  {activeFeature === i && <ChevronRight className="mt-4 text-blue-300 animate-pulse" />}
                </button>
              ))}
            </div>

            {/* Micro-Tool Chips */}
            <div className="flex flex-wrap gap-3 pt-8 border-t border-blue-100">
              {[
                { icon: <UserSquare2 size={14} />, label: "Face Enhancer" },
                { icon: <Wand2 size={14} />, label: "1-Click Resize" },
                { icon: <ImageIcon size={14} />, label: "Denoise AI" },
                { icon: <Type size={14} />, label: "Font Sync" }
              ].map((t, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[10px] font-bold text-blue-900 shadow-sm border border-blue-50 hover:border-blue-300 transition-colors cursor-crosshair">
                  {t.icon} {t.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: 3D Interactive Design Terminal */}
          <div
            className="w-full lg:w-7/12"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            style={{ perspective: '1200px' }}
          >
            <div
              className="relative bg-slate-900 rounded-[3.5rem] p-3 lg:p-8 shadow-[0_50px_100px_-20px_rgba(0,30,60,0.3)] border-[10px] border-white transition-transform duration-200 ease-out"
              style={{ transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)` }}
            >
              {/* Terminal Header */}
              <div className="flex justify-between items-center mb-6 px-6 pt-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-widest uppercase">
                  <Terminal size={12} /> Live_Processing_Agent
                </div>
              </div>

              {/* Viewport Canvas */}
              <div className="aspect-[4/3] bg-[#001D3D] rounded-[2.5rem] overflow-hidden relative flex items-center justify-center border border-white/5 shadow-inner">
                {/* Simulated AI Cursor */}
                <div className="absolute top-1/3 left-1/3 animate-bounce z-40 opacity-70">
                  <MousePointer2 className="text-white fill-blue-500 drop-shadow-xl" size={28} />
                </div>

                {/* Floating HUD Information */}
                <div className="absolute top-8 inset-x-8 z-30">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                      <span className="text-xs font-mono text-blue-100 whitespace-nowrap overflow-hidden border-r-2 border-blue-500 pr-2">
                        {features[activeFeature].prompt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Generative Visuals */}
                <div className="relative w-full h-full flex items-center justify-center p-12">
                  {/* State 0: Neural Grid */}
                  <div className={`absolute inset-0 transition-all duration-1000 ${activeFeature === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                    <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)] animate-pulse" />
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-48 h-64 border-2 border-dashed border-blue-400/40 rounded-3xl flex items-center justify-center">
                        <Sparkles size={48} className="text-blue-500/50" />
                      </div>
                    </div>
                  </div>

                  {/* State 1: Layout Boxes */}
                  <div className={`absolute inset-16 grid grid-cols-2 gap-4 transition-all duration-1000 ${activeFeature === 1 ? 'opacity-100 rotate-0 translate-y-0' : 'opacity-0 -rotate-6 translate-y-12'}`}>
                    <div className="bg-white/5 rounded-2xl border border-white/10" />
                    <div className="space-y-4">
                      <div className="h-1/3 bg-blue-500/20 rounded-2xl border border-blue-500/30" />
                      <div className="h-2/3 bg-white/5 rounded-2xl border border-white/10" />
                    </div>
                  </div>

                  {/* State 2: Color Psychology */}
                  <div className={`absolute transition-all duration-1000 flex gap-6 ${activeFeature === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-20 h-20 rounded-full bg-gradient-to-t from-transparent to-white/10 border-2 border-white/20 shadow-2xl flex items-center justify-center">
                        <div className={`w-14 h-14 rounded-full ${i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-indigo-500' : 'bg-cyan-500'} animate-pulse`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Status Ticker */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-blue-600/20 text-blue-300 text-[9px] font-black px-3 py-1 rounded-md tracking-tighter uppercase border border-blue-500/20">
                    Processing Frame_0{activeFeature + 1}
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`w-1 h-${i * 2} bg-blue-500/40 rounded-full`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Background Glow Effect */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-200/50 rounded-full blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDesignEngine;