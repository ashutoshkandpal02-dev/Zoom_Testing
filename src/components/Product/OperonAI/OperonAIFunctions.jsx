import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp, Sparkles, Zap, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: 'What are Video Agents?',
        answer:
            'Video Agents are AI-powered interactive characters that can see, hear, and respond to users in real-time through video streaming.',
    },
    {
        question: 'How do I make a Video Agent?',
        answer:
            'Simply upload a photo or choose from our library, customize the personality and voice, and deploy your agent in minutes.',
    },
    {
        question: 'How do Video Agents talk to my users?',
        answer:
            'Video Agents use advanced AI voice models and natural language processing to understand and respond to conversations naturally.',
    },
    {
        question: 'Can Video Agents respond in real time?',
        answer:
            'Yes, our agents stream with sub-second latency using optimized diffusion transformer technology.',
    },
    {
        question: 'How does a Video Agent know what to say?',
        answer:
            'Agents are powered by large language models and can be customized with specific knowledge bases, scripts, and personality traits.',
    },
    {
        question: 'Do Video Agents support different languages?',
        answer:
            'Yes, Operon AI supports over 50 languages with native-quality voice synthesis.',
    },
    {
        question: 'Can I use my own large language model (LLM) or AI Voice model?',
        answer:
            'Absolutely. Operon AI is model-agnostic and integrates with OpenAI, Anthropic, Google, and custom models.',
    },
    {
        question: 'How much do Video Agents cost?',
        answer:
            'Pricing scales with usage. We offer free trials and flexible plans for developers to enterprise deployments.',
    },
    {
        question: 'What kind of characters do Video Agents support?',
        answer:
            'Any character you can imagine - realistic humans, brand mascots, fictional characters, or custom avatars.',
    },
    {
        question: 'How do I add a Video Agent to my website or application?',
        answer:
            'Just copy our embed code snippet and paste it into your HTML. No coding required for basic integration.',
    },
    {
        question: 'Who is Operon AI for?',
        answer:
            'Developers, marketers, educators, creators, and businesses looking to add interactive AI video to their experiences.',
    },
    {
        question: 'What are Operon AI Video Agent use-cases?',
        answer:
            'Customer support, sales, education, entertainment, virtual influencers, brand ambassadors, and more.',
    },
    {
        question: 'What are the key features of Operon AI Video Agents?',
        answer:
            'Real-time streaming, multimodal interaction, voice cloning, emotion expression, custom knowledge, and easy embedding.',
    },
    {
        question: 'Can I try Operon AI today?',
        answer: 'Yes, sign up for free and create your first Video Agent in minutes.',
    },
];

const OperonAIFunctions = () => {
    const [openFaq, setOpenFaq] = useState(null); // null means all closed
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".research-content",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%"
                    }
                }
            );
            gsap.fromTo(".faq-item",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%"
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const toggleFaq = (index) => {
        // Strict toggle: If the index is already open, close it (set to null).
        // Otherwise, set the new index as the only open one.
        setOpenFaq(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Research Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div className="research-content">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-600 font-semibold">Powered by frontier research</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                            We Deal With The Aspects Of Professional IT Services
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            OperonAI is a custom video diffusion transformer model that streams in real-time. We
                            optimized the entire tech stack - from foundation model to inference pipeline - for
                            charisma and speed.
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                            Read our research
                            <Zap className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 shadow-lg"
                        >
                            <div className="w-14 h-14 bg-blue-100 flex items-center justify-center mb-4">
                                <Zap className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Experience</h3>
                            <p className="text-slate-600 text-sm">Our expert team delivers cutting-edge AI solutions with years of industry experience.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-lg mt-8"
                        >
                            <div className="w-14 h-14 bg-blue-100 flex items-center justify-center mb-4">
                                <MessageCircle className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Quick Support</h3>
                            <p className="text-slate-600 text-sm">24/7 dedicated support team ready to assist you with any questions or issues.</p>
                        </motion.div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-slate-600">
                            Everything you need to know about Operon AI Video Agents
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 items-start">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                layout // Helps with layout shifts when one closes and another opens
                                className={`faq-item bg-white border rounded-lg overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-blue-300'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className={`font-semibold pr-4 text-sm ${openFaq === index ? 'text-blue-600' : 'text-slate-900'}`}>
                                        {faq.question}
                                    </span>
                                    <div className="flex-shrink-0">
                                        {openFaq === index ? (
                                            <ChevronUp className="w-5 h-5 text-blue-600" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-slate-400" />
                                        )}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {openFaq === index && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-2">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default OperonAIFunctions;