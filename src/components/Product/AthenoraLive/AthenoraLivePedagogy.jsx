import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Target, Users, Zap, BookOpen, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pedagogyFeatures = [
    { icon: Brain, title: "Cognitive Load Management", desc: "AI-optimized content delivery based on learner attention spans." },
    { icon: Target, title: "Adaptive Learning Paths", desc: "Personalized trajectories that adjust to individual progress." },
    { icon: Users, title: "Social Learning", desc: "Built-in peer interaction and collaborative problem-solving." },
    { icon: Zap, title: "Spaced Repetition", desc: "Intelligent review scheduling for optimal retention." },
    { icon: BookOpen, title: "Multimodal Content", desc: "Text, video, audio, and interactive elements combined." },
    { icon: Lightbulb, title: "Active Recall", desc: "AI-generated quizzes that reinforce key concepts." }
];

const AthenoraLivePedagogy = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".pedagogy-content",
                { y: 20, opacity: 1 },
                { y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: "top 90%" } }
            );

            gsap.fromTo(".pedagogy-card",
                { y: 30, opacity: 1 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: ".pedagogy-grid", start: "top 90%" } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50 relative overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center pedagogy-content mb-16">
                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block underline underline-offset-8 decoration-blue-200">Learning Science</span>
                    <h2 className="text-4xl md:text-6xl font-medium text-slate-900 tracking-tighter mb-8">
                        Pedagogy <span className="italic text-slate-400">First.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                        Built on proven learning principles with AI-enhanced delivery mechanisms.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pedagogy-grid">
                    {pedagogyFeatures.map((feat, idx) => (
                        <div key={idx} className="pedagogy-card p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <feat.icon size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                            <p className="text-slate-500 font-light leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats */}
                <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                    <div className="pedagogy-card">
                        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">40%</div>
                        <p className="text-sm text-slate-400 font-black uppercase tracking-widest">Better Retention</p>
                    </div>
                    <div className="pedagogy-card">
                        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">3x</div>
                        <p className="text-sm text-slate-400 font-black uppercase tracking-widest">Faster Learning</p>
                    </div>
                    <div className="pedagogy-card">
                        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">95%</div>
                        <p className="text-sm text-slate-400 font-black uppercase tracking-widest">Completion Rate</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AthenoraLivePedagogy;