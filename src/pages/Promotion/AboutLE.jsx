import React from 'react';
import { 
  Cpu, Users, Zap, ShieldCheck, Clock, Globe2, 
  MousePointer2, CheckCircle, BarChart3, Rocket, ArrowRight, Sparkles
} from 'lucide-react';

const AboutLessonEditor = () => {
  const userGroups = ["Corporate L&D", "Universities", "NGOs", "Freelance IDs", "Trainers"];

  const features = [
    { title: "Dual Mode", desc: "AI-Assisted or Manual Drag-and-Drop Editor", icon: <MousePointer2 className="w-5 h-5" />, color: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(124, 58, 237, 0.5) 100%)' },
    { title: "Smart Content", desc: "Built-in Quizzes & Multimedia integration", icon: <Cpu className="w-5 h-5" />, color: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(20, 184, 166, 0.5) 100%)' },
    { title: "SCORM Ready", desc: "Full compliance for any LMS platform", icon: <ShieldCheck className="w-5 h-5" />, color: 'linear-gradient(135deg, rgba(56, 189, 248, 0.45) 0%, rgba(14, 165, 233, 0.55) 100%)' },
    { title: "Global Reach", desc: "Translation & Accessibility optimization", icon: <Globe2 className="w-5 h-5" />, color: 'linear-gradient(135deg, rgba(129, 140, 248, 0.45) 0%, rgba(99, 102, 241, 0.55) 100%)' }
  ];

  return (
    <section 
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Background Graphics */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Cosmic Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.2,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 1.5}s`
              }}
            />
          ))}
        </div>
        
        {/* Radial Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" style={{ pointerEvents: 'none' }}>
          <defs>
            <pattern id="radialLines" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="1" fill="rgba(255,255,255,0.3)" />
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + 80 * Math.cos((i * Math.PI) / 4)}
                  y2={100 + 80 * Math.sin((i * Math.PI) / 4)}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#radialLines)" />
        </svg>
        
        {/* Decorative background blur */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-white/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* SECTION 1: THE REVERSED HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="group p-6 backdrop-blur-sm rounded-[2rem] hover:opacity-95 transition-all duration-300 border border-white/30" style={{ background: f.color }}>
                  <div className="w-12 h-12 rounded-2xl bg-white/25 text-white flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                    {f.icon}
                  </div>
                  <h5 
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#ffffff'
                    }}
                    className="mb-1"
                  >
                    {f.title}
                  </h5>
                  <p 
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      fontWeight: 400,
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" /> The Platform
            </div>
            <h2 
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-2px',
                lineHeight: '1.1',
                color: '#ffffff'
              }}
              className="mb-6"
            >
              Build courses at <br />
              <span style={{ color: '#fbbf24' }}>warp speed.</span>
            </h2>
            <p 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '1.6',
                color: '#ffffff'
              }}
              className="mb-8"
            >
              Lesson Editor is an AI-powered course creation tool that helps you build 
              <span style={{ fontWeight: 600 }}> SCORM-compliant</span> e-learning 
              up to <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>80% faster.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {userGroups.map((group) => (
                <span 
                  key={group}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.8)',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                    paddingBottom: '4px'
                  }}
                >
                  {group}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: THE DATA STRIP (Industrial/Tech Look) */}
        <div className="relative mb-20">
          <div 
            className="absolute inset-0 rounded-[4rem] -rotate-1 scale-[1.02] shadow-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}
          />
          <div className="relative overflow-hidden rounded-[4rem] border-2 border-slate-500/30 backdrop-blur-sm">
            {/* Background Image with Dark Overlay */}
            <div 
              className="absolute inset-0 rounded-[4rem] bg-cover bg-center"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80)`,
              }}
            />
            <div 
              className="absolute inset-0 rounded-[4rem]"
              style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 41, 59, 0.85) 50%, rgba(51, 65, 85, 0.88) 100%)' }}
            />
            <div 
              className="relative p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 z-10"
            >
            <div className="lg:max-w-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-slate-200 w-6 h-6" />
                <h3 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#f8fafc',
                    textTransform: 'uppercase',
                    fontStyle: 'italic'
                  }}
                >
                  Save Time & Money
                </h3>
              </div>
              <p 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'rgba(248, 250, 252, 0.9)'
                }}
              >
                Why spend weeks on a single module when you can ship in hours?
              </p>
            </div>
            
            <div className="flex-1 grid md:grid-cols-3 gap-8">
              {[
                { label: "ROI", val: "Fastest", desc: "Weeks to hours" },
                { label: "Cost", val: "Minimal", desc: "No extra tools" },
                { label: "Scale", val: "Infinite", desc: "Easy revisions" }
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left border-l-4 border-slate-400 pl-6">
                  <span 
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(248, 250, 252, 0.7)'
                    }}
                    className="block mb-1"
                  >
                    {stat.label}
                  </span>
                  <span 
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '28px',
                      fontWeight: 600,
                      color: '#f8fafc'
                    }}
                    className="block mb-1"
                  >
                    {stat.val}
                  </span>
                  <span 
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      fontWeight: 400,
                      color: 'rgba(248, 250, 252, 0.85)'
                    }}
                  >
                    {stat.desc}
                  </span>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: OVERLAPPING PERSONAS */}
        <div className="relative flex flex-col space-y-[-4rem] lg:space-y-0 lg:flex-row lg:items-center">
          {/* L&D Card (Bottom Layer) */}
          <div 
            className="lg:w-3/5 rounded-[3.5rem] p-12 lg:p-20 text-white relative z-10 shadow-2xl overflow-hidden"
          >
            {/* Background Image - Blurred */}
            <div 
              className="absolute inset-0 bg-cover bg-center rounded-[3.5rem] scale-105"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80)`,
                filter: 'blur(2px)',
              }}
            />
            {/* Subtle dark overlay for text readability */}
            <div 
              className="absolute inset-0 rounded-[3.5rem] bg-black/25"
            />
            <div className="relative z-10 max-w-md">
              <BarChart3 className="w-12 h-12 mb-8 text-white/50" />
              <h4 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '36px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  color: '#ffffff'
                }}
                className="mb-6"
              >
                For L&D Teams scaling compliance.
              </h4>
              <ul className="space-y-4">
                {["Easy course updates", "Seamless LMS integration", "Faster rollout"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' }}>
                    <CheckCircle className="w-5 h-5" /> {li}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ID Card (Top Layer / Offset) */}
          <div 
            className="lg:w-2/5 lg:-ml-20 rounded-[3.5rem] p-12 text-white relative z-20 shadow-2xl lg:mt-24 border-4 border-white/20"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
            }}
          >
            <Rocket className="w-10 h-10 mb-6 text-white" />
            <h4 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#ffffff',
                fontStyle: 'italic'
              }}
              className="mb-6"
            >
              Instructional Designers
            </h4>
            <div className="space-y-6">
              {["Rapid prototyping", "No coding required", "Pro output"].map((li, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.8)' }}>{li}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutLessonEditor;
