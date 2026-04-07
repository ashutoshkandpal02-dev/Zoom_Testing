"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Layout,
  Video,
  BookOpen,
  MessageSquare,
  Globe,
  Settings,
  ArrowRight,
  Volume2,
  VolumeX,
  Zap,
  ShieldCheck,
  Play,
  Pause,
  Wallet
} from "lucide-react";
import { useRef, useEffect } from "react";

/* =========================
    PRODUCT DATA (Mapped to Icons)
========================= */
const products = [
  {
    id: 1,
    title: "Learning Management System",
    category: "LMS Suite",
    slug: "athena-lms",
    icon: <Globe size={18} />,
    badge: "Core Platform",
    badgeColor: "from-violet-600 to-purple-400",
    tagline: "Manage learner journeys",
    video: "https://websiteathena.s3.eu-north-1.amazonaws.com/LMSathena.mp4",
    description: "AI-powered LMS for automated course creation, certifications, and advanced analytics.",
    whoCanUse: "Corporations, universities, training companies, NGOs.",
    aptFor: "Managing full learner journeys at scale.",
    keyFeatures: [
      "User Management – Scalable Administration",
      "AI Learning Paths – Personalized Journeys",
      "AI Course Creation – Effortless Content Development",
      "Predictive Analytics – Proactive Success Tracking",
      "SCORM Compliance – Universal Content Support",
      "Advanced Reporting – Actionable Insights"
    ],
    costSavings: "Everything you need to run your organization's learning, simplified into one powerful system.",
  },
  {
    id: 2,
    title: "AI Powered Course Creation",
    category: "Course Creation",
    slug: "course-creator",
    icon: <Layers size={18} />,
    badge: "Best Seller",
    badgeColor: "from-blue-500 to-cyan-400",
    tagline: "Build SCORM courses 80% faster",
    video: "https://websiteathena.s3.eu-north-1.amazonaws.com/Lessoneditor.mp4",
    description: "AI + manual lesson editor for compliance, onboarding, and academic courses.",
    whoCanUse: "Corporate L&D teams, universities, colleges, NGOs, and freelance designers.",
    aptFor: "Creating professional, interactive, SCORM-compliant e-learning courses.",
    keyFeatures: [
      "Dual-Mode Editor – Flexible Content Design",
      "AI Auto-Authoring – Instant Course Generation",
      "Interactive Quizzes – Automated Skill Checks",
      "SCORM Compliance – Universal Compatibility",
      "Multi-Language – Dynamic Global Translation",
      "Video Integration – Immersive Multimedia Lessons"
    ],
    costSavings: "Your ideas, transformed into professional courses in seconds. It's like having a master designer on call.",
  },
  {
    id: 3,
    title: "Create Your AI E-Books",
    category: "E-Books",
    slug: "audible-book",
    icon: <BookOpen size={18} />,
    badge: "New",
    badgeColor: "from-teal-500 to-emerald-400",
    tagline: "Turn PDFs into interactive books",
    video: "https://websiteathena.s3.eu-north-1.amazonaws.com/Ebook.mp4",
    description: "Convert manuals and textbooks into interactive digital content.",
    whoCanUse: "Publishers, authors, knowledge managers, and creators.",
    aptFor: "Transforming static PDFs into interactive digital resources.",
    keyFeatures: [
      "AI Chapter Summaries – Faster Revision",
      "Full Book Search – Instant Info Access",
      "Text-to-Speech (TTS) – Learn Anywhere",
      "AI Voice Narration – Immersive Audio",
      "Smart Highlighting – Active Learning",
      "Chapter Analytics – Progress Tracking"
    ],
    costSavings: "Bring your content to life. Transform your static PDFs into interactive, talking digital books.",
  },
  {
    id: 4,
    title: "Designova AI",
    category: "AI Studio",
    slug: "designova",
    icon: <Layout size={18} />,
    badge: "Popular",
    badgeColor: "from-indigo-500 to-purple-400",
    tagline: "Design learning visuals instantly",
    video: "https://websiteathena.s3.eu-north-1.amazonaws.com/Athena+LMS++website+video+2nd.mp4",
    description: "Create powerpoint slides, infographics, PDFs, and posters without designers.",
    whoCanUse: "Teachers, students, creators, marketers, and L&D professionals.",
    aptFor: "Designing slides, infographics, and interactive training materials.",
    keyFeatures: [
      "Social Media & Posts – Rapid Viral Content",
      "Presentations & PPTs – Professional Slide Decks",
      "Posters & Flyers – High-Impact Print Media",
      "Marketing & Ad Banners – High-Conversion Visuals",
      "Brand Kits & Identities – Total Business Presence",
      "Infographics & E-Books – Smart Knowledge Media"
    ],
    costSavings: "Stunning visuals for your lessons at the click of a button. Look like a pro, even if you aren't a designer.",
  },
  {
    id: 5,
    title: "Custom Website Builder",
    category: "Website Builder",
    slug: "buildora",
    icon: <Settings size={18} />,
    badge: "Fast Launch",
    badgeColor: "from-cyan-500 to-blue-400",
    tagline: "Launch branded academies fast",
    video: "https://websiteathena.s3.eu-north-1.amazonaws.com/Athena+LMS++website+video+2nd.mp4",
    description: "Build Stunning Websites for Your Brand Instantly Without Code",
    whoCanUse: "Small businesses, coaches, universities, startups.",
    aptFor: "Launching branded training portals/academies.",
    keyFeatures: [
      "No-Code Builder – Drag-and-Drop Ease",
      "AI Context Engine – Automated SEO Copy",
      "Webinar Registration – Live Event Management",
      "Chatbot Integration – Automated Engagement",
      "Payment Gateways – Global Checkout Support",
      "Smart Analytics – Comprehensive Traffic Insights"
    ],
    costSavings: "Stop building and start growing. Your stunning branded website is just a few clicks away.",
  },
  {
    id: 6,
    title: "Avatar Virtual Instructor/Athenora AI",
    category: "AI Avatar",
    slug: "athenora-live",
    icon: <Video size={18} />,
    badge: "Enterprise",
    badgeColor: "from-purple-500 to-pink-400",
    tagline: "Live training at global scale",
    video: "https://websiteathena.s3.eu-north-1.amazonaws.com/Athena+LMS++website+video+2nd.mp4",
    description: "Launch photorealistic AI-powered virtual instructors for interactive, high-impact training.",
    whoCanUse: "Corporations, universities/colleges, and training providers.",
    aptFor: "Delivering live virtual instructor-led training (VILT) at scale.",
    keyFeatures: [
      "Virtual Instructor – Photorealistic AI Persona",
      "Lip-Sync Engine – Real-Time Human Speech",
      "Avatar Live Chat – 24/7 Interactive Support",
      "Instructional Engine – High-Impact Pedagogies",
      "Live Question and Answer – Real-Time Student Interaction",
      "Engagement Tracking – Precision Learner Insights"
    ],
    costSavings: "Your best teacher, available everywhere at once. Personalized learning that feels human, but scales infinitely.",
  },
  {
    id: 7,
    title: "AI Agents",
    category: "AI Chatbots",
    slug: "operon",
    icon: <MessageSquare size={18} />,
    badge: "AI Powered",
    badgeColor: "from-blue-600 to-indigo-400",
    tagline: "24/7 lifelike learner support",
    video: "https://websiteathena.s3.eu-north-1.amazonaws.com/Athena+LMS++website+video+2nd.mp4",
    description: "Human-like AI agents for learner & customer support.",
    whoCanUse: "Customer service, helpdesks, and learner support teams.",
    aptFor: "24/7 human-like support and query handling.",
    keyFeatures: [
      "Custom Personas – Brand-Tailored Avatars",
      "Multilingual Support – Global Context Memory",
      "Smart Escalation – Human-in-the-Loop Handoff",
      "CRM Integration – Unified Customer Data",
      "Custom Training – Proprietary Knowledge Scale",
      "Impact Dashboard – Real-Time Support Analytics"
    ],
    costSavings: "The support team that never sleeps. Engaging, intelligent support that knows your business inside and out.",
  },
  {
    id: 8,
    title: "Athena Payment Gateway",
    category: "Payment Gateway",
    slug: "athena-payment",
    icon: <Wallet size={18} />,
    badge: "Private Domain",
    badgeColor: "from-orange-500 to-amber-400",
    tagline: "Smart & Seamless LMS Payments",
    video: "https://websiteathena.s3.eu-north-1.amazonaws.com/Athena+LMS++website+video+2nd.mp4",
    description: "Unlock integrated, fast, and flexible transactions directly within your platform, optimized with AI-powered insights.",
    whoCanUse: "Private operators, entrepreneurs, global businesses, and innovators.",
    aptFor: "Accepting payments privately and staying in full control of your mission.",
    keyFeatures: [
      "Fast Merchant Onboarding",
      "Seamless Platform Integration",
      "Secure & Reliable Infrastructure",
      "Flexible Payment Support",
      "AI-Powered Analytics",
      "Real-time Fraud Protection"
    ],
    costSavings: "Stay in control. We provide the elite-level processing required for private businesses to thrive globally.",
  },
];

export default function FeaturesSmooth() {
  const navigate = useNavigate();
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(true);
  }, [activeProduct]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
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
    <section className="min-h-screen bg-[#F6F9FF] text-slate-900 relative overflow-hidden flex flex-col items-center">

      {/* Background Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-200/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl w-full px-6 py-20 relative z-10">

        {/* ================= HEADER ================= */}
        <header className="text-center mb-16">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 
            rounded-full bg-blue-50 border border-blue-100
            text-blue-700 text-sm font-semibold tracking-wide mb-8 shadow-sm"
          >
            <Zap size={16} className="fill-blue-600" />
            Athena Enterprise
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.2] text-gray-900"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            AI Based Platforms
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Built From The Ground Up
            </span>
          </motion.h1>

        </header>

        {/* Floating Navigation Dock */}
        <nav className="mb-16">

          {/* ================= DESKTOP DOCK ================= */}
          <div className="hidden sm:flex justify-center max-w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center gap-0.5 p-1.5 bg-white/40 backdrop-blur-3xl rounded-[2rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-max mx-auto">
              {products.map((p) => (
                <button
                  key={p.id}
                  onMouseEnter={() => setActiveProduct(p)}
                  onClick={() => setActiveProduct(p)}
                  className={`relative flex items-center gap-2 px-3.5 py-3 rounded-full transition-all duration-500 ${activeProduct.id === p.id
                    ? "text-white"
                    : "text-slate-500 hover:text-blue-600"
                    }`}
                >
                  {activeProduct.id === p.id && (
                    <motion.div
                      layoutId="activeDock"
                      className="absolute inset-0 bg-blue-700 shadow-lg"
                      style={{ borderRadius: 999 }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{p.icon}</span>
                  <span className="relative z-10 text-[10px] sm:text-xs font-bold tracking-wide whitespace-nowrap">
                    {p.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ================= MOBILE LIST ================= */}
          <div className="flex sm:hidden flex-col gap-3 px-4">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProduct(p)}
                className={`flex items-center gap-3 px-4 py-4 rounded-2xl border transition-all duration-300 ${activeProduct.id === p.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-slate-700 border-slate-200"
                  }`}
              >
                <div className="text-base">{p.icon}</div>
                <span className="text-sm font-semibold">{p.category}</span>
              </button>
            ))}
          </div>

        </nav>


        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT - VIDEO CARD */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100"
              >
                <div className="relative aspect-video bg-slate-100 group">
                  <video
                    ref={videoRef}
                    key={activeProduct.video}
                    src={activeProduct.video}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full object-cover"
                  />

                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10">
                      <button
                        onClick={togglePlay}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                      </button>

                      {/* Progress Line */}
                      <div
                        className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/progress"
                        onClick={handleSeek}
                      >
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-blue-500 pointer-events-none"
                          animate={{ width: `${progress}%` }}
                          transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                        />
                      </div>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <span
                    className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white rounded bg-gradient-to-r ${activeProduct.badgeColor}`}
                  >
                    {activeProduct.badge}
                  </span>

                  <h2 className="text-2xl font-bold mt-4">
                    {activeProduct.title}
                  </h2>

                  <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                    {activeProduct.description}
                  </p>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => navigate('/contact')}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
                    >
                      Get Started Now <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/product/${activeProduct.slug}`)}
                      className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT - FEATURES */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            <div className="bg-white rounded-3xl p-6 lg:h-[450px]  shadow-md border border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
                Capabilities
              </h4>

              <div className="space-y-3">
                {activeProduct.keyFeatures.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                  >
                    <ShieldCheck size={14} className="text-blue-600" />
                    <span className="text-sm text-slate-700 font-medium">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              key={activeProduct.costSavings}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-600 text-white rounded-3xl p-6 shadow-lg"
            >
              <h4 className="text-xs uppercase font-bold tracking-widest opacity-80 mb-2">
                The Athena Advantage
              </h4>
              <p className="text-sm font-medium leading-relaxed">
                {activeProduct.costSavings}
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}