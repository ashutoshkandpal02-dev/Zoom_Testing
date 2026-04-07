import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Rocket, Smartphone, Megaphone, GraduationCap,
  Presentation, Building2, Briefcase, Trophy,
  ChevronLeft, ChevronRight, Sparkles, ArrowUpRight
} from 'lucide-react';

const TargetAudience = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false, duration: 20 },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const personas = [
    { title: "Entrepreneurs", desc: "Build your brand identity from zero with AI design.", icon: <Rocket size={20} />, image: "https://i.pinimg.com/1200x/bb/82/76/bb827690143f0136ee208ab1feb91a21.jpg" },
    { title: "Social Managers", desc: "Generate a month of content in just a few clicks.", icon: <Smartphone size={20} />, image: "https://i.pinimg.com/1200x/5a/6a/96/5a6a96d046c84ebfd42fd9e3f08ceb21.jpg" },
    { title: "Digital Marketers", desc: "A/B test ad creatives with rapid AI variations.", icon: <Megaphone size={20} />, image: "https://i.pinimg.com/1200x/29/fd/92/29fd92db23cc76cee5b492e60559a671.jpg" },
    { title: "Students", desc: "Make your presentations and resumes stand out from others.", icon: <GraduationCap size={20} />, image: "https://i.pinimg.com/1200x/d3/d9/cf/d3d9cfea927de704be806ccc3574edeb.jpg" },
    { title: "Teachers", desc: "Create engaging visual lessons that students love.", icon: <Presentation size={20} />, image: "https://i.pinimg.com/1200x/4b/43/88/4b4388256b1cd4324efb4153fc1c84d6.jpg" },
    { title: "Enterprises", desc: "Scale global brand consistency with shared assets.", icon: <Building2 size={20} />, image: "https://i.pinimg.com/1200x/41/3c/bb/413cbb460ea626ce84d38180a22ac6c1.jpg" },
    { title: "Agencies", desc: "Onboard clients and deliver designs 10x faster.", icon: <Briefcase size={20} />, image: "https://i.pinimg.com/1200x/8f/22/97/8f2297485bbcc8f8b7f4985c34a94ab8.jpg" },
  ];

  return (
    <section className="py-24 bg-white text-[#0c4a6e] font-sans overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-50/40 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-100 text-[#3b82f6] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Sparkles size={14} className="animate-pulse" />
              <span>WHO CAN USE IT?</span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl text-[#0c4a6e] leading-[1.05] tracking-tight mb-4">
              Built for everyone, <br />
              <span className="text-[#3b82f6] italic font-light underline decoration-blue-100 decoration-4 underline-offset-8">no matter what you create.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col items-end gap-6">
            <div className="flex gap-4">
              <button
                onClick={scrollPrev}
                className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#64748b] hover:bg-[#3b82f6] hover:text-white hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={scrollNext}
                className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#64748b] hover:bg-[#3b82f6] hover:text-white hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Visual Progress Bar */}
            <div className="flex gap-1.5 h-1 items-center">
              {scrollSnaps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-full transition-all duration-500 rounded-full ${selectedIndex === idx ? 'w-10 bg-[#3b82f6]' : 'w-2 bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {personas.map((persona, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-6"
              >
                <motion.div
                  whileHover={{ y: -12 }}
                  className="group relative h-[520px] bg-white rounded-[2.5rem] border border-slate-100 p-10 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(59,130,246,0.12)] hover:border-blue-200 overflow-hidden flex flex-col justify-between"
                >
                  {/* Premium Image Background - Full Color with Strong Overlays */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={persona.image}
                      alt={persona.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
                    />
                    {/* Multi-layer overlay for maximum legibility */}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  </div>

                  {/* Glass Top Layer */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white mb-8 shadow-inner group-hover:bg-[#3b82f6] group-hover:border-[#3b82f6] transition-all duration-500">
                      {persona.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform">
                      {persona.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed font-light">
                      {persona.desc}
                    </p>
                  </div>

                  {/* Interactive Bottom Label */}
                  <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-2 text-white transition-all cursor-pointer">
                      <ArrowUpRight size={20} className="text-blue-400 group-hover:rotate-45 transition-transform" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  {/* Subtle Glow Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
