import React from 'react';
import {
  Calendar, Clock, Target, ArrowRight, BookOpen, Users,
  Briefcase, GraduationCap, Play, Box, TrendingUp,
  HelpCircle, Zap, CheckCircle2
} from 'lucide-react';

const IDWorkshopSection = () => {
  const features = [
    "Core Skill Requirements",
    "Starting from Scratch",
    "AI Tools & Competitive Advantage",
    "Rapid Portfolio Building",
    "Client Acquisition Strategies"
  ];

  const audiences = [
    { role: "Teachers", icon: <BookOpen className="w-5 h-5" />, desc: "Transitioning to EdTech" },
    { role: "HR & Trainers", icon: <Users className="w-5 h-5" />, desc: "Upskilling Teams" },
    { role: "Freelancers", icon: <Briefcase className="w-5 h-5" />, desc: "Digital Career Growth" },
    { role: "Students", icon: <GraduationCap className="w-5 h-5" />, desc: "Future-proofing Careers" }
  ];

  return (
    <div
      className="min-h-screen pb-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        fontFamily: 'Inter, sans-serif',
        color: '#ffffff'
      }}
    >
      {/* Background Graphics */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Cosmic Starfield */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>

        {/* Diagonal Lines */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)'
          }}
        />

        {/* Radial Gradient Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.1]" style={{ pointerEvents: 'none' }}>
          <defs>
            <radialGradient id="glow">
              <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </radialGradient>
          </defs>
          <circle cx="20%" cy="30%" r="200" fill="url(#glow)" />
          <circle cx="80%" cy="70%" r="250" fill="url(#glow)" />
        </svg>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />

        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rotate-45 rounded-lg" />
        <div className="absolute bottom-32 left-16 w-24 h-24 border border-white/10 rounded-full" />
      </div>

      {/* SECTION 1: HERO HOOK */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/75 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          Next Session: March 21st
        </div>
        <h1
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
          Want to Become an <br />
          <span style={{ color: '#fbbf24' }}>Instructional Designer?</span>
        </h1>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)'
          }}
          className="max-w-2xl mx-auto"
        >
          Join the fastest-growing remote career in education and corporate training.
          Master the craft with modern AI tools.
        </p>
      </section>

      {/* SECTION 2: DISCOVERY & AUDIENCE */}
      <section className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* What you'll discover */}
          <div className="bg-white/10 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Box className="w-24 h-24 text-white" />
            </div>
            <h3
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '28px',
                fontWeight: 600,
                lineHeight: '1.2',
                color: '#ffffff'
              }}
              className="mb-8 flex items-center gap-3"
            >
              <TrendingUp className="text-white" />
              In this workshop, you'll discover:
            </h3>
            <ul className="space-y-5">
              {features.map((item, index) => (
                <li key={index} className="flex items-start space-x-4 group">
                  <div className="bg-white/20 text-white rounded-full p-1 mt-1 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '18px',
                      fontWeight: 400,
                      color: '#ffffff'
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who it's for */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {audiences.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-[2rem] text-white hover:bg-white/20 transition-all duration-300 group border border-white/20"
              >
                <div className="mb-4 bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-colors">
                  {item.icon}
                </div>
                <h4
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#ffffff'
                  }}
                  className="mb-1"
                >
                  {item.role}
                </h4>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FINAL CTA TICKET */}
      <section className="max-w-6xl mx-auto px-6 mt-12 relative z-10">
        <div
          className="rounded-[3rem] p-8 md:p-16 text-white text-center relative overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
          }}
        >

          <div className="relative z-10 max-w-4xl mx-auto">
            <h3
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.9)'
              }}
              className="mb-4"
            >
              Final Call for Registration
            </h3>
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 600,
                lineHeight: '1.2',
                color: '#ffffff',
                fontStyle: 'italic'
              }}
              className="mb-10"
            >
              Don't Just Watch. <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255, 255, 255, 0.5)' }}>Implement.</span>
            </h2>

            {/* The Ticket Box */}
            <div className="bg-white rounded-[2rem] p-3 md:p-4 shadow-2xl flex flex-col md:flex-row items-center gap-4 border-2 border-white/20">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-2 w-full px-6 py-2">
                <div className="text-left">
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: '#475569'
                    }}
                  >
                    Event Date
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#0f172a'
                    }}
                  >
                    21st March
                  </p>
                </div>
                <div className="text-left border-l border-slate-100 pl-6">
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: '#475569'
                    }}
                  >
                    Session Type
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#0f172a'
                    }}
                  >
                    Live Interaction
                  </p>
                </div>
                <div className="text-left border-l border-slate-100 pl-6 hidden md:block">
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: '#475569'
                    }}
                  >
                    Seat Status
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#dc2626'
                    }}
                  >
                    Filling Fast
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
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                className="w-full md:w-auto hover:shadow-xl active:scale-95"
              >
                Register Now
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.9)'
              }}
              className="mt-8 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-yellow-400 text-yellow-400 border-none" />
              Unlock the "Lesson Editor" AI toolkit upon registration.
            </p>
          </div>

          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-[-10%] left-[-5%] w-64 h-64 border-[40px] border-white/20 rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 border-[60px] border-white/10 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IDWorkshopSection;
