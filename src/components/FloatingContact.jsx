import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles } from 'lucide-react';

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="relative w-full max-w-xl h-[92vh] bg-white rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.3)] overflow-hidden z-10 border border-slate-100 flex flex-col"
                        >
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
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

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
                                    title="Contact Form"
                                ></iframe>
                            </div>

                            <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 text-center z-20 relative">
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Secure Protocol • 24h Response</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Floating Icon */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                className="fixed bottom-8 right-8 z-[90]"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative w-16 h-16 bg-blue-600 text-white rounded-full shadow-[0_10px_40px_rgba(37,99,235,0.4)] flex items-center justify-center transition-all duration-300 border-2 border-white/20 hover:bg-blue-700"
                    aria-label="Open contact form"
                >
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20 scale-125 pointer-events-none" />
                    <MessageSquare className="w-7 h-7 fill-current relative z-10" />

                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                        Get in Touch
                    </div>
                </button>
            </motion.div>
        </>
    );
};

export default FloatingContact;
