import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, LayoutGrid, Rocket, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import step1Img from '../../../assets/AI-Editor/AI-course7.webp';
import step2Img from '../../../assets/AI-Editor/AI-course8.webp';
import step3Img from '../../../assets/AI-Editor/AI-course9.webp';

const stages = [
    {
        id: "01",
        label: "Strategic Analysis",
        // title: "The Blueprint",
        icon: ClipboardCheck,
        image: step1Img,
        color: "text-blue-600",
        bg: "bg-blue-600",
        benefits: ["Behavioral Mapping", "Outcome Alignment"]
    },
    {
        id: "02",
        label: "Design Engine",
        // title: "Architecture",
        icon: LayoutGrid,
        image: step2Img,
        color: "text-slate-900",
        bg: "bg-slate-900",
        benefits: ["Interactivity Blocks", "Cognitive Flow"]
    },
    {
        id: "03",
        label: "Deployment",
        // title: "Universal Launch",
        icon: Rocket,
        image: step3Img,
        color: "text-blue-500",
        bg: "bg-blue-500",
        benefits: ["SCORM Compliant", "LMS Integration"]
    }
];

const CourseCreatorWorkflow = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 bg-[#f1f4f9] text-slate-900 overflow-hidden relative border-y border-slate-200">
            {/* Soft Ambient Background Textures */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-100/60 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-indigo-100/60 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-200 mb-6">
                        <Sparkles size={14} className="text-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">The 15-Minute Cycle</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4 text-slate-900">
                        Blueprint to <span className="text-blue-600 italic">Delivery.</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Instructional engineering streamlined into three tactical stages. Click to explore.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
                    {/* Navigation Sidebar (Left) */}
                    <div className="lg:col-span-4 space-y-4">
                        {stages.map((stage, idx) => (
                            <div key={stage.id} className="relative">
                                <button
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-full text-left p-6 rounded-3xl transition-all duration-500 flex items-center gap-6 relative border-2 ${activeIndex === idx
                                        ? 'bg-white shadow-xl shadow-blue-500/10 border-blue-600 scale-[1.02] z-20'
                                        : 'border-transparent bg-transparent opacity-60 hover:opacity-100 hover:bg-white/40'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${activeIndex === idx ? `${stage.bg} text-white` : 'bg-slate-200 text-slate-500'
                                        }`}>
                                        <stage.icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] block mb-1 ${activeIndex === idx ? 'text-blue-600' : 'text-slate-400'
                                            }`}>
                                            Step {stage.id}
                                        </span>
                                        <h3 className={`text-xl font-black tracking-tight ${activeIndex === idx ? 'text-slate-900' : 'text-slate-600'
                                            }`}>
                                            {stage.label}
                                        </h3>
                                    </div>
                                    <ArrowRight className={`w-5 h-5 transition-all duration-500 ${activeIndex === idx ? 'translate-x-0 opacity-100 text-blue-600' : '-translate-x-4 opacity-0'
                                        }`} />
                                </button>

                                {/* Vertical Connector Line */}
                                {idx !== stages.length - 1 && (
                                    <div className="absolute left-12 top-full h-4 w-0.5 bg-slate-200 z-0" />
                                )}
                            </div>
                        ))}

                        {/* Summary Card below navigation */}
                        <motion.div
                            animate={{ opacity: activeIndex !== null ? 1 : 0 }}
                            className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white"
                        >
                            <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4">Phase Benefits</h4>
                            <div className="space-y-3">
                                {stages[activeIndex].benefits.map((benefit, bIdx) => (
                                    <div key={bIdx} className="flex items-center gap-3 text-sm font-bold">
                                        <CheckCircle2 size={16} className="text-emerald-400" />
                                        {benefit}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Interactive Showcase Canvas (Right) */}
                    <div className="lg:col-span-8 relative">
                        <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border-8 border-white bg-white shadow-2xl shadow-blue-900/10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={stages[activeIndex].image}
                                        alt={stages[activeIndex].title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        <h4 className="text-2xl font-black tracking-tighter">{stages[activeIndex].title}</h4>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Stylized HUD Corner Accents */}
                            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-lg pointer-events-none opacity-50" />
                            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br-lg pointer-events-none opacity-50" />
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseCreatorWorkflow;