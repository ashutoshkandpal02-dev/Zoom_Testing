import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import liveHeroImg from '../../../assets/Athenora-VI/VF-Hero.webp';
import bg2 from '../../../assets/bg2.jpg';

const AthenoraLiveHero = () => {
    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const badgeRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const ctaRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Animate with fromTo - content starts visible, subtle movement
            gsap.fromTo(".gsap-reveal",
                { y: 20, opacity: 1 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" }
            );

            gsap.fromTo(imageRef.current,
                { scale: 0.98, opacity: 1 },
                { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative pt-32 pb-8 overflow-hidden bg-gradient-to-br from-[#f8fbff] via-[#f0f7ff] to-[#e6f0ff]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={bg2}
                    alt="Background"
                    className="w-full h-full object-cover opacity-[0.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/80" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-slate-900">
                {/* Centered Content Block */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl mx-auto text-center mb-24 px-4 gsap-reveal"
                >
                    <motion.div variants={fadeUp} className="mb-8 gsap-reveal">
                        <span className="inline-block px-5 py-2 rounded-full bg-blue-600/10 text-blue-700 text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-sm border border-blue-200 shadow-sm">
                            The World’s First AI-Powered Virtual Instructor Platform
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="text-5xl md:text-7xl lg:text-9xl font-medium mb-12 leading-[0.9] text-slate-900 tracking-tighter"
                    >
                        Teach Once. <br />
                        <span className="italic text-blue-600 font-normal underline decoration-blue-100 underline-offset-8">Deliver Forever.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-xl md:text-3xl text-slate-500 leading-relaxed font-light mb-14 max-w-2xl mx-auto">
                        The world's first engine that turns recordings into <span className="text-blue-600 font-bold">fully interactive live classes.</span>
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col items-center justify-center gap-10">
                        <button
                            className="px-12 py-6 bg-slate-900 text-white rounded-3xl font-bold transition-all flex items-center gap-4 group text-xl shadow-2xl hover:bg-blue-600 active:scale-95"
                        >
                            Request Demo Access
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                            <span className="flex items-center gap-3 cursor-default transition-colors hover:text-red-400">
                                <span className="w-2 h-2 rounded-full bg-red-400" />
                                Not a webinar tool
                            </span>
                            <span className="flex items-center gap-3 cursor-default transition-colors hover:text-red-400">
                                <span className="w-2 h-2 rounded-full bg-red-400" />
                                Not an avatar generator
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* SHOWCASE SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-6xl mx-auto px-4 mb-24 relative overflow-visible"
                >
                    <div
                        className="relative group p-2 rounded-[4.2rem] bg-gradient-to-b from-white/80 to-transparent shadow-2xl"
                    >
                        <div ref={imageRef} className="relative z-10 overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] border border-white bg-white/40 backdrop-blur-3xl rounded-[4rem] aspect-video">
                            <img
                                src={liveHeroImg}
                                alt="Athenora Live Interface"
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent opacity-60 pointer-events-none" />

                            {/* Floating AI Engine Badge */}
                            <div
                                className="absolute top-10 right-10 p-6 rounded-[2.5rem] bg-white/90 backdrop-blur-2xl border border-white shadow-2xl max-w-[280px] hidden lg:block"
                            >
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-3">
                                    <Zap className="w-5 h-5 fill-blue-600" /> AI Delivery Engine
                                </p>
                                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                                    Revolutionizing live learning with intelligent automation.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AthenoraLiveHero;
