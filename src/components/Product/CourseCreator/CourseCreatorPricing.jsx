import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Crown, Zap } from 'lucide-react';

const plans = [
    {
        name: "Basic Plan",
        price: "$99",
        duration: "/month",
        tagline: "Perfect for individuals and small teams.",
        features: [
            "2 Users + 1 Admin",
            "3 GB Cloud Storage",
            "1 Million AI Tokens",
            "Standard AI Tools",
            "Essential LMS Features",
            "Standard Support"
        ],
        extra: "Extra Users: $14/user/month",
        icon: Zap,
        btnClass: "bg-slate-900 hover:bg-slate-800",
        cardClass: "bg-white border-slate-100"
    },
    {
        name: "Advanced Plan",
        price: "$1,999",
        duration: "/year",
        tagline: "For organizations that need power and scale.",
        features: [
            "10 Users + 1 Admin",
            "10 GB Cloud Storage",
            "5 Million AI Tokens",
            "Premium AI Features",
            "Free Landing Website Page",
            "Priority Support",
            "Technical Consultation"
        ],
        extra: "Extra Users: $14/user/month",
        icon: Crown,
        btnClass: "bg-blue-600 hover:bg-blue-700",
        cardClass: "bg-white border-blue-200 shadow-2xl shadow-blue-500/10",
        popular: true
    }
];

const CourseCreatorPricing = () => {
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} className="py-32 bg-[#fafafa] relative overflow-hidden">
            <div className="container mx-auto px-6">

                <div className="max-w-4xl mx-auto text-center mb-24">
                    <h2 className="text-4xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tighter">
                        Serious Tools. <span className="italic text-slate-400">Simple Pricing.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto italic">
                        "Athena AI ID™ is not an LMS feature. It is a category-defining AI Instructional Design Engine."
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, idx) => (
                        <div key={idx} className={`relative p-12 rounded-[4rem] border ${plan.cardClass} flex flex-col items-center text-center transition-all hover:scale-[1.01]`}>
                            {plan.popular && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-8 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                                    Recommended for Teams
                                </div>
                            )}

                            <div className={`w-20 h-20 rounded-3xl ${plan.popular ? 'bg-blue-600' : 'bg-slate-900'} text-white flex items-center justify-center mb-8 shadow-2xl`}>
                                <plan.icon size={36} />
                            </div>

                            <h3 className="text-4xl font-bold text-slate-950 mb-2 tracking-tight">{plan.name}</h3>
                            <div className="flex items-end gap-1 mb-4">
                                <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                                <span className="text-lg text-slate-400 font-light mb-1">{plan.duration}</span>
                            </div>
                            <p className="text-slate-500 mb-10 text-sm font-medium">{plan.tagline}</p>

                            <div className="w-full space-y-4 mb-12 text-left">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-4 text-slate-800 text-sm border-b border-slate-50 pb-4">
                                        <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0" />
                                        <span className="font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto w-full space-y-6">
                                <p className="text-xs text-slate-400 italic">
                                    {plan.extra}
                                </p>
                                <Link
                                    to="/contact"
                                    className={`inline-flex w-full py-6 ${plan.btnClass} text-white rounded-[2rem] font-bold text-xl transition-all shadow-xl active:scale-95 items-center justify-center gap-4`}
                                >
                                    Select Plan
                                    <ArrowRight size={22} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 text-center">
                    <div className="p-12 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden group max-w-4xl mx-auto">
                        <div className="absolute inset-0 bg-blue-600/10 transition-all duration-700 pointer-events-none" />
                        <h3 className="text-2xl md:text-3xl font-light italic leading-relaxed text-slate-300">
                            "Athena integrates <span className="text-blue-400 font-black not-italic underline decoration-blue-500/30 underline-offset-8">Theory + AI + Architecture</span> in one unified platform. This is the future of design."
                        </h3>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CourseCreatorPricing;
