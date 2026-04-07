import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, GraduationCap, Users, BookOpen, Award, Video } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ModernSchoolHero = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".hero-text",
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );
            gsap.fromTo(".image-pill",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay: 0.2
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-white overflow-hidden flex items-center">
            {/* Soft Blue Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 transform translate-x-1/4 z-0" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Content */}
                    <div className="hero-text">

                        <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                            Engineering Intelligence That <br />
                            <span className="text-blue-600">Feels Human</span>
                        </h1>

                        <p className="text-slate-600 text-xl leading-relaxed mb-10 max-w-lg">
                            At Operon AI, we craft intelligent experiences with real-time video intelligence that delivers lifelike, responsive AI interactions. Our technology is built for performance and precision, creating AI agents that speak, respond, and connect like real humans — transforming customer engagement into meaningful conversations.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-16">
                            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-1">
                                Discover More
                            </button>
                            <button className="bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all">
                                Start Building
                            </button>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">What We Offer</p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Video className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Conversational Video AI</h3>
                                        <p className="text-slate-600">Create dynamic, real-time video personas that interact naturally with users.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Intelligent Automation Agents</h3>
                                        <p className="text-slate-600">Deploy AI-driven assistants that handle support, sales, and engagement seamlessly.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Scalable Enterprise Platforms</h3>
                                        <p className="text-slate-600">Robust, secure, and customizable AI solutions designed for growing businesses.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: The Image Grid (The "Pill" UI) */}
                    <div className="relative h-[600px] grid grid-cols-3 gap-4">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4 pt-12">
                            <div className="image-pill h-2/3 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                <img src="https://i.pinimg.com/736x/5e/37/3b/5e373bf39b194bdc2c3bd2285d786655.jpg" alt="AI Technology" className="h-full w-full object-cover" />
                            </div>
                            <div className="image-pill h-1/3 bg-blue-500 rounded-full flex items-center justify-center">
                                <Zap className="text-white w-12 h-12" />
                            </div>
                        </div>

                        {/* Column 2 (Middle - Offset) */}
                        <div className="flex flex-col gap-4">
                            <div className="image-pill h-1/3 bg-slate-900 rounded-full overflow-hidden">
                                <img src="https://i.pinimg.com/736x/89/17/b7/8917b76ced041efdae7886770cc94286.jpg" alt="AI Learning" className="h-full w-full object-cover opacity-80" />
                            </div>
                            <div className="image-pill h-2/3 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                <img src="https://i.pinimg.com/1200x/07/c0/f2/07c0f23c6e0764a031180f0f2740df45.jpg" alt="AI Collaboration" className="h-full w-full object-cover" />
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col gap-4 pt-20">
                            <div className="image-pill h-1/2 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                <img src="https://i.pinimg.com/1200x/03/66/16/036616d265deef845667e23a3f6c1337.jpg" alt="AI Study" className="h-full w-full object-cover" />
                            </div>
                            <div className="image-pill h-1/2 bg-blue-100 rounded-full flex flex-col items-center justify-center p-4 text-center">
                                <Users className="text-blue-600 w-8 h-8 mb-2" />
                                <span className="text-blue-800 font-bold text-xs">AI Agents</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModernSchoolHero;