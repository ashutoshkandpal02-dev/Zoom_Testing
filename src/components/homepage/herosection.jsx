// import { ArrowUpRight } from 'lucide-react';

// export default function Hero() {
//   return (
//     <section className="hero-section">
//       {/* Internal CSS Styles */}
//       <style>
//         {`
//           .hero-section {
//             position: relative;
//             width: 100%;
//             height: 100vh;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             box-sizing: border-box;
//             overflow: hidden;
//             margin-top: 0;
//             padding-top: 0;
//             background: linear-gradient(rgba(30, 64, 175, 0.7), rgba(30, 64, 175, 0.7)), url('/6553111.jpg') no-repeat center center/cover;
//           }

//           .tree-decoration {
//             position: absolute;
//             bottom: -40px;
//             right: -10px;
//             width: 200px;
//             height: auto;
//             z-index: 3;
//             opacity: 0.9;
//           }

//           .hero-diagonal-lines {
//             position: absolute;
//             top: 0;
//             right: 0;
//             width: 100%;
//             height: 100%;
//             background:
//               linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 30.5%, rgba(255,255,255,0.1) 31%, transparent 31.5%),
//               linear-gradient(50deg, transparent 35%, rgba(255,255,255,0.08) 35.5%, rgba(255,255,255,0.08) 36%, transparent 36.5%),
//               linear-gradient(55deg, transparent 40%, rgba(255,255,255,0.06) 40.5%, rgba(255,255,255,0.06) 41%, transparent 41.5%);
//             background-size: 200px 200px, 250px 250px, 300px 300px;
//             background-position: 0 0, 50px 50px, 100px 100px;
//             z-index: 1;
//           }

//           .hero-container {
//             position: relative;
//             z-index: 2;
//             width: 100%;
//             max-width: 1400px;
//             margin: 0 auto;
//             padding: 0 3rem;
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 4rem;
//             align-items: center;
//             height: 100vh;
//             box-sizing: border-box;
//           }

//           .hero-left {
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             height: 100%;
//           }

//           .hero-heading-wrapper {
//             order: 1;
//           }

//           .hero-description-wrapper {
//             order: 3;
//           }

//           .hero-buttons-wrapper {
//             order: 4;
//           }

//           .hero-heading {
//             font-family: 'Georgia', 'Times New Roman', serif;
//             font-size: 3.5rem;
//             font-weight: 400;
//             color: #fff;
//             line-height: 1.1;
//             letter-spacing: -1px;
//             margin-bottom: 1.5rem;
//             text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
//           }

//           .hero-description {
//             font-family: 'Arial', sans-serif;
//             font-size: 1.1rem;
//             color: #fff;
//             line-height: 1.6;
//             margin-bottom: 2.5rem;
//             opacity: 0.95;
//             max-width: 500px;
//           }

//           .hero-buttons {
//             display: flex;
//             gap: 1rem;
//             align-items: center;
//           }

//           .btn-primary {
//             background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
//             color: #000;
//             padding: 12px 24px;
//             border-radius: 8px;
//             font-size: 1rem;
//             font-weight: 600;
//             font-family: 'Arial', sans-serif;
//             text-decoration: none;
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             transition: all 0.3s ease;
//             box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
//           }

//           .btn-primary:hover {
//             transform: translateY(-2px);
//             box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
//           }

//           .btn-secondary {
//             background: transparent;
//             color: #fff;
//             padding: 12px 24px;
//             border: 1px solid #fff;
//             border-radius: 8px;
//             font-size: 1rem;
//             font-weight: 600;
//             font-family: 'Arial', sans-serif;
//             text-decoration: none;
//             transition: all 0.3s ease;
//           }

//           .btn-secondary:hover {
//             background: rgba(255, 255, 255, 0.1);
//             transform: translateY(-2px);
//           }

//           .hero-right {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             height: 100%;
//             position: relative;
//             width: 100%;
//           }

//           .hero-video-container {
//             position: relative;
//             width: 100%;
//             max-width: 800px;
//             aspect-ratio: 16 / 9;
//             border-radius: 16px;
//             overflow: hidden;
//             box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//             background: rgba(0, 0, 0, 0.2);
//           }

//           .hero-video-container iframe,
//           .hero-video-container video {
//             width: 100%;
//             height: 100%;
//             border: none;
//             border-radius: 16px;
//             object-fit: cover;
//           }

//           /* Large Desktop */
//           @media (min-width: 1400px) {
//             .hero-container {
//               max-width: 1600px;
//               padding: 0 4rem;
//             }
//             .hero-heading {
//               font-size: 4rem;
//             }
//           }

//           /* Desktop */
//           @media (max-width: 1200px) {
//             .hero-container {
//               padding: 0 2.5rem;
//               gap: 3rem;
//             }
//             .hero-heading {
//               font-size: 3rem;
//             }
//           }

//           /* Tablet */
//           @media (max-width: 900px) {
//             .hero-container {
//               grid-template-columns: 1fr;
//               gap: 1rem; /* reduced spacing */
//               padding: 1.5rem;
//               text-align: center;
//             }
//             .hero-left {
//               order: 2;
//             }
//             .hero-right {
//               order: 1;
//               margin-bottom: 1rem;
//             }
//             .hero-heading {
//               font-size: 2.5rem;
//             }
//           }

//           /* Mobile */
//           @media (max-width: 768px) {
//             .hero-container {
//               display: flex;
//               flex-direction: column;
//               padding: 1rem;
//               gap: 1.5rem;
//               height: 100vh;
//               justify-content: center;
//               align-items: center;
//               text-align: center;
//             }
//             .hero-left {
//               display: contents;
//             }
//             .hero-right {
//               display: contents;
//             }
//             .hero-heading-wrapper {
//               order: 1;
//               margin-bottom: 1.5rem;
//               width: 100%;
//             }
//             .hero-video-container {
//               order: 2;
//               margin-bottom: 1.5rem;
//               width: 100%;
//               max-width: 100%;
//             }
//             .hero-description-wrapper {
//               order: 3;
//               margin-bottom: 1.5rem;
//               width: 100%;
//               display: flex;
//               justify-content: center;
//             }
//             .hero-buttons-wrapper {
//               order: 4;
//               width: 100%;
//             }
//             .hero-heading {
//               font-size: 2.1rem;
//             }
//             .hero-description {
//               font-size: 1rem;
//               margin-left: auto;
//               margin-right: auto;
//             }
//             .hero-buttons {
//               flex-direction: column;
//               align-items: center;
//               gap: 0.8rem;
//             }
//             .btn-primary,
//             .btn-secondary {
//               width: 100%;
//               max-width: 250px;
//               justify-content: center;
//             }
//           }

//           @media (max-width: 480px) {
//             .hero-container {
//               padding: 0.8rem;
//               gap: 1rem;
//             }
//             .hero-heading-wrapper {
//               margin-bottom: 1rem;
//             }
//             .hero-video-container {
//               margin-bottom: 1rem;
//             }
//             .hero-description-wrapper {
//               margin-bottom: 1rem;
//             }
//             .hero-heading {
//               font-size: 1.8rem;
//             }
//             .hero-description {
//               font-size: 0.95rem;
//             }
//           }
//         `}
//       </style>

//       <div className="hero-diagonal-lines" />
//       {/* <img
//         src="/tree-removebg-preview.png"
//         alt="Decorative tree"
//         className="tree-decoration"
//       /> */}
//       <div className="hero-container">
//         <div className="hero-left">
//           <div className="hero-heading-wrapper">
//             <h1 className="hero-heading">
//               Reimagine Learning. Build, Design, and Deliver Courses with AI.
//             </h1>
//           </div>
//           <div className="hero-description-wrapper">
//             <p className="hero-description">
//               Athena Learning Management System is an AI-powered education ecosystem that unifies course creation, learner engagement, and actionable analytics — all in one intuitive workspace built for organizations to scale with precision.
//             </p>
//           </div>
//           <div className="hero-buttons-wrapper">
//             <div className="hero-buttons">
//               <a href="/contact" className="btn-primary">
//                 Start Creating
//                 <ArrowUpRight size={16} strokeWidth={2} />
//               </a>
//               <a href="https://scheduler.zoom.us/prerna-mishra/website-requirement-meeting" className="btn-secondary">
//                 Book a Demo
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="hero-right">
//           <div className="hero-video-container">
//             <video
//               src="https://websiteathena.s3.eu-north-1.amazonaws.com/Athena+LMS++website+video+2nd.mp4"
//               // src="/LMS.mp4"
//               controls
//               autoPlay
//               muted
//               loop
//               playsInline
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 borderRadius: '12px',
//                 objectFit: 'cover',
//                 boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
//               }}
//             >
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import heroBg from "@/assets/bg2.jpg";
import logo from "@/assets/logo.webp";

"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Bot,
  BarChart3,
  Gamepad2,
  ArrowUpRight,
  PlayCircle,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "SCORM Course Builder",
    label: "Development",
    desc: "Enterprise-ready courses with automated packaging.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Bot,
    title: "AI-Powered Instruction",
    label: "Intelligence",
    desc: "Context-aware virtual trainers available 24/7.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Gamepad2,
    title: "Gamified Ecosystem",
    label: "Engagement",
    desc: "Modern mechanics to boost completion rates.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    label: "Insights",
    desc: "Transform data into actionable ROI reporting.",
    color: "from-amber-500 to-orange-500",
  },
];

export default function RedesignedHero() {
  const [active, setActive] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current && videoRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedProgress = Math.max(0, Math.min(1, x / rect.width));
      videoRef.current.currentTime = clickedProgress * videoRef.current.duration;
      setProgress(clickedProgress * 100);
    }
  };

  return (
    <section className="relative min-h-screen lg:h-[680px] flex items-center overflow-hidden bg-cover bg-center bg-no-repeat py-20 lg:py-0"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="absolute inset-0 bg-blue-100/70 pointer-events-none" />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-100/30 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl pt-16 lg:pt-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: CONTENT HUB */}
          <div className="space-y-8 text-left pt-4 lg:pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900 max-w-2xl lg:mx-0">
                The Future of{" "}
                <span className="relative inline-block text-blue-700">
                  Learning and
                  <span className="absolute inset-0 blur-lg bg-blue-500/30 -z-10" />
                </span>{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Development
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-400/30 to-indigo-200/30 rounded-full"
                  />
                </span>{" "}
                <span className="block sm:inline text-slate-800">
                  with AI
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-800 leading-relaxed font-medium max-w-xl lg:mx-0"
            >
              Athena Learning Management System is an AI-powered education ecosystem that unifies course creation, learner engagement, and actionable analytics — all in one intuitive workspace built for organizations to scale with precision.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a href="/contact" className="group flex items-center justify-center gap-3 bg-[#0c4a6e] text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/10 w-full sm:w-auto">
                Contact Us <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="https://scheduler.zoom.us/prerna-mishra/website-requirement-meeting" target="_blank" className="flex items-center justify-center gap-3 px-8 py-4 text-slate-700 font-bold hover:bg-slate-100 rounded-2xl transition-all border border-slate-400 w-full sm:w-auto">
                <PlayCircle size={20} className="text-blue-600" /> Book Demo
              </a>
            </motion.div>

            <div className="pt-5 border-t border-slate-300 flex flex-wrap items-center gap-4 sm:gap-6 justify-start">
              <img src={logo} alt="Athena Logo" className="h-20 w-auto transition-transform hover:scale-105" />
              <div className="hidden sm:block h-10 w-[1px] bg-slate-400" />
              <p className="text-slate-700 font-bold tracking-wide text-sm sm:text-lg italic">
                Where AI Meets Instructional Design
              </p>
            </div>
          </div>

          {/* RIGHT: THE INTERACTIVE CONSOLE */}
          <div className="relative max-w-2xl mx-auto lg:mx-0 lg:max-w-none lg:translate-y-6 mt-8 lg:mt-0">
            <div className="relative z-10 bg-white rounded-3xl lg:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-slate-200 overflow-hidden">
              <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center px-6 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                {/* <div className="mx-auto bg-white border border-slate-200 px-4 py-0.5 rounded text-[10px] text-slate-400 font-mono">
                  athena-cloud-os.v2
                </div> */}
              </div>

              {/* Video Player Display */}
              <div className="aspect-video bg-slate-950 relative overflow-hidden group">
                <video
                  ref={videoRef}
                  src="https://websiteathena.s3.eu-north-1.amazonaws.com/Athena+LMS++website+video+2nd.mp4"
                  autoPlay loop muted playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover opacity-90 transition-opacity"
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
                    <button
                      onClick={togglePlay}
                      className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                    </button>

                    {/* Progress Line */}
                    <div
                      className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/progress"
                      onClick={handleSeek}
                    >
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-blue-500"
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                      />
                    </div>

                    <button
                      onClick={toggleMute}
                      className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Selection Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 p-3 gap-3 bg-slate-50">
                {features.map((f, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all ${active === i
                      ? "bg-white shadow-md border border-slate-200"
                      : "hover:bg-white/50 border border-transparent"
                      }`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${f.color} text-white shrink-0`}>
                      <f.icon size={16} />
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className={`text-[10px] font-bold uppercase tracking-tighter mb-0.5 ${active === i ? "text-blue-600" : "text-slate-400"}`}>
                        {f.label}
                      </p>
                      <p className="text-xs font-bold text-slate-800 truncate leading-none">{f.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400/20 blur-2xl rounded-full animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-400/20 blur-2xl rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}