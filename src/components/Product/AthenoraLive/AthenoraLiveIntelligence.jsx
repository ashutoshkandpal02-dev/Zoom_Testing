import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { motion } from 'framer-motion';
import { BrainCircuit, Activity, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import vi3 from '../../../assets/Athenora-VI/VI-3.png';

const intelFeatures = [
    { icon: BrainCircuit, title: "Contextual Intelligence", desc: "Live student querying with zero-latency AI response." },
    { icon: Target, title: "Precision Analytics", desc: "Real-time attention and sentiment tracking." },
    { icon: ShieldCheck, title: "Automated Proctoring", desc: "AI-driven exam integrity and biometric logs." },
    { icon: Activity, title: "Predictive Outcomes", desc: "Dynamic progress mapping and performance hub." }
];

const AthenoraLiveIntelligence = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".intel-header",
                { y: 20, opacity: 1 },
                { y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: "top 90%" } }
            );

            gsap.fromTo(".feature-pill",
                { opacity: 1, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, scrollTrigger: { trigger: ".features-grid", start: "top 90%" } }
            );

            gsap.fromTo(imageRef.current,
                { opacity: 1, scale: 0.98 },
                { opacity: 1, scale: 1, duration: 0.8, scrollTrigger: { trigger: imageRef.current, start: "top 90%" } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="container mx-auto px-6">

                {/* Header: Short & Punchy */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="max-w-4xl mx-auto mb-12 intel-header"
                >
                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block underline underline-offset-8 decoration-blue-200">The Intelligence Layer</span>
                    <h2 className="text-4xl md:text-6xl font-medium text-slate-900 tracking-tighter leading-none mb-6">
                        AI Control <span className="italic text-slate-400">Center.</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-light max-w-xl">
                        A centralized engine for precision measurement and automated instruction quality.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    {/* Visual Showcase */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 relative group"
                    >
                        <div ref={imageRef} className="absolute inset-0 bg-blue-600/5 rounded-[4rem] -z-10 blur-3xl group-hover:bg-blue-600/10 transition-colors duration-1000" />
                        <div className="relative rounded-[4rem] overflow-hidden border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]">
                            <img
                                src={vi3}
                                alt="AI Control Dashboard"
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Features List (Focused & High Contrast) */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-5 space-y-6 features-grid"
                    >
                        {intelFeatures.map((feat, idx) => (
                            <motion.div
                                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                                key={idx}
                                className="feature-pill p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-xl transition-all duration-300 group cursor-default"
                            >
                                <div className="flex items-start gap-8">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 flex-shrink-0 border border-blue-100">
                                        <feat.icon size={26} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-slate-950 mb-3 tracking-tight">{feat.title}</h3>
                                        <p className="text-lg text-slate-900 leading-relaxed font-normal opacity-100">
                                            {feat.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* JOIN NOW CTA: Enhanced Visibility */}
                <div className="mt-24 flex justify-center">
                    <a
                        href="/contact"
                        className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-bold text-xl hover:bg-slate-900 transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-4 group"
                    >
                        Join Now
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default AthenoraLiveIntelligence;
