import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Calendar, User, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkshopSplitSection = () => {
    return (
        <section className="bg-slate-900 border-y border-white/5 py-8 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    {/* Content Block (Left) */}
                    <div className="lg:w-[65%] w-full">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-[10px] tracking-widest mb-6">
                                <span className="text-sm">🎓</span> Interactive Workshop
                            </div>

                            <h2 className="text-4xl lg:text-7xl font-medium text-white leading-[1.1] mb-6 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                Reimagine education.<br />
                                Scale your impact.
                            </h2>

                            <div className="flex flex-col mb-8">
                                <div className="flex flex-col space-y-2 mb-6">
                                    <span className="text-cyan-400 text-2xl tracking-wider">March 21st — 7PM PST</span>
                                    <span className="text-slate-400 text-lg">Master the future of course design with AI.</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-cyan-400 text-lg drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] tracking-tight">Limited spots remaining</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                <Link
                                    to="/workshop"
                                    className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 hover:scale-105 active:scale-95 whitespace-nowrap tracking-widest"
                                >
                                    Register Now!
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Poster Block (Right - Complete Full Image) */}
                    <div className="lg:w-[45%] w-full relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative shadow-2xl border border-white/10">
                                <img
                                    src="/workshop_flyer.webp"
                                    alt="Workshop Flyer"
                                    className="w-full h-auto block"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkshopSplitSection;
