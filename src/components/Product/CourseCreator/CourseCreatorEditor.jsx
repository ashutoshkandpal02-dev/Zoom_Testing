import React, { useRef } from 'react';
import { Code, Files, Layout, Settings, Smartphone, Zap, CheckCircle2 } from 'lucide-react';
import img1 from '../../../assets/AI-Editor/AI-course.webp';
import img2 from '../../../assets/AI-Editor/AI-course2.webp';
import img3 from '../../../assets/AI-Editor/AI-course3.webp';

const CourseCreatorEditor = () => {
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} className="py-32 bg-slate-900 text-white overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
                    <div className="flex-1 space-y-8">
                        <div>
                            <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.4em] mb-6 block underline underline-offset-8 decoration-blue-500/20">The Powerhouse</span>
                            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1]">
                                Advanced Block-Based <br />
                                <span className="italic text-slate-500">Lesson Editor.</span>
                            </h2>
                        </div>

                        <p className="text-xl text-slate-400 font-light leading-relaxed max-w-xl">
                            Refine AI-generated courses using a powerful modular system. Everything is structured instructional architecture—optimized for high-speed design.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            {[
                                "Interactive Tabs", "Knowledge Checks",
                                "Video & Multimedia", "Branching Scenarios",
                                "SCORM Export", "Multi-LMS Support"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 size={18} className="text-blue-500" />
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative group">
                        {/* Stacked Images for visual depth */}
                        <div className="relative z-10 rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                            <img
                                src={img1}
                                alt="AI Course Editor Interface"
                                className="w-full h-auto object-cover opacity-90 transition-opacity group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                        </div>

                        {/* Secondary Overlapping Image */}
                        <div className="absolute -bottom-10 -right-10 w-2/3 rounded-xl overflow-hidden border border-white/10 shadow-2xl z-20 hidden md:block transition-all duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4">
                            <img
                                src={img2}
                                alt="Block Configuration"
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Decoration Bubble */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group p-10 rounded-[3rem] bg-indigo-950/30 border border-indigo-500/10 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-indigo-600/20">
                            <Code size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Fully SCORM-Compliant</h3>
                        <p className="text-slate-400 font-light leading-relaxed mb-8">
                            Export LMS-agnostic packages compatible with SCORM 1.2, 2004, and xAPI. Multi-LMS distribution without technical issues.
                        </p>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-indigo-400 uppercase border border-indigo-500/20">SCORM 1.2</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-indigo-400 uppercase border border-indigo-500/20">2004 v4</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group p-10 rounded-[3rem] bg-blue-950/30 border border-blue-500/10 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                            <Zap size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">True AI Engine</h3>
                        <p className="text-slate-400 font-light leading-relaxed mb-8">
                            Not just content prompting. It thinks like an ID, optimizing learning pathways and automated objective alignment.
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Enterprise Ready</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-white/30 hover:bg-slate-900 transition-all duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 text-blue-400 flex items-center justify-center mb-8">
                            <Smartphone size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Enterprise Architecture</h3>
                        <p className="text-slate-400 font-light leading-relaxed mb-8">
                            Supporting up to 50+ organizations and 100+ users per org. Role-based access and high-speed rendering for teams.
                        </p>
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">
                                    A{i}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CourseCreatorEditor;
