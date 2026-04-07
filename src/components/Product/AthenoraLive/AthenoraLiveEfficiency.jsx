import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { motion } from 'framer-motion';
import vf1 from '../../../assets/Athenora-VI/VF-1.webp';

const AthenoraLiveEfficiency = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Image Reveal
            gsap.fromTo(imageRef.current,
                { y: 30, opacity: 1 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: imageRef.current, start: "top 90%" } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-slate-900 text-white overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-7xl font-medium mb-8 tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                        Efficiency <span className="italic text-blue-400">Redefined.</span>
                    </h2>
                    <p className="text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Scale education without increasing payroll. One faculty member, thousands of learners.
                    </p>
                </div>

                {/* VISUAL SHOWCASE - SHIFTED UP */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-6xl mx-auto mb-16"
                >
                    <div ref={imageRef} className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                        <img src={vf1} alt="Athenora Live Dashboard" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        <div className="absolute bottom-12 left-12 right-12 text-center md:text-left">
                            <h3 className="text-3xl md:text-5xl font-medium italic">"Teach Once. Deliver Infinitely."</h3>
                            <div className="flex flex-wrap items-center gap-6 mt-6">
                                <span className="px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest">80% Leverage</span>
                                <span className="px-4 py-2 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest">Infinite Scale</span>
                                <span className="px-4 py-2 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Zero Fatigue</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* JOIN NOW CTA */}
                <div className="flex justify-center">
                    <a
                        href="/contact"
                        className="px-12 py-6 bg-blue-600 text-white rounded-3xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-4 group"
                    >
                        Join Now
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                            <svg className="w-5 h-5 text-white group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AthenoraLiveEfficiency;
