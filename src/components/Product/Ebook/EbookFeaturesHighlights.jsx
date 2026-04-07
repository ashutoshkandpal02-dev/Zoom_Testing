import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, TrendingDown, Zap, ArrowRight } from 'lucide-react';

const EbookFeaturesHighlights = () => {
    return (
        <section className="relative pt-12 pb-0 bg-gradient-to-b from-[#f0f9ff]/40 via-white to-white overflow-hidden" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            {/* Background Decorative Elements to reduce whiteness */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#f0f9ff] to-transparent opacity-50 pointer-events-none" />
            <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-indigo-400/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-medium text-primary-text mb-6"
                    >
                        Why Choose <span className="italic text-blue-600">Smart Learning?</span>
                    </motion.h2>
                    <p className="text-xl text-secondary-text leading-relaxed font-light">
                        Upgrade your reading experience. Experience the shift from passive consumption to active intelligence.
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch relative">
                    {/* Left: Traditional Reading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-[2rem] bg-slate-100/50 border border-slate-200/60 backdrop-blur-sm flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-slate-600 uppercase tracking-widest mb-8">Passive Reading</h3>
                            <ul className="space-y-5">
                                {[
                                    "Slow and linear process",
                                    "Static non-interactive text",
                                    "Manual summarization",
                                    "Locked to single device"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-lg">
                                        <XCircle className="w-5 h-5 shrink-0 opacity-60 text-rose-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-10 text-xs text-slate-500 font-bold uppercase tracking-wider">The Old Way</div>
                    </motion.div>

                    {/* Right: AI Suite (Athena) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-8 text-blue-100">Athena AI Suite</h3>
                            <ul className="space-y-5">
                                {[
                                    "Intelligent comprehension",
                                    "Instant AI summaries",
                                    "Contextual learning tools",
                                    "Cross-device continuity"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-blue-50 font-semibold">
                                        <CheckCircle2 className="w-5 h-5 shrink-0 text-blue-200" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10 text-xs text-blue-200/60 font-bold uppercase relative z-10">The Future</div>

                        {/* Subtle Background Glow */}
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
                    </motion.div>
                </div>

                {/* Branded Footer Statement */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-6 py-4 px-10 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
                        <span className="text-blue-600 font-black tracking-[0.2em] uppercase text-xs">Core Value Proposition</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                        <span className="text-primary-text font-bold italic text-lg leading-none">“Read Less. Learn More.”</span>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
};

export default EbookFeaturesHighlights;
