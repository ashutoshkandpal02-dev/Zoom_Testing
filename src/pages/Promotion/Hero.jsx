import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  PlayCircle,
  X
} from "lucide-react";

import img from "../../assets/promotion/paul.png";
//hello

const TRAILER_VIDEO_URL = "https://athena-user-assets.s3.eu-north-1.amazonaws.com/promotional/lesson_editor.mp4";

const avatarUrls = [
  'https://ui-avatars.com/api/?name=Sarah&background=3b82f6&color=fff&size=64',
  'https://ui-avatars.com/api/?name=Alex&background=8b5cf6&color=fff&size=64',
  'https://ui-avatars.com/api/?name=Jordan&background=ec4899&color=fff&size=64',
];

// Pre-compute star positions once to avoid re-renders and hydration issues
const starStyles = Array.from({ length: 30 }, () => ({
  width: `${Math.random() * 3 + 1}px`,
  height: `${Math.random() * 3 + 1}px`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  opacity: Math.random() * 0.5 + 0.3,
  animationDelay: `${Math.random() * 2}s`,
  animationDuration: `${Math.random() * 2 + 1}s`,
}));

const Hero = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    if (isTrailerOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => e.key === 'Escape' && setIsTrailerOpen(false);
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isTrailerOpen]);

  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden pt-12"
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)'
      }}
    >
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Cosmic Stars */}
        <div className="absolute inset-0">
          {starStyles.map((style, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={style}
            />
          ))}
        </div>

        {/* Diagonal Lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT CONTENT: Narrative focus */}
        <div className="flex-1 text-center lg:text-left space-y-8">


          <div className="space-y-4">
            <h1
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-2px',
                lineHeight: '1.1',
                color: '#ffffff'
              }}
            >
              Empowering Education
            </h1>
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 600,
                lineHeight: '1.2',
                color: '#fbbf24'
              }}
            >
              Transform Your Learning Experience
            </h2>
          </div>

          {/* Info Stats: Sleek Row */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 py-4">
            <div className="flex flex-col">
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>21st March</span>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="flex flex-col">
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Time</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>7 PM PST</span>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="flex flex-col">
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Type</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>Live Workshop</span>
            </div>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
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
              className="hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Secure Your Spot
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsTrailerOpen(true)}
              style={{
                background: 'transparent',
                border: '2px solid #ffffff',
                color: '#ffffff',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              className="hover:bg-white/10"
            >
              <PlayCircle className="w-5 h-5" />
              Watch Trailer
            </button>
          </div>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            className="lg:justify-start"
          >
            <span className="flex -space-x-2">
              {avatarUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-md"
                />
              ))}
            </span>
            Join 100+ instructional designers
          </p>
        </div>

        {/* RIGHT CONTENT: The "Floating" Subject */}
        <div className="flex-1 relative w-full flex justify-center lg:justify-end">
          {/* Backdrop Shape: Gives the no-bg image a "home" */}
          <div className="relative w-[320px] md:w-[400px] aspect-square">
            <div className="absolute inset-0 bg-white/20 rounded-[4rem] opacity-10" />
            <div className="absolute inset-0 bg-white/10 rounded-[4rem] border border-white/20 shadow-xl" />

            {/* The Image */}
            <img
              src={img}
              alt="Paul Michael Rowland"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] max-w-none z-20 drop-shadow-[-20px_20px_50px_rgba(0,0,0,0.15)] rounded-[4rem]"
            />
          </div>

          {/* Large Abstract Background Text */}
          <span
            className="absolute -bottom-10 -right-10 text-[15rem] font-black pointer-events-none select-none z-0"
            style={{ color: 'rgba(255, 255, 255, 0.1)' }}
          >
            AI
          </span>
        </div>
      </div>

      {/* Video Trailer Modal */}
      {isTrailerOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsTrailerOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={TRAILER_VIDEO_URL}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Workshop Trailer"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
