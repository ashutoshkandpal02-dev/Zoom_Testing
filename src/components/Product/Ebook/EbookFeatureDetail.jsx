import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Headphones, Languages, HeadphonesIcon, Bookmark, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

// Assets
import ebookSummary from '../../../assets/Ebook/Ebook_summary.webp';
import ebookFeatures from '../../../assets/Ebook/Ebook_features.webp';
import ebookHighlight from '../../../assets/Ebook/Ebook_dictionary.png';
import ebooksImage from '../../../assets/Ebook/Ebooks.webp';

const EbookFeatureDetail = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const features = [
        {
            title: "AI Summarizer",
            subtitle: "Insights in seconds.",
            description: "Turn length chapters into concise intelligence. Perfect for researchers and professionals on the go.",
            icon: <Zap className="w-5 h-5" />,
            image: ebookSummary,
            points: ["Chapter summaries", "Text-selection summary", "Instant revision nodes"],
            color: "#3b82f6"
        },
        {
            title: "Audio Reading",
            subtitle: "Your library, narrated.",
            description: "Convert any text into natural, human-like audio. Multitask seamlessly while learning.",
            icon: <Headphones className="w-5 h-5" />,
            image: ebookFeatures,
            points: ["Natural TTS voices", "Background playback", "Variable speed control"],
            color: "#3b82f6"
        },
        {
            title: "Smart Dictionary",
            subtitle: "Maintain your flow.",
            description: "Tap any word for instant definitions and contextual meanings. Build vocabulary effortlessly.",
            icon: <Languages className="w-5 h-5" />,
            image: ebookHighlight,
            points: ["Instant tap lookup", "Contextual meanings", "Vocabulary tracker"],
            color: "#3b82f6"
        },
        {
            title: "Podcast Mode",
            isNew: true,
            subtitle: "Books into episodes.",
            description: "Transform chapters into audio episodes. Build your personal learning playlist today.",
            icon: <HeadphonesIcon className="w-5 h-5" />,
            image: ebookFeatures,
            points: ["Episodic learning", "Playlist creation", "Mobile-first design"],
            color: "#3b82f6"
        },
        {
            title: "Smart Progress",
            subtitle: "Resuming exactly where you left.",
            description: "Intelligent bookmarks that sync across all your devices. Never lose your momentum again.",
            icon: <Bookmark className="w-5 h-5" />,
            image: ebooksImage,
            points: ["Cross-device sync", "Auto-resume logic", "Unlimited bookmarks"],
            color: "#3b82f6"
        }
    ];

    return (
        <section className="pt-32 pb-12 bg-white overflow-hidden" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <div className="container mx-auto px-6">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6 border border-slate-200"
                        >
                            <Sparkles className="w-3 h-3" />
                            Premium Experience
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-primary-text leading-tight">
                            The Ultimate <br />
                            <span className="italic text-blue-600">Digital Library.</span>
                        </h2>
                    </div>
                </div>

                {/* THE INTERACTIVE HUB */}
                <div className="relative bg-slate-50 border border-slate-100 rounded-[3rem] p-4 lg:p-12 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.05)] overflow-hidden">

                    <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">

                        {/* LEFT: INTERACTIVE NAV PILLS */}
                        <div className="w-full lg:w-[40%] space-y-3">
                            {features.map((feature, idx) => (
                                <button
                                    key={idx}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-full text-left p-6 rounded-[2rem] transition-all duration-500 flex items-center justify-between group relative ${activeIndex === idx
                                        ? 'bg-white shadow-xl shadow-slate-200 border-white'
                                        : 'hover:bg-white/50 border-transparent'
                                        } border-2`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`p-3 rounded-2xl transition-all ${activeIndex === idx ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200/50 text-slate-400'
                                            }`}>
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-bold transition-colors ${activeIndex === idx ? 'text-primary-text' : 'text-slate-400'
                                                }`}>
                                                {feature.title}
                                            </h3>
                                            {activeIndex === idx && (
                                                <motion.p
                                                    layoutId="subtitle"
                                                    className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1"
                                                >
                                                    {feature.subtitle}
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>
                                    {activeIndex === idx && (
                                        <motion.div layoutId="arrow">
                                            <ArrowRight className="w-5 h-5 text-blue-600" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* RIGHT: DYNAMIC STAGE */}
                        <div className="w-full lg:w-[60%] relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative"
                                >
                                    {/* Main Showcase Image */}
                                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white group">
                                        <img
                                            src={features[activeIndex].image}
                                            alt={features[activeIndex].title}
                                            className="w-full h-auto aspect-[16/10] object-cover"
                                        />

                                        {/* Floating Feature Info Card - Hidden for Dictionary (2) and Progress (4) */}
                                        {activeIndex !== 2 && activeIndex !== 4 && (
                                            <div className="absolute top-6 left-6 p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl max-w-[260px]">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Premium Spec</span>
                                                </div>
                                                <ul className="space-y-3">
                                                    {features[activeIndex].points.map((pt, i) => (
                                                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-primary-text">
                                                            <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
                                                            {pt}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Description Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-white via-white/80 to-transparent pt-24">
                                            <p className="text-secondary-text text-lg leading-relaxed font-light">
                                                {features[activeIndex].description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EbookFeatureDetail;
