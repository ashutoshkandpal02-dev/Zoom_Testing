import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { motion } from 'framer-motion';
import { MonitorPlay, UserCircle, ArrowRight, Sparkles } from 'lucide-react';

const AthenoraLiveModes = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".mode-card",
                { y: 20, opacity: 1 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 90%" } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="container mx-auto px-6">

                {/* Compact Header */}
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block underline underline-offset-8 decoration-blue-200">Execution Engines</span>
                    <h2 className="text-4xl md:text-6xl font-medium text-slate-900 tracking-tighter">
                        Two Powerful <span className="italic text-slate-400">Modes.</span>
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto space-y-6">
                    {/* MODE 1: LIVE SIMULATION - Horizontal & Compact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mode-card group relative p-8 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 cursor-default overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-10">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform flex-shrink-0">
                                <MonitorPlay size={28} />
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-none">
                                        Live <span className="italic text-slate-400 font-medium font-serif">Simulation.</span>
                                    </h3>
                                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-black text-[8px] uppercase tracking-widest">Engine Alpha</span>
                                </div>
                                <p className="text-base text-slate-500 font-light max-w-xl">
                                    Autonomous, interactive events derived from your recordings with zero manual effort.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 md:border-l border-slate-200 md:pl-10">
                                {["Slide Sync", "Q&A AI", "Infographics"].map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                                        <div className="w-1 h-1 rounded-full bg-blue-600" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* MODE 2: VIRTUAL AVATAR - Horizontal & Compact (Clean AI Dark) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mode-card group relative p-px rounded-[3rem] bg-slate-200 overflow-hidden cursor-default transition-all duration-700"
                    >
                        <div className="relative bg-[#0a0f1e] rounded-[2.95rem] p-8 h-full flex flex-col md:flex-row md:items-center gap-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(99,102,241,0.6)] group-hover:rotate-[-6deg] transition-transform flex-shrink-0">
                                <UserCircle size={28} />
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-none">
                                        Virtual <span className="italic text-indigo-300 font-medium font-serif">Avatar.</span>
                                    </h3>
                                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-100 font-black text-[8px] uppercase tracking-widest border border-indigo-400/40">Engine Beta</span>
                                </div>
                                <p className="text-base text-indigo-100 font-light max-w-xl leading-relaxed">
                                    AI-generated faculty with natural presence and global 24/7 delivery logic.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 md:border-l border-indigo-400/30 md:pl-10">
                                {["Neural Voices", "24/7 Access", "Global Sync"].map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-300 group-hover:text-white transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,1)]" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AthenoraLiveModes;
