import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkshopPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('workshopPopupSeen');
            if (!hasSeenPopup) {
                setIsOpen(true);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        sessionStorage.setItem('workshopPopupSeen', 'true');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-[800px] bg-slate-800 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row p-6 md:p-10 border border-white/10"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 z-20 p-2.5 bg-black/20 hover:bg-black/40 rounded-full transition-all text-white/80 hover:text-white border border-white/10"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content Section (Left) */}
                        <div className="md:w-[58%] flex flex-col justify-center pr-0 md:pr-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-[10px] tracking-widest mb-6">
                                    <span className="text-sm">🎓</span> Interactive Workshop
                                </div>

                                <h2 className="text-3xl md:text-5xl font-medium text-white leading-[1.1] mb-6 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    Reimagine education.<br />
                                    Scale your impact.
                                </h2>

                                <div className="mb-8 flex flex-col">
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-cyan-400 text-xl tracking-wider">March 21st — 7PM PST</span>
                                        <p className="text-slate-300 text-base leading-relaxed">
                                            Master the future of course design with AI.
                                        </p>
                                    </div>

                                    <div className="flex flex-col pt-2">
                                        <span className="text-cyan-400 text-base drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] tracking-tight">Limited spots remaining</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-4">
                                    <Link
                                        to="/workshop"
                                        onClick={closePopup}
                                        className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-base rounded-full transition-all duration-300 shadow-xl hover:shadow-blue-500/20 hover:scale-105 active:scale-95 whitespace-nowrap tracking-widest"
                                    >
                                        Register Now!
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Poster Section (Right - Compact) */}
                        <div className="md:w-[42%] mt-6 md:mt-0 relative flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="relative w-full"
                            >
                                <div className="relative shadow-2xl border border-white/10">
                                    <img
                                        src="/workshop_flyer.webp"
                                        alt="Workshop Invitation"
                                        className="w-full h-auto block"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WorkshopPopup;
