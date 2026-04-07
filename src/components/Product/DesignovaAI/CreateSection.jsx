import React from 'react';
import {
  Instagram, Layout, Briefcase, Youtube, FileText,
  BarChart3, Zap, GraduationCap, Search, Sparkles,
  ArrowRight, ChevronRight, PlayCircle, Plus
} from 'lucide-react';

const CreateLikeAPro = () => {
  const assets = [
    { title: "Presentation", desc: "Professional Pitch Decks", icon: <Layout />, color: "bg-[#1e40af]", span: "md:col-span-2 md:row-span-2", img: "https://i.pinimg.com/1200x/d0/4f/b6/d04fb60a154c498471bed4cfe623be96.jpg" },
    { title: "Video", desc: "Reels & Shorts", icon: <PlayCircle />, color: "bg-[#0c4a6e]", span: "md:col-span-2", img: "https://i.pinimg.com/1200x/30/18/13/301813fb720e4eaf8806779dab86f882.jpg" },
    { title: "Instagram", desc: "Social Media", icon: <Instagram />, color: "bg-[#3b82f6]", span: "md:col-span-1", img: "https://i.pinimg.com/1200x/64/9c/78/649c78b9ff49697c0a3045a7fa77ef9e.jpg" },
    { title: "Brand Logo", desc: "Identity", icon: <Briefcase />, color: "bg-[#fbbf24]", span: "md:col-span-1", img: "https://i.pinimg.com/1200x/0b/f0/d2/0bf0d2fc63ac0edeec465f421fc1fb3a.jpg" },
    { title: "YouTube", desc: "Thumbnails", icon: <Youtube />, color: "bg-[#0ea5e9]", span: "md:col-span-1", img: "https://i.pinimg.com/1200x/65/d4/f4/65d4f4f0f8ddd6e1f12b80e86e85390e.jpg" },
    { title: "Whiteboard", desc: "Brainstorming", icon: <FileText />, color: "bg-[#64748b]", span: "md:col-span-1", img: "https://i.pinimg.com/1200x/56/ab/c7/56abc725b56645b4c195eea302a0f259.jpg" },
    { title: "Infographic", desc: "Data Viz", icon: <BarChart3 />, color: "bg-[#3b82f6]", span: "md:col-span-1", img: "https://i.pinimg.com/1200x/8c/58/bc/8c58bc9219cebde7a911513437d0617d.jpg" },
    { title: "Resume", desc: "CV Design", icon: <GraduationCap />, color: "bg-[#475569]", span: "md:col-span-1", img: "https://i.pinimg.com/1200x/fc/e3/0b/fce30b888b5b51bbf5781509d5e5e205.jpg" },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#eff6ff] text-[#0c4a6e] font-sans min-h-screen relative overflow-hidden selection:bg-[#3b82f6] selection:text-white">

      {/* Decorative Blur Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#3b82f6]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] bg-[#60a5fa]/20 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ================= TOP NAV & SEARCH ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#3b82f6]/20 text-[#1e40af] text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles size={12} className="animate-pulse" /> Athena Magic Studio
            </div>
            <h2 className="font-serif text-5xl md:text-6xl tracking-tight leading-[1.1] text-[#0c4a6e]">
              Design <span className="italic text-[#3b82f6]">anything</span> <br />
              <span className="font-sans font-light opacity-60 text-3xl md:text-4xl">at the speed of thought.</span>
            </h2>
          </div>

          <div className="relative w-full lg:max-w-md group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-[#94a3b8] group-focus-within:text-[#3b82f6] transition-colors" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search 100,000+ layouts..."
              className="w-full pl-14 pr-4 py-5 rounded-[12px] bg-white border-2 border-transparent focus:border-[#3b82f6]/30 outline-none transition-all text-lg shadow-xl shadow-blue-900/5 placeholder:text-[#94a3b8]"
            />
            <div className="absolute right-4 inset-y-0 flex items-center">
              <kbd className="hidden sm:inline-block px-2 py-1 bg-[#eff6ff] rounded-[4px] text-[#64748b] text-[10px] font-mono border border-[#3b82f6]/10">⌘ K</kbd>
            </div>
          </div>
        </div>

        {/* ================= BENTO GRID ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[160px]">
          {assets.map((item, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-[12px] bg-white border border-white hover:border-[#3b82f6]/20 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between ${item.span}`}
              style={item.img ? { backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              {/* Overlay for better text visibility when image is present */}
              {item.img && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              )}

              {/* Animated Background Highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#3b82f6]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-[10px] ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ${item.img ? 'bg-white/90 backdrop-blur-sm' : ''}`}>
                  {React.cloneElement(item.icon, { size: 24, className: item.img ? "text-[#0c4a6e]" : "text-white" })}
                </div>
                <h3 className={`text-lg font-bold transition-colors ${item.img ? 'text-white' : 'text-[#0c4a6e] group-hover:text-[#3b82f6]'}`}>{item.title}</h3>
                <p className={`text-xs font-medium opacity-80 ${item.img ? 'text-white/90' : 'text-[#64748b]'}`}>{item.desc}</p>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-xs font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <span className={item.img ? 'text-white' : 'text-[#3b82f6]'}>
                  Start Creating <Plus size={14} />
                </span>
              </div>

              {/* Decorative Large Icon for spanning cards */}
              {item.span.includes('md:col-span-2') && (
                <div className={`absolute -right-4 -bottom-4 transition-colors ${item.img ? 'text-white/5 group-hover:text-white/10' : 'text-[#0c4a6e]/5 group-hover:text-[#3b82f6]/10'}`}>
                  {React.cloneElement(item.icon, { size: 120 })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ================= INTERACTIVE AI FOOTER ================= */}
        <div className="mt-12 group relative overflow-hidden rounded-[12px] bg-gradient-to-r from-[#1e40af] to-[#3b82f6] p-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbbf24] via-white to-[#fbbf24] opacity-0 group-hover:opacity-20 transition-opacity animate-shimmer" />

          <div className="relative bg-[#0c4a6e] rounded-[10px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#fbbf24] blur-xl opacity-30 animate-pulse" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex items-center justify-center shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                  <Zap size={32} className="text-[#0c4a6e] fill-current" />
                </div>
              </div>
              <div className="text-white">
                <h4 className="text-2xl font-serif italic tracking-wide">Magic Write™ AI</h4>
                <p className="text-blue-100/70 text-sm mt-1 max-w-sm">From rough drafts to polished copy in seconds. Your creative co-pilot is ready.</p>
              </div>
            </div>

            <button className="group flex items-center gap-3 px-10 py-4 bg-white text-[#0c4a6e] rounded-[8px] font-bold hover:bg-[#fbbf24] hover:scale-105 active:scale-95 transition-all shadow-xl">
              Launch Studio
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 5s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default CreateLikeAPro;