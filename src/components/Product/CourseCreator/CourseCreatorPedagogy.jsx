import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Zap, ArrowRight, MousePointer2 } from 'lucide-react';
import toolsImg from '../../../assets/AI-Editor/AI-course6.webp';

const DifferencePillars = [
    {
        icon: ShieldCheck,
        title: "Pedagogically Sound",
        desc: "Athena follows scientific learning theories to sequence and scaffold content effectively."
    },
    {
        icon: Target,
        title: "Performance Focused",
        desc: "Interactions are engineered to drive measurable behavioral outcomes and mastery."
    },
    {
        icon: Zap,
        title: "Result Engineered",
        desc: "Designed for instructional architecture that ensures real-world learning impact."
    }
];

const CourseCreatorPedagogy = () => {
    return (
        <section className="py-24 bg-blue-50 text-slate-900 overflow-hidden relative">
            {/* Background Sophistication - Adjusted for Light Theme */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/10 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">

                <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
                    <div className="flex-1 text-left">
                        <span className="text-blue-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block underline underline-offset-8 decoration-blue-600/30">
                            The Athena Difference
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-8 tracking-tighter text-slate-900">
                            Most tools generate content. <br />
                            <span className="text-blue-600 italic font-semibold">Athena designs systems.</span>
                        </h2>
                        <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl italic border-l-4 border-blue-600 pl-6 mb-12">
                            "Built on proven instructional design frameworks, Athena creates structured, outcome-driven learning experiences — not just lessons."
                        </p>

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/10 group"
                        >
                            Talk to Our Team
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex-1 relative min-h-[400px] lg:min-h-[500px]">
                        <div className="absolute top-0 left-0 w-[180%] h-full overflow-hidden">
                            <div className="relative z-10 border-l-2 border-white/50 shadow-2xl transition-transform duration-1000 group-hover:translate-x-8 translate-x-16 rounded-l-[3rem] overflow-hidden">
                                <img
                                    src={toolsImg}
                                    alt="Athena AI Tools"
                                    className="w-full h-auto object-cover opacity-95"
                                />
                                {/* Floating Tool Badge - Revamped for high contrast on light bg */}
                                <div className="absolute top-1/2 right-[20%] -translate-y-1/2 p-6 bg-white/90 backdrop-blur-2xl border border-blue-100 shadow-2xl flex items-center gap-4 group-hover:translate-x-4 transition-transform duration-1000 rounded-2xl">
                                    <div className="text-right">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 block mb-1">Architecture</span>
                                        <span className="text-base font-bold text-slate-900 block">Theory-First Design</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/40">
                                        <MousePointer2 size={24} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Ambient Background Glow - Darker blue for contrast against light blue bg */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full bg-blue-400/20 rounded-full blur-[120px] -z-10" />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {DifferencePillars.map((pillar, idx) => (
                        <div key={idx} className="p-10 rounded-[3rem] bg-white border border-blue-200/50 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                <pillar.icon size={30} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                                {pillar.title}
                            </h3>
                            <p className="text-base text-slate-500 leading-relaxed font-medium">
                                {pillar.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CourseCreatorPedagogy;