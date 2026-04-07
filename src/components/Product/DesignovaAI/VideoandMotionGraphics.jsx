import React, { useState } from 'react';
import {
  Sparkles, Search, MoveRight, Layers,
  Palette, PlayCircle, Image as ImageIcon, Wand2
} from 'lucide-react';

import img from "../../../assets/aiaiai.jpg"

const VideoMotionSection = () => {
  const [activeStyle, setActiveStyle] = useState('Dreamy');

  const styles = [
    { name: 'Dreamy', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200' },
    { name: 'Anime', img: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&q=80&w=200' },
    { name: 'Watercolor', img: img },
    { name: 'Filmic', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* --- LEFT SIDE: THE GENERATOR INTERFACE --- */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider mb-8 w-fit">
              <Sparkles size={14} />
              <span>Magic Media™</span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
              Try Image <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
                Generator
              </span>
            </h2>

            <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
              Turn pure text to art with Motion Studio. Simply enter a prompt,
              pick a style, and watch your words transform into beautiful, high-performance visuals.
            </p>

            {/* MAGIC INPUT BAR */}
            <div className="relative group max-w-xl mb-12">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="text-purple-400 group-focus-within:text-purple-600 transition-colors" size={20} />
              </div>
              <input
                type="text"
                placeholder="Moon rising over the mountains"
                className="w-full pl-14 pr-32 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-purple-500 focus:outline-none transition-all text-slate-700 shadow-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-[#7d2ae8] hover:bg-[#6a21c9] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                Generate
              </button>
            </div>

            {/* FEATURE MINI-GRID */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-lg"><Layers size={18} /></div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Smart Layers</p>
                  <p className="text-xs text-slate-500">Auto-detect depth</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-orange-50 text-orange-600 rounded-lg"><Wand2 size={18} /></div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">AI Beats</p>
                  <p className="text-xs text-slate-500">Sync to sound</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: THE VISUAL PREVIEW --- */}
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-200 to-blue-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />

            <div className="relative">
              {/* Main Generated Image */}
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
                <img
                  src={img}
                  alt="AI Generation"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Preview Controls */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 cursor-pointer transition-all">
                    <PlayCircle size={24} />
                  </div>
                </div>
              </div>

              {/* STYLE SELECTOR OVERLAY (Matching the screenshot) */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-3xl shadow-2xl p-4 flex items-center justify-between border border-slate-100">
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {styles.map((s) => (
                    <div
                      key={s.name}
                      onClick={() => setActiveStyle(s.name)}
                      className="flex flex-col items-center gap-1 cursor-pointer shrink-0"
                    >
                      <div className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${activeStyle === s.name ? 'border-purple-600 scale-105 shadow-lg' : 'border-transparent opacity-70'}`}>
                        <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                      <span className={`text-[10px] font-bold ${activeStyle === s.name ? 'text-purple-600' : 'text-slate-400'}`}>{s.name}</span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center gap-1 opacity-70 cursor-pointer shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                      20+
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">More</span>
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-100 mx-4 hidden sm:block" />

                <button className="hidden sm:flex items-center gap-2 text-slate-800 font-bold text-sm px-4 py-2 hover:bg-slate-50 rounded-xl transition-colors shrink-0">
                  Styles <Palette size={16} className="text-purple-500" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default VideoMotionSection;