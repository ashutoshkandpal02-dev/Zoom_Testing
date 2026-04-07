import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkshopPromotion = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-1/4" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

                    <div className="flex flex-col lg:flex-row items-center relative z-10">
                        {/* Text Content */}
                        <div className="lg:w-1/2 p-12 lg:p-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold tracking-widest uppercase mb-6 border border-blue-500/20">
                                    <Sparkles className="w-4 h-4" />
                                    FREE WORKSHOP
                                </span>

                                <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8">
                                    DESIGN <span className="text-blue-500">SMARTER.</span><br />
                                    BUILD <span className="text-blue-500">FASTER.</span>
                                </h2>

                                <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                                    Join our <span className="text-white font-bold underline decoration-blue-500">FREE workshop on 21st March</span> and learn how to create professional online courses using the AI-powered Athena Lesson Editor.
                                </p>

                                <div className="space-y-6 mb-12">
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
                                            <Calendar className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date</p>
                                            <p className="text-lg font-bold">21st March, 2026</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-slate-300">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
                                            <User className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Host</p>
                                            <p className="text-lg font-bold">PAUL MICHAEL ROWLAND</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-slate-300">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
                                            <GraduationCap className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Goal</p>
                                            <p className="text-lg font-bold underline decoration-blue-500">Become Instructional Designer</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        to="/workshop"
                                        className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/20 group"
                                    >
                                        REGISTER NOW!
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <button
                                        onClick={() => window.open('https://api.wonderengine.ai/widget/form/tHMfncbmbEpAOXwKxNxj', '_blank')}
                                        className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white text-lg font-bold rounded-2xl transition-all duration-300 border border-slate-700"
                                    >
                                        Join Now
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Banner Image */}
                        <div className="lg:w-1/2 w-full h-[400px] lg:h-[800px] relative">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="w-full h-full"
                            >
                                <img
                                    src="/workshop_flyer.webp"
                                    alt="Workshop Flyer"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent lg:block hidden" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden block" />

                                {/* Float Tags */}
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-20 right-20 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl hidden lg:block"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-black">AI-Powered</p>
                                            <p className="text-slate-400 text-sm">Athena Lesson Editor</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkshopPromotion;
