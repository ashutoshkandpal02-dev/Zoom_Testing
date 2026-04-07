import React from 'react';
import {
  Terminal, Layers, UserPlus, MessageCircle,
  Zap, Star, ShieldCheck, ChevronRight, Activity, Cpu
} from 'lucide-react';
//import paulImg from "../../assets/promotion/paul.png";

const MeetTheHostRedesign = () => {
  const agendaItems = [
    {
      title: "AI Demonstration",
      desc: "Live Lesson Editor walkthrough.",
      icon: <Terminal className="w-5 h-5" />,
      position: "left",
      tag: "Live Demo"
    },
    {
      title: "SCORM Blueprint",
      desc: "Real-world creation examples.",
      icon: <Layers className="w-5 h-5" />,
      position: "right",
      tag: "Technical"
    },
    {
      title: "Transition Roadmap",
      desc: "Shift into Instructional Design.",
      icon: <UserPlus className="w-5 h-5" />,
      position: "left",
      tag: "Career"
    },
    {
      title: "Interactive Q&A",
      desc: "Live answers to your questions.",
      icon: <MessageCircle className="w-5 h-5" />,
      position: "right",
      tag: "Engagement"
    }
  ];

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #e0f2ff 0%, #eff6ff 40%, #ffffff 100%)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Background Graphics */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Hexagonal Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" style={{ pointerEvents: 'none' }}>
          <defs>
            <pattern id="hexagons" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
              <polygon
                points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                fill="none"
                stroke="rgba(59,130,246,0.2)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>

        {/* Wavy Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" style={{ pointerEvents: 'none' }}>
          <path d="M0,150 Q200,100 400,150 T800,150 T1200,150 T1600,150" stroke="rgba(59,130,246,0.3)" strokeWidth="2" fill="none" />
          <path d="M0,300 Q200,250 400,300 T800,300 T1200,300 T1600,300" stroke="rgba(59,130,246,0.3)" strokeWidth="2" fill="none" />
          <path d="M0,450 Q200,400 400,450 T800,450 T1200,450 T1600,450" stroke="rgba(59,130,246,0.3)" strokeWidth="2" fill="none" />
        </svg>

        {/* Background Architectural Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-60" />

        {/* Geometric Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-200/30 rotate-45 rounded" />
        <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-blue-300/20 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-blue-100/20 rotate-12 rounded" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">

        {/* HEADER: Improved Alignment & Hierarchy */}
        <div className="mb-24">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
              <Cpu className="w-3 h-3 text-white" />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em'
                }}
              >
                System Architect
              </span>
            </div>
            <div className="h-px flex-1 max-w-md" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, transparent 100%)' }} />
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-2px',
                lineHeight: '1.1',
                color: '#0f172a',
                marginBottom: '16px'
              }}
            >
              The Man Behind <br />
              <span style={{ color: '#3b82f6' }}>The Machine.</span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: 600,
                lineHeight: '1.3',
                color: '#475569',
                maxWidth: '600px'
              }}
              className="mb-4"
            >
              Meet the Expert Leading Your Journey
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '1.7',
                color: '#64748b',
                maxWidth: '700px'
              }}
            >
              PaulMichael Rowland is an experienced learning strategist and workshop
              facilitator specializing in instructional design and AI-powered learning systems.
              With years of expertise, he brings practical insights and real-world solutions
              to help you transform your learning approach.
            </p>
          </div>
        </div>

        {/* THE TRI-AXIS STAGE */}
        <div className="relative grid lg:grid-cols-3 gap-8 items-center">

          {/* LEFT: Floating Glass Cards */}
          <div className="space-y-8 z-20">
            {agendaItems.filter(i => i.position === 'left').map((item, index) => (
              <div key={index} className="group relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="p-2 rounded-xl text-white shadow-lg shadow-blue-200"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#3b82f6',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h5
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    lineHeight: '1.2',
                    color: '#0f172a'
                  }}
                >
                  {item.title}
                </h5>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '1.6',
                    color: '#475569'
                  }}
                  className="mt-2"
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CENTER: The Portrait Stage */}
          <div className="relative flex justify-center items-center py-12 lg:py-0">
            {/* Visual Halo */}
            <div className="absolute w-[120%] aspect-square border border-slate-200 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[105%] aspect-square border-2 border-dashed border-blue-200 rounded-full opacity-50" />

            <div className="relative w-full max-w-[420px] group">
              <img
                src={paulImg}
                alt="PaulMichael Rowland"
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)] translate-x-6 transition-transform duration-700"
              />
            </div>

            {/* Title Overlay for Portrait */}
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-20 w-[90%] bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-2xl text-center">
              <h4
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#0f172a'
                }}
              >
                PaulMichael Rowland
              </h4>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#3b82f6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Learning Systems Strategist
              </p>
            </div>
          </div>

          {/* RIGHT: Floating Glass Cards */}
          <div className="space-y-8 z-20 mt-12 lg:mt-0">
            {agendaItems.filter(i => i.position === 'right').map((item, index) => (
              <div key={index} className="group relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="p-2 rounded-xl text-white shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h5
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    lineHeight: '1.2',
                    color: '#0f172a'
                  }}
                >
                  {item.title}
                </h5>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '1.6',
                    color: '#475569'
                  }}
                  className="mt-2"
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* INTEGRATED CTA DOCK */}
        <div className="mt-32 max-w-5xl mx-auto">
          <div
            className="relative overflow-hidden rounded-[3rem] p-2 pr-2 md:pr-4 flex flex-col md:flex-row items-center gap-6 shadow-2xl shadow-blue-900/20"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
            }}
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-32 h-full bg-blue-600 opacity-20 skew-x-[30deg] -translate-x-10" />

            <div className="flex-1 px-8 py-4 flex items-center gap-6 relative z-10">
              <div className="hidden sm:flex w-12 h-12 bg-white/10 rounded-2xl items-center justify-center text-white">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h6
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#ffffff'
                  }}
                >
                  Strictly Implementation. No Fluff.
                </h6>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  Get the blueprint, the tools, and the strategy in one go.
                </p>
              </div>
            </div>

            <button
              onClick={() => document.getElementById('workshop-register-form')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: '#ffffff',
                padding: '14px 32px',
                borderRadius: '2.5rem',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
              className="w-full md:w-auto hover:shadow-xl active:scale-95"
            >
              Register Now
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MeetTheHostRedesign;
