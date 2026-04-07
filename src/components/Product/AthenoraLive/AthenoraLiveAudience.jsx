import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { motion } from 'framer-motion';
import {
    GraduationCap,
    Landmark,
    Briefcase,
    Stethoscope,
    Lightbulb,
    Users,
    ArrowRight,
    Laptop,
    Award,
    PlayCircle,
    Banknote,
    Building2
} from 'lucide-react';

const audiences = [
    { icon: GraduationCap, title: "Universities & Colleges" },
    { icon: Lightbulb, title: "Coaching Institutes" },
    { icon: Briefcase, title: "Corporate L&D Teams" },
    { icon: Laptop, title: "EdTech Platforms" },
    { icon: Award, title: "Professional Bodies" },
    { icon: PlayCircle, title: "Course Creators" },
    { icon: Building2, title: "Training Orgs" },
    { icon: Stethoscope, title: "Healthcare Training" },
    { icon: Banknote, title: "Finance & Compliance" }
];

const integrations = [
    "Any LMS", "Zoom", "Google Meet", "Microsoft Teams"
];

const AthenoraLiveAudience = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const integrationRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".aud-header",
                { y: 20, opacity: 1 },
                { y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: "top 90%" } }
            );

            gsap.fromTo(".aud-card",
                { opacity: 1, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 90%" } }
            );

            gsap.fromTo(integrationRef.current,
                { opacity: 1, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: integrationRef.current, start: "top 90%" } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50 relative overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-center mb-20 aud-header"
                >
                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block underline underline-offset-8 decoration-blue-200">The Universal Engine</span>
                    <h2 className="text-4xl md:text-7xl font-medium text-slate-900 mb-8 tracking-tighter">
                        Who is it <span className="italic text-slate-400">Built For?</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                        If your organization delivers structured learning — <span className="text-slate-900 font-medium">this is built for you.</span>
                    </p>
                </motion.div>

                {/* Interactive Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    ref={gridRef}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-24"
                >
                    {audiences.map((aud, idx) => (
                        <motion.div
                            variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
                            key={idx}
                            className="aud-card p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:bg-slate-900 hover:-translate-y-2 transition-all duration-300 cursor-default"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <aud.icon size={22} />
                            </div>
                            <h3 className="text-sm font-black text-slate-800 group-hover:text-white tracking-tight uppercase leading-tight">{aud.title}</h3>
                        </motion.div>
                    ))}
                    {/* The Catch-All Card */}
                    <motion.div
                        variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
                        className="aud-card p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-xl flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-all duration-500 cursor-default lg:col-span-1"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">And More</span>
                        <h3 className="text-lg font-bold italic">Unlimited Use Cases.</h3>
                    </motion.div>
                </motion.div>

                {/* Integration & CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    ref={integrationRef}
                    className="max-w-5xl mx-auto"
                >
                    <div className="p-12 md:p-20 rounded-[4rem] bg-slate-950 text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent pointer-events-none group-hover:scale-110 transition-transform duration-1000" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex-1 space-y-4">
                                <h3 className="text-3xl md:text-5xl font-medium italic leading-tight tracking-tight">Global Integration. <br /><span className="text-slate-500 not-italic">Universal Delivery.</span></h3>
                                <p className="text-slate-400 font-light text-base">
                                    Fits into your existing ecosystem: {integrations.join(", ")}.
                                </p>
                            </div>

                            <a
                                href="/contact"
                                className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-slate-950 transition-all shadow-2xl active:scale-95 flex items-center gap-4 group/btn whitespace-nowrap"
                            >
                                Join Now <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AthenoraLiveAudience;
