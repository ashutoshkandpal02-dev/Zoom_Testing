import React from 'react';
import { Star, Quote, CheckCircle, Users, Globe, ArrowUpRight } from 'lucide-react';

const SocialProofSection = () => {
  const logos = ["Vanguard", "Vertex", "Pulse", "Aether", "Nova", "Echo", "Flux", "Onyx"];

  const testimonials = [
    {
      quote: "Designova turned our 3-day design workflow into a 5-minute task. Mind-blowing speed.",
      author: "Sarah Jenkins",
      role: "Founder, Bloom Coffee",
      color: "from-blue-500 to-cyan-400"
    },
    {
      quote: "The AI understands brand consistency better than most junior designers I've hired.",
      author: "Marcus Chen",
      role: "Marketing Director",
      color: "from-indigo-500 to-blue-600"
    }
  ];

  return (
    <section className="py-24 bg-blue-50/20 relative overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(191,219,254,0.3)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">

        {/* --- TOP HUD: STATS --- */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24 border-b border-blue-100 pb-16">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest mb-4">
              <Globe size={14} className="animate-pulse" />
              <span>Global Momentum</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-[#001D3D] leading-[1.1] tracking-tighter">
              The choice of <span className="text-blue-600">top-tier</span> teams.
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-1">
                <Users className="text-blue-600" size={20} />
                <span className="text-3xl font-black text-[#001D3D]">100K+</span>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Creators</p>
            </div>

            <div className="w-[1px] h-12 bg-blue-100 hidden sm:block" />

            <div className="text-center lg:text-left">
              <div className="flex items-center gap-1 justify-center lg:justify-start mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-3xl font-black text-[#001D3D] ml-2">4.9</span>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Average Rating</p>
            </div>
          </div>
        </div>

        {/* --- LOGO TICKER: INFINITE SCROLL EFFECT --- */}
        <div className="mb-32 relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8FBFF] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F8FBFF] to-transparent z-10" />

          <p className="text-center text-[10px] font-black tracking-[0.3em] text-blue-300 uppercase mb-10">
            Trusted by industry leaders
          </p>

          <div className="flex overflow-hidden group">
            <div className="flex gap-16 lg:gap-24 animate-marquee whitespace-nowrap py-4">
              {[...logos, ...logos].map((logo, i) => (
                <span key={i} className="text-2xl lg:text-4xl font-black text-slate-300/60 hover:text-blue-600 transition-colors cursor-default tracking-tighter">
                  {logo.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- TESTIMONIALS: FEATURED CARDS --- */}
        <div className="grid lg:grid-cols-2 gap-12">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-blue-50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/40"
            >
              {/* Decorative Card Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${t.color} opacity-[0.03] rounded-bl-[5rem] group-hover:opacity-10 transition-opacity`} />

              <Quote className="text-blue-100 mb-8 transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500" size={56} />

              <p className="text-2xl font-bold text-[#001D3D] leading-snug mb-10 relative z-10">
                "{t.quote}"
              </p>

              <div className="flex items-center justify-between border-t border-blue-50 pt-8">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xl font-black shadow-lg`}>
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-[#001D3D] flex items-center gap-1.5">
                      {t.author} <CheckCircle size={16} className="text-blue-500 fill-blue-50" />
                    </h4>
                    <p className="text-sm font-medium text-gray-400">{t.role}</p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Verified User</span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <ArrowUpRight className="text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default SocialProofSection;