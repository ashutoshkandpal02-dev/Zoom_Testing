import React from "react";
import {
    Cpu, Layers, ShieldCheck, Globe, Send,
    Sparkles, MousePointer2, ArrowRight
} from "lucide-react";

const AboutWorkshop = () => {
    const cardColors = [
        { bg: 'rgba(255, 255, 255, 0.35)', border: 'rgba(255, 255, 255, 0.6)', tint: 'rgba(147, 197, 253, 0.15)' },
        { bg: 'rgba(255, 255, 255, 0.35)', border: 'rgba(255, 255, 255, 0.6)', tint: 'rgba(196, 181, 253, 0.15)' },
        { bg: 'rgba(255, 255, 255, 0.35)', border: 'rgba(255, 255, 255, 0.6)', tint: 'rgba(251, 191, 36, 0.15)' },
        { bg: 'rgba(255, 255, 255, 0.35)', border: 'rgba(255, 255, 255, 0.6)', tint: 'rgba(134, 239, 172, 0.15)' },
        { bg: 'rgba(255, 255, 255, 0.35)', border: 'rgba(255, 255, 255, 0.6)', tint: 'rgba(252, 165, 165, 0.15)' }
    ];

    const workshopSteps = [
        {
            icon: <Cpu size={24} />,
            title: "AI Generation",
            description: "Auto-generate lesson outlines and structured content instantly.",
            skill: "Advanced AI",
            color: "blue"
        },
        {
            icon: <Layers size={24} />,
            title: "Interactive Elements",
            description: "Add quizzes, multimedia, and assessments with a few clicks.",
            skill: "Interactive Design",
            color: "indigo"
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "SCORM Compliance",
            description: "Packages compatible with Moodle, Canvas, and TalentLMS.",
            skill: "Technical",
            color: "slate"
        },
        {
            icon: <Globe size={24} />,
            title: "Global Reach",
            description: "Translate courses and optimize for WCAG accessibility.",
            skill: "Linguistics",
            color: "blue"
        },
        {
            icon: <Send size={24} />,
            title: "Seamless Publishing",
            description: "Directly integrate your content with your existing ecosystem.",
            skill: "Deployment",
            color: "indigo"
        }
    ];

    return (
        <section 
            className="w-full py-24 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #e0f2ff 0%, #eff6ff 40%, #ffffff 100%)',
                fontFamily: 'Inter, sans-serif'
            }}
        >
            {/* Background Graphics */}
            <div className="absolute inset-0 z-0">
                {/* Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />
                
                {/* Dotted Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                />
                
                {/* Curved Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.05]" style={{ pointerEvents: 'none' }}>
                    <path d="M0,200 Q400,100 800,200 T1600,200" stroke="rgba(59,130,246,0.3)" strokeWidth="2" fill="none" />
                    <path d="M0,400 Q400,300 800,400 T1600,400" stroke="rgba(59,130,246,0.3)" strokeWidth="2" fill="none" />
                    <path d="M0,600 Q400,500 800,600 T1600,600" stroke="rgba(59,130,246,0.3)" strokeWidth="2" fill="none" />
                </svg>
                
                {/* Geometric Shapes */}
                <div className="absolute top-20 right-20 w-32 h-32 border-2 border-blue-200/30 rotate-45 rounded-lg" />
                <div className="absolute bottom-32 left-16 w-24 h-24 border-2 border-blue-300/20 rounded-full" />
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-100/20 rotate-12 rounded" />
            </div>
            
            {/* Abstract Background Track */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/50 -translate-y-1/2 hidden lg:block z-10" />

            <div className="relative z-20 max-w-7xl mx-auto px-6">

                {/* Header: Left Aligned for a Professional Look */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px w-8" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}></div>
                            <span 
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: '#3b82f6',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}
                            >
                                The Blueprint
                            </span>
                        </div>
                        <h2 
                            style={{
                                fontFamily: 'Georgia, "Times New Roman", serif',
                                fontSize: 'clamp(40px, 5vw, 64px)',
                                fontWeight: 400,
                                letterSpacing: '-2px',
                                lineHeight: '1.1',
                                color: '#0f172a'
                            }}
                        >
                            About the <br />
                            <span style={{ color: '#3b82f6' }}>
                                Workshop
                            </span>
                        </h2>
                    </div>
                    <p 
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '1.6',
                            color: '#475569',
                            borderLeft: '2px solid #e2e8f0',
                            paddingLeft: '24px'
                        }}
                    >
                        This hands-on workshop introduces you to Lesson Editor — an AI-powered
                        course creation platform designed to help you build professional, interactive,
                        SCORM-compliant e-learning courses faster than ever.
                    </p>
                </div>

                {/* HORIZONTAL STEP TRACKER */}
                <div className="relative flex flex-col lg:flex-row gap-4 lg:gap-2">
                    {workshopSteps.map((step, index) => (
                        <div key={index} className="flex-1 group relative">

                            {/* Step Number Circle (The "Track" Node) - Glassmorphism */}
                            <div className="hidden lg:flex absolute top-[-44px] left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full backdrop-blur-md bg-white/40 border-2 border-white/60 shadow-lg shadow-black/5 items-center justify-center text-xs font-bold text-slate-500 group-hover:border-blue-500 group-hover:text-blue-600 group-hover:bg-white/60 transition-all duration-500">
                                {index + 1}
                            </div>

                            {/* The Card - Glassmorphism */}
                            <div 
                                className={`
                                    relative h-full p-8 rounded-[2rem] transition-all duration-500
                                    backdrop-blur-xl overflow-hidden
                                    ${index % 2 === 0 ? 'lg:mt-10' : 'lg:mb-10'}
                                    hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] hover:scale-[1.02]
                                `}
                                style={{
                                    background: `linear-gradient(135deg, ${cardColors[index].bg} 0%, rgba(255,255,255,0.25) 100%)`,
                                    border: `1px solid ${cardColors[index].border}`,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)'
                                }}
                            >
                                {/* Subtle tint overlay */}
                                <div className="absolute inset-0 pointer-events-none rounded-[2rem]" style={{ background: cardColors[index].tint }} />
                                <div className="relative z-10 w-12 h-12 rounded-2xl backdrop-blur-sm bg-white/60 border border-white/70 shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {step.icon}
                                </div>

                                <div className="relative z-10 space-y-3">
                                    <span 
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontSize: '10px',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            color: '#3b82f6'
                                        }}
                                    >
                                        {step.skill}
                                    </span>
                                    <h3 
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontSize: '24px',
                                            fontWeight: 600,
                                            lineHeight: '1.2',
                                            color: '#0f172a'
                                        }}
                                        className="group-hover:text-blue-600 transition-colors"
                                    >
                                        {step.title}
                                    </h3>
                                    <p 
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 400,
                                            lineHeight: '1.6',
                                            color: '#475569'
                                        }}
                                    >
                                        {step.description}
                                    </p>
                                </div>

                                {/* Mobile Connector Icon */}
                                <div className="relative z-10 mt-6 lg:hidden text-slate-200">
                                    <ArrowRight className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FOOTER: The "Result" Banner */}
                <div className="mt-20 relative">
                    <div className="absolute inset-0 bg-blue-600 skew-y-1 rounded-[3rem] -z-10 shadow-2xl shadow-blue-200"></div>
                    <div 
                        className="rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 transform hover:-rotate-1 transition-transform duration-700"
                        style={{
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
                        }}
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce-slow">
                                <Sparkles size={32} />
                            </div>
                            <div>
                                <h4 
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '28px',
                                        fontWeight: 600,
                                        color: '#ffffff'
                                    }}
                                >
                                    Ready to automate?
                                </h4>
                                <p 
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    }}
                                >
                                    Join 500+ ID professionals using this exact framework.
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => document.getElementById('workshop-register-form')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{
                                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                color: '#000000',
                                padding: '14px 32px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 600,
                                fontFamily: 'Inter, sans-serif',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            className="w-full md:w-auto hover:shadow-xl active:scale-95"
                        >
                            Secure My Spot
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutWorkshop;
