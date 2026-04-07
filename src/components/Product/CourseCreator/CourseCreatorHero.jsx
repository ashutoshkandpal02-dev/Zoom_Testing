import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import builderImg from '../../../assets/AI-Editor/AI-course.jpg';

const CourseCreatorHero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white">
            {/* Design Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
                    {/* LEFT CONTENT - Simple & Direct */}
                    <div className="flex-1 text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 mb-8"
                        >
                            <Sparkles size={14} />
                            <span className="text-[11px] font-bold uppercase tracking-wider">AI-Powered Course Creation</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-7xl lg:text-8xl font-medium text-slate-900 leading-[1.1] tracking-tight mb-8"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Build better courses, <br />
                            <span className="text-blue-600">in half the time.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-xl mb-12"
                        >
                            Stop wasting hours on page design. Let our AI handle the layout while you focus on sharing your knowledge. Professional, engaging, and ready in minutes.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center gap-8"
                        >
                            <Link
                                to="/contact"
                                className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-medium uppercase text-[13px] tracking-widest hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 group"
                            >
                                Start Building Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* <div className="flex flex-col gap-2">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="user" />
                                        </div>
                                    ))}
                                    <div className="h-9 w-9 flex items-center justify-center bg-blue-600 border-2 border-white rounded-full text-[10px] font-bold text-white shadow-sm">
                                        +5k
                                    </div>
                                </div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Trusted by 5,000+ creators</p>
                            </div> */}
                        </motion.div>
                    </div>

                    {/* RIGHT CONTENT - Elegant Canvas */}
                    <div className="flex-1 relative lg:pl-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-20"
                        >
                            <div className="relative p-2 rounded-[3rem] bg-slate-100/50 backdrop-blur-sm shadow-2xl border border-white/50">
                                <div className="rounded-[2.5rem] overflow-hidden bg-white shadow-inner aspect-[4/3] relative">
                                    <img
                                        src={builderImg}
                                        alt="Course Builder Interface"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay elements for interactivity feel */}
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-white/20 hidden md:block">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Status</p>
                                                <p className="text-xs font-bold text-slate-900 leading-none">AI Optimized</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Background Effects */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px] -z-10" />
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-100/50 rounded-full blur-[80px] -z-10" />
                    </div>
                </div>

                {/* Bottom Trust Bar - Simplified */}
                <div className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap justify-center md:justify-between items-center gap-10 opacity-60">
                    <div className="flex items-center gap-4 text-slate-400">
                        <Globe className="w-5 h-5" />
                        <p className="text-[11px] font-medium uppercase tracking-[0.3em]">Built for modern learning teams</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseCreatorHero;