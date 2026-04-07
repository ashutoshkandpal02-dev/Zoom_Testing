import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { gsap } from 'gsap';

const OperonAIHero = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".hero-content",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
            );
            gsap.fromTo(".hero-image",
                { x: 40, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/20 blur-3xl" />
            </div>

            {/* Diagonal Shape */}
            <div className="absolute top-0 right-0 w-1/2 h-full z-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="30,0 100,0 100,100 0,100" fill="#EBF2FF" />
                </svg>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-20 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                    {/* Left Content */}
                    <div className="hero-content">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-blue-600 text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
                        >
                            Next-Gen Customer Support
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-medium text-slate-900 leading-tight mb-8"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Meet the new face <br />
                            <span className="text-blue-600 italic font-serif">of your brand.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
                        >
                            Create a digital agent that looks and talks just like a real person. Ready to help your customers 24/7, across any language. It's like having your best employee scaled to millions.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button className="bg-blue-600 text-white px-8 py-4 font-medium flex items-center gap-2 hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25">
                                Get Started
                                <ArrowRight size={20} />
                            </button>
                            <button className="border-2 border-blue-200 text-blue-700 px-8 py-4 font-medium flex items-center gap-2 hover:bg-blue-50 transition-all">
                                <Play size={20} />
                                Watch Demo
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-12 mt-12 pt-8 border-t border-slate-200"
                        >
                            <div>
                                <p className="text-3xl font-bold text-blue-600"></p>
                                <p className="text-slate-500 text-sm mt-1">Video Agents Created</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-blue-600"></p>
                                <p className="text-slate-500 text-sm mt-1">Languages Supported</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-blue-600"></p>
                                <p className="text-slate-500 text-sm mt-1">Uptime Guaranteed</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image Grid */}
                    <div className="hero-image relative">
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-4"
                            >
                                <div className="relative overflow-hidden shadow-2xl h-64">
                                    <img
                                        src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400"
                                        alt="AI Video Agent"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-sm font-medium">Interactive Avatars</p>
                                    </div>
                                </div>
                                <div className="relative overflow-hidden shadow-xl h-48">
                                    <img
                                        src="https://i.pinimg.com/736x/99/79/7f/99797fd726320bbcabbf96625891d64e.jpg"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent" />
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-4 pt-8"
                            >
                                <div className="relative overflow-hidden shadow-xl h-48">
                                    <img
                                        src="https://i.pinimg.com/1200x/a0/5d/6b/a05d6b968e19773a2226ba5edcf260e4.jpg"
                                        alt="AI Technology"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent" />
                                </div>
                                <div className="relative overflow-hidden shadow-2xl h-64">
                                    <img
                                        src="https://i.pinimg.com/736x/fe/19/6a/fe196a3f0e0aa1a5f022f95b626c0f9d.jpg"
                                        alt="Professional AI"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-sm font-medium">Real-time Conversations</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                            className="absolute -bottom-4 -left-4 bg-white shadow-xl p-4 flex items-center gap-3"
                        >
                            <div className="w-12 h-12 bg-blue-100 flex items-center justify-center">
                                <span className="text-2xl"></span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">AI-Powered</p>
                                <p className="text-xs text-slate-500">Natural Conversations</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OperonAIHero;