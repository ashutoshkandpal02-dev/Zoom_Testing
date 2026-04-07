import React from 'react';
import { motion } from 'framer-motion';
import {
    GraduationCap, Briefcase, Search, Lightbulb,
    Smartphone, Headphones, Zap, ArrowRight,
    CheckCircle2
} from 'lucide-react';

const EbookAudience = () => {
    const audiences = [
        { title: "Students", icon: <GraduationCap className="w-5 h-5" /> },
        { title: "Professionals", icon: <Briefcase className="w-5 h-5" /> },
        { title: "Researchers", icon: <Search className="w-5 h-5" /> },
        { title: "Self-Learners", icon: <Lightbulb className="w-5 h-5" /> },
        { title: "Digital Readers", icon: <Smartphone className="w-5 h-5" /> },
        { title: "Audio Learners", icon: <Headphones className="w-5 h-5" /> },
        { title: "Speed Learners", icon: <Zap className="w-5 h-5" /> }
    ];

    return (
        <section className="py-20 bg-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <div className="container mx-auto px-6">

                {/* Clean Header */}
                <div className="max-w-2xl mb-16 px-2">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary-text mb-4">
                        Who is it <span className="italic text-blue-600">Built For?</span>
                    </h2>
                    <p className="text-lg text-secondary-text font-light">
                        Tailored for everyone who values intelligence and efficiency.
                    </p>
                </div>

                {/* Compact Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
                    {audiences.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100/80 hover:bg-blue-50 hover:border-blue-100 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:scale-110 transition-all">
                                {item.icon}
                            </div>
                            <span className="text-primary-text font-bold text-sm tracking-tight">{item.title}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Minimalist Action Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-10 lg:p-14 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden"
                >
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-blue-600/10 blur-[100px]" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-medium mb-4 leading-relaxed">
                                If you want to learn efficiently, <br />
                                <span className="italic text-blue-400 font-normal underline decoration-blue-500/20 underline-offset-8">Ebook Athena is built for you.</span>
                            </h3>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                                Join Now
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default EbookAudience;
