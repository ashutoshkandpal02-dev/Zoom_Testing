import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, ChevronRight, ChevronLeft,
  Globe, Layout, Smartphone, Monitor
} from "lucide-react";

import mixtasImg from "../../../assets/Buildora/Mixtas.webp";
import modernImg from "../../../assets/Buildora/Modern.webp";
import uniqueImg from "../../../assets/Buildora/Unique.webp";
import wordpressImg from "../../../assets/Buildora/WordPress.webp";
import palletImg from "../../../assets/Buildora/Pallet.webp";
import buildImg from "../../../assets/Buildora/Build.webp";

/**
 * CustomWebsiteSystem - A premium template showcase following a high-fidelity "Browser-in-Card" design.
 * Makes common images look like professional, ready-to-use website templates.
 */
const CustomWebsiteSystem = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/contact");
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const templates = [
    {
      id: 1,
      title: "Mixtas Fashion",
      image: mixtasImg,
      url: "mixtas.buildora.com",
      isWide: false,
    },
    {
      id: 2,
      title: "Modern Interior",
      image: modernImg,
      url: "interior-hub.buildora.com",
      isWide: true,
    },
    {
      id: 3,
      title: "Nadine Hoch",
      image: uniqueImg,
      url: "nadine-portfolio.buildora.com",
      isWide: false,
    },
    {
      id: 4,
      title: "Business Elite",
      image: wordpressImg,
      url: "elite-biz.buildora.com",
      isWide: true,
    },
    {
      id: 5,
      title: "Stop Searching",
      image: palletImg,
      url: "real-estate.buildora.com",
      isWide: false,
    },
    {
      id: 6,
      title: "Urban Loft",
      image: buildImg,
      url: "urban-loft.buildora.com",
      isWide: true,
    }
  ];

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-blue-200 overflow-hidden relative font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header: Split Format */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-20">
          <div className="max-w-xl">
            <h2
              className="text-5xl lg:text-7xl font-sans text-black leading-[1.05] tracking-tight font-bold"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Website templates are <br />
              <span className="text-blue-600">another way in</span>
            </h2>
          </div>

          <div className="max-w-xs space-y-8">
            <p className="text-sm text-black font-medium font-sans leading-relaxed">
              Our free website builder offers 2000+ <span className="underline cursor-pointer" onClick={handleRedirect}>website templates</span>, all fully customizable and ready for business.
            </p>
            <button
              onClick={handleRedirect}
              className="flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.4em] text-blue-600 border-b-2 border-blue-600 pb-2 hover:gap-4 transition-all duration-300"
            >
              Start Creating <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Template Showcase Slider */}
        <div className="relative group">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-black hover:bg-blue-600 hover:text-white transition-all border border-slate-100"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-black hover:bg-blue-600 hover:text-white transition-all border border-slate-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-10 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 py-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {templates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`snap-start transition-all duration-500 ${template.isWide
                  ? "min-w-[320px] lg:min-w-[500px] h-[350px] lg:h-[480px]"
                  : "min-w-[220px] lg:min-w-[340px] h-[350px] lg:h-[480px]"
                  }`}
                onClick={handleRedirect}
              >
                {/* THE BROWSER FRAME CARD */}
                <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 group/card cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_80px_100px_-20px_rgba(0,18,61,0.1)] transition-all duration-700">

                  {/* Browser Bar (Making it look like a template) */}
                  <div className="h-12 bg-white border-b border-slate-50 flex items-center justify-between px-6">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2 h-2 rounded-full bg-red-400/30" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400/30" />
                      <div className="w-2 h-2 rounded-full bg-green-400/30" />
                    </div>
                    <div className="px-6 py-1 bg-slate-50 border border-slate-100/50 rounded-full flex items-center gap-2">
                      <Globe size={8} className="text-slate-200" />
                      <span className="text-[7px] font-black text-slate-300 tracking-widest uppercase">{template.url}</span>
                    </div>
                    <div className="flex gap-2">
                      <Monitor size={10} className="text-blue-600" />
                      <Smartphone size={10} className="text-slate-200" />
                    </div>
                  </div>

                  {/* Template Image Content */}
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-1000"
                      loading="lazy"
                    />

                    {/* Template Identification Overlay */}
                    <div className="absolute top-6 left-6 z-10 transition-transform group-hover/card:translate-y-[-10px]">
                      <div className="px-5 py-2.5 bg-white/10 backdrop-blur-3xl rounded-[1.25rem] border border-white/20 shadow-2xl">
                        <div className="flex items-center gap-3">
                          <Layout size={14} className="text-white" />
                          <div className="h-4 w-px bg-white/20" />
                          <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{template.title} Template</span>
                        </div>
                      </div>
                    </div>

                    {/* Gradient Overlay for Hover Action */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                    {/* Hover Action: "Edit Template" or "Live Preview" */}
                    <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-4 opacity-0 group-hover/card:opacity-100 transition-all transform translate-y-8 group-hover/card:translate-y-0 duration-500">
                      <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-white hover:text-blue-600 transition-all active:scale-95">
                        Edit This Template
                      </button>
                      <p className="text-[8px] font-bold text-white/60 tracking-[0.4em] uppercase">Built with Buildora v.2</p>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-16 flex items-center justify-between border-t border-slate-50 pt-10">
          <div className="flex items-center gap-8 text-black">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Integrated Hosting</span>
            <div className="h-4 w-px bg-slate-100" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Free Domain Support</span>
          </div>
          <button
            onClick={handleRedirect}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-black flex items-center gap-3 hover:text-blue-600 transition-all active:translate-x-1 duration-200"
          >
            Explore 2000+ Themes <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomWebsiteSystem;