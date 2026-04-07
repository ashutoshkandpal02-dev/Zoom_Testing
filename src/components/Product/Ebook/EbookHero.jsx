import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ebookHero from '../../../assets/Ebook/Ebooks.webp';
import bg2 from '../../../assets/bg2.jpg';

const EbookHero = () => {
    return (
        <section
            className="relative pt-32 pb-16 overflow-hidden bg-[#f0f9ff]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
            {/* Background Image with Transparent Overlay */}
            <div className="absolute inset-0 z-0 text-[#fafafa]">
                <img
                    src={bg2}
                    alt="Background"
                    className="w-full h-full object-cover opacity-[0.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff]/80 via-[#f0f9ff]/40 to-white/90" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-[#fafafa]">
                {/* Centered Content Block */}
                <div className="max-w-4xl mx-auto text-center mb-24 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-600/5 text-blue-700 text-[11px] font-bold tracking-[0.2em] uppercase backdrop-blur-sm border border-blue-100">
                            Read. Listen. Summarize. Podcast.
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-medium mb-10 leading-[1.05] text-primary-text tracking-tight"
                    >
                        The Library of the Future, <br className="hidden md:block" />
                        <span className="italic text-primary-text/40 font-normal">Powered by AI.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-secondary-text/80 leading-relaxed font-light mb-12"
                    >
                        An AI-powered learning ecosystem designed to transform traditional reading
                        into an intelligent, interactive experience.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center justify-center"
                    >
                        <button className="px-12 py-5 bg-primary-text text-white rounded-2xl font-bold hover:bg-blue-800 transition-all flex items-center gap-3 group shadow-[0_20px_40px_-10px_rgba(12,74,110,0.3)] text-lg hover:scale-105 active:scale-95 text-[#fafafa]">
                            Explore the Library
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                {/* POP-UP ANIMATION: Entrance Reveal from Down */}
                <motion.div
                    initial={{ opacity: 0, y: 150, scale: 0.9, rotateX: 15 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                        mass: 1.2,
                        duration: 1.5,
                        delay: 0.2
                    }}
                    style={{ perspective: "1500px" }}
                    className="max-w-6xl mx-auto px-4"
                >
                    <div className="relative group">
                        {/* Dramatic Showcase Frame */}
                        <motion.div
                            whileHover={{
                                y: -12,
                                scale: 1.01
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative z-10 overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.2)] border border-white/80 bg-white/40 backdrop-blur-3xl rounded-[3rem]"
                        >
                            <img
                                src={ebookHero}
                                alt="Ebook Athena Interface"
                                className="w-full h-auto object-contain transform transition-transform duration-1000 group-hover:scale-[1.02]"
                            />

                            {/* Glass Reflection Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-30 pointer-events-none" />

                            {/* Professional Scanning Shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2500 ease-in-out pointer-events-none" />
                        </motion.div>

                        {/* Ambient Cinematic Glows */}
                        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[90%] bg-blue-500/10 rounded-full blur-[140px] -z-10 animate-pulse-subtle" />
                        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[70%] h-[90%] bg-indigo-500/10 rounded-full blur-[140px] -z-10 animate-pulse-subtle" style={{ animationDelay: '1.2s' }} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default EbookHero;
