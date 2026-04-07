import React, { useRef, useLayoutEffect } from 'react';
import { Bot, Zap, Layout, Globe, Shield, BarChart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: Bot,
        title: "AI-Driven Pedagogy",
        desc: "Not just text — Athena understands educational theory, applying Gagne's 9 Events and Merrill's Principles automatically."
    },
    {
        icon: Layout,
        title: "Adaptive Storyboarding",
        desc: "Visual storyboards generated in seconds. Drag, drop, and refine with AI as your co-designer."
    },
    {
        icon: Zap,
        title: "Interaction Auto-Build",
        desc: "Quizzes, branching scenarios, and drag-and-drop interactions are built into the SCORM package by default."
    },
    {
        icon: Globe,
        title: "Global Localization",
        desc: "Instantly translate and culturally adapt your courses for a global workforce."
    },
    {
        icon: Shield,
        title: "Enterprise Compliance",
        desc: "Built-in accessibility (WCAG 2.1) and data privacy controls for corporate L&D."
    },
    {
        icon: BarChart,
        title: "Instructional Analytics",
        desc: "Predictive reporting on learner engagement before you even launch."
    }
];

const CourseCreatorFeatures = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".feat-header", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%"
                }
            });

            gsap.from(".feat-card", {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                scrollTrigger: {
                    trigger: ".feat-grid",
                    start: "top 85%"
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white">
            <div className="container mx-auto px-6">

                <div className="max-w-4xl mx-auto text-center mb-20 feat-header">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                        Engineered for the <span className="text-blue-600">Enterprise.</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-light max-w-xl mx-auto">
                        Powerful features that transform the way instructional design teams operate at scale.
                    </p>
                </div>

                <div className="feat-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feat, idx) => (
                        <div
                            key={idx}
                            className="feat-card p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8">
                                <feat.icon size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{feat.title}</h3>
                            <p className="text-slate-500 font-normal leading-relaxed text-sm">
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CourseCreatorFeatures;
