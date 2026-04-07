import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Building2, GraduationCap, Briefcase, Users } from 'lucide-react';

const targetAudiences = [
    {
        icon: Building2,
        title: "Academic Institutions",
        desc: "Transform traditional curriculum into AI-driven, high-performance digital programs."
    },
    {
        icon: GraduationCap,
        title: "Certification Bodies",
        desc: "Design rigorous certification pathways with systematic assessment mapping."
    },
    {
        icon: Briefcase,
        title: "Corporate L&D Teams",
        desc: "Scaling training divisions with role-based access and high-speed design rendering."
    },
    {
        icon: Users,
        title: "Skill-Based Academies",
        desc: "Rapidly pivot and update large catalogs with professional instructional integrity."
    }
];

const CourseCreatorAudience = () => {
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                <div className="max-w-4xl mx-auto text-center mb-24">
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.4em] mb-4 block underline underline-offset-8 decoration-blue-200">Who is it for?</span>
                    <h2 className="text-4xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tighter">
                        Built Specifically for <br />
                        <span className="italic text-slate-400">Instructional Designers.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                        This is professional infrastructure—not a generic AI writer.
                        Understand how Instructional Designers think, sequence, and scale.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {targetAudiences.map((aud, idx) => (
                        <div
                            key={idx}
                            className="p-10 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:bg-slate-900 hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <aud.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-950 mb-4 group-hover:text-white transition-colors">{aud.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                                {aud.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Call to Action Bar */}
                <div className="mt-24 p-12 rounded-3xl bg-blue-600 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 text-center lg:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to build your first blueprint?</h3>
                        <p className="text-blue-100 text-lg opacity-80 font-light">Join the future of instructional architecture today.</p>
                    </div>

                    <Link
                        to="/contact"
                        className="relative z-10 px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3"
                    >
                        Get Started Now
                        <Briefcase size={18} />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default CourseCreatorAudience;
