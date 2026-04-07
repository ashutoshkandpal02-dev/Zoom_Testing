import React, { useRef, useLayoutEffect } from 'react';
import { Target, Zap, ShieldCheck, Layers, FileText, Share2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lifecycleSteps = [
    {
        icon: FileText,
        title: "Blueprint & Analysis",
        desc: "AI identifies learning objectives and maps them to cognitive levels based on bloom's taxonomy."
    },
    {
        icon: Layers,
        title: "Curriculum Architecture",
        desc: "Automated generation of module sequences, lesson plans, and scaffolding strategies."
    },
    {
        icon: Zap,
        title: "Interaction Design",
        desc: "Rich, interactive components built directly into the content structure without manual coding."
    },
    {
        icon: Share2,
        title: "SCORM Packaging",
        desc: "Export to SCORM 1.2/2004 or xAPI with one click. Ready for any modern LMS."
    }
];

const CourseCreatorValue = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".value-header", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%"
                }
            });

            gsap.from(".lifecycle-card", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: ".lifecycle-grid",
                    start: "top 80%"
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-24 value-header">
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.4em] mb-4 block underline underline-offset-8 decoration-blue-200">Beyond Generation</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-8">
                        Not another <span className="italic text-slate-400">content generator.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed italic">
                        "Athena AI ID™ is the first fully AI-powered Instructional Design platform built for the masters of the craft."
                    </p>
                </div>

                {/* Lifecycle Grid */}
                <div className="lifecycle-grid grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {lifecycleSteps.map((step, idx) => (
                        <div
                            key={idx}
                            className="lifecycle-card group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm text-blue-600 flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-slate-100">
                                <step.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{step.title}</h3>
                            <p className="text-slate-500 font-light leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Central Statement */}
                <div className="mt-24 p-12 md:p-20 rounded-[4rem] bg-slate-950 text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent opacity-50 transition-transform duration-1000 group-hover:scale-110" />
                    <div className="relative z-10 text-center space-y-8">
                        <h3 className="text-3xl md:text-5xl font-bold italic leading-tight tracking-tight max-w-3xl mx-auto">
                            "From blueprint to SCORM-ready course — Athena handles the entire lifecycle."
                        </h3>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
                        <p className="text-slate-400 font-light text-lg tracking-widest uppercase">The Universal ID Engine</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CourseCreatorValue;
