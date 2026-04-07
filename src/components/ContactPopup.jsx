"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';


const ContactPopup = () => {
    const location = useLocation();
    const [displayStage, setDisplayStage] = useState('none'); // 'none' | 'modal' | 'minimized'

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        if (!isHomePage) return;

        const handleOpen = () => setDisplayStage('modal');
        window.addEventListener('openContactPopup', handleOpen);

        // Auto-open modal after 4 seconds
        const autoOpenTimer = setTimeout(() => {
            setDisplayStage((prev) => (prev === 'none' ? 'modal' : prev));
        }, 4000);

        // Load WonderEngine script globally for the iframe
        const script = document.createElement('script');
        script.src = 'https://api.wonderengine.ai/js/form_embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            window.removeEventListener('openContactPopup', handleOpen);
            clearTimeout(autoOpenTimer);
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [isHomePage]);

    const closeToMinimized = () => setDisplayStage('minimized');
    const openFromMinimized = () => setDisplayStage('modal');
    const fullyClose = () => setDisplayStage('none');

    // Only show popup on the home page
    if (!isHomePage) {
        return null;
    }

    return (
        <>

            {/* MODAL VIEW */}
            <AnimatePresence>
                {displayStage === 'modal' && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeToMinimized}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="relative w-full max-w-xl h-[92vh] bg-white rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.3)] overflow-hidden z-10 border border-slate-100 flex flex-col"
                        >
                            {/* Premium Header - Refined Vertical */}
                            <div className="bg-white px-8 py-6 flex items-center justify-between z-20 relative border-b border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                                        <Sparkles className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Connect Now</h3>
                                        <p className="text-slate-500 text-xs font-medium">Connect with us to start your journey.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeToMinimized}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form Content Wrapper */}
                            <div className="flex-1 relative bg-white overflow-y-auto custom-scrollbar min-h-[400px]">
                                <iframe
                                    className="w-full"
                                    src="https://api.wonderengine.ai/widget/form/tHMfncbmbEpAOXwKxNxj"
                                    style={{
                                        width: '100%',
                                        height: '1000px',
                                        border: 'none',
                                        background: 'white'
                                    }}
                                    id="inline-tHMfncbmbEpAOXwKxNxj"
                                    data-layout='{"id":"INLINE"}'
                                    data-trigger-type="alwaysShow"
                                    data-activation-type="alwaysActivated"
                                    data-deactivation-type="neverDeactivate"
                                    data-form-name="Athena Contact Form"
                                    data-height="850"
                                    data-form-id="tHMfncbmbEpAOXwKxNxj"
                                    title="Contact Form"
                                ></iframe>
                            </div>

                            {/* Subtle Footer Note */}
                            <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 text-center z-20 relative">
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Secure Protocol • 24h Response</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MINIMIZED BUBBLE (Compact Circle) */}
            <AnimatePresence>
                {displayStage === 'minimized' && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="fixed bottom-8 right-8 z-[90]"
                    >
                        <button
                            onClick={openFromMinimized}
                            className="group relative w-16 h-16 bg-blue-600 text-white rounded-full shadow-[0_10px_40px_rgba(37,99,235,0.4)] flex items-center justify-center transition-all duration-300 border-2 border-white/20 hover:bg-blue-700"
                            aria-label="Open contact form"
                        >
                            {/* Pulse Effect */}
                            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20 scale-125 pointer-events-none" />

                            <MessageSquare className="w-7 h-7 fill-current relative z-10" />
                        </button>

                        <button
                            onClick={fullyClose}
                            className="absolute -top-1 -right-1 bg-slate-800 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-700 z-20"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ContactPopup;