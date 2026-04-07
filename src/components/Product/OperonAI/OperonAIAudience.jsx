import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
    "Real-time streaming", // Shortened text
    "50+ languages",
    "Custom KB",
    "Easy embedding",
    "Voice cloning",
    "Enterprise security"
];

const OperonAIAudience = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".cta-content",
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6, // Faster duration
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%"
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        // Reduced py-24 to py-12
        <section ref={sectionRef} className="py-12 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                {/* Scaled down background blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Reduced max-width from 5xl to 4xl */}
                <div className="max-w-4xl mx-auto">
                    {/* Reduced padding from p-12/16 to p-8/10 */}
                    <div className="cta-content bg-gradient-to-br from-blue-600 to-blue-800 p-8 lg:p-10 text-center relative overflow-hidden rounded-xl">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] bg-[length:20px_20px]" />
                        </div>

                        <div className="relative z-10">
                            <motion.h2
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                // Reduced text size from 5xl to 3xl
                                className="text-2xl lg:text-3xl font-bold text-white mb-3"
                            >
                                Ready to deploy your AI workforce?
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                // Reduced text size from xl to base and mb-8 to mb-6
                                className="text-base text-blue-100 mb-6 max-w-xl mx-auto"
                            >
                                Join the future of autonomous enterprise operations today.
                            </motion.p>

                            {/* Benefits - Made more compact */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap justify-center gap-2 mb-8"
                            >
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md">
                                        <CheckCircle2 size={14} className="text-blue-200" />
                                        <span className="text-white text-xs font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                // Reduced padding from py-5 to py-3 and font size to text-base
                                className="bg-white text-blue-600 px-8 py-3 font-bold text-base hover:bg-blue-50 transition-all shadow-xl flex items-center gap-2 mx-auto rounded-lg"
                            >
                                Get Started Now
                                <ArrowRight size={18} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OperonAIAudience;