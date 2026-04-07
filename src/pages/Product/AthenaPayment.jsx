import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    ShieldCheck,
    Activity,
    Link as LinkIcon,
    Rocket,
    PlayCircle,
    Users,
    Cpu,
    BarChart,
    ArrowRight,
    CreditCard,
    ChevronRight,
    CircleDot,
    CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import athenaMockupImg from '../../assets/athena_dashboard_mockup.png';

const AthenaPayment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const georgiaFont = { fontFamily: 'Georgia, "Times New Roman", serif' };
    const sansFont = { fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };

    return (
        <div className="min-h-screen text-slate-800 transition-colors duration-500 font-sans bg-[#f8fbff]" style={sansFont}>
            <Navbar />

            {/* HERO SECTION - LIGHT BLUE PREMIUM THEME */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
                {/* Soft Diagonal Gradient Background */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-x-0 top-0 h-[85%] bg-gradient-to-br from-blue-100 via-indigo-50/50 to-teal-50/30"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-20 pb-44 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-slate-900"
                        >
                            <h1 className="text-4xl lg:text-7xl font-normal leading-[1.1] mb-8" style={georgiaFont}>
                                Athena Payment Gateway: <br />
                                <span className="italic text-blue-600">Modern, AI-Enhanced</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-500 mb-10 max-w-xl font-light leading-relaxed font-sans">
                                Unlock seamless transactions with our Athena Payment Gateway. Integrated directly into our LMS platform,
                                you’ll have a smart, fast, and flexible way to accept payments.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 mb-16">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/contact"
                                        className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-500 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-3"
                                    >
                                        Get Started Now <ChevronRight className="w-6 h-6" />
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/contact"
                                        className="px-10 py-5 border-2 border-slate-200 text-slate-700 rounded-2xl font-bold text-xl hover:bg-white transition-all backdrop-blur-sm flex items-center justify-center gap-3 bg-white/50"
                                    >
                                        Apply for Account
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Ecosystem Integration Section */}
                            <div className="pt-10 border-t border-slate-200 hidden sm:block">
                                <p className="text-slate-400 uppercase tracking-[0.2em] font-bold text-[10px] mb-6">Built-in Native Integrations</p>
                                <div className="flex flex-wrap gap-10 opacity-70 transition-all">
                                    <div className="flex items-center gap-2 font-bold text-lg text-slate-700 tracking-tight"><Zap className="w-5 h-5 text-blue-600" /> LMS SYNC</div>
                                    <div className="flex items-center gap-2 font-bold text-lg text-slate-700 tracking-tight"><Cpu className="w-5 h-5 text-blue-600" /> EXPRESS PAY</div>
                                    <div className="flex items-center gap-2 font-bold text-lg text-slate-700 tracking-tight"><CheckCircle2 className="w-5 h-5 text-blue-600" /> INSTANT ENROLL</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Visual Mockups */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border-4 border-white">
                                <img
                                    src={athenaMockupImg}
                                    alt="Athena Payment Dashboard"
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Floating Phone Mockup - Premium Dark Variant */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -left-12 -bottom-10 z-20 w-60 bg-slate-900 rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/10 hidden xl:block"
                            >
                                {/* Phone Notch */}
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-full z-30" />

                                <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/90 rounded-[2.5rem] p-6 pt-12 aspect-[9/18] flex flex-col items-start text-left relative overflow-hidden group/phone">
                                    {/* Glowing Ambient Accent */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/40 rounded-full blur-3xl" />

                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                        <CreditCard className="w-7 h-7" />
                                    </div>

                                    <div className="text-blue-600/60 text-[10px] mb-1 uppercase font-bold tracking-[0.2em]">Transaction View</div>
                                    <div className="text-slate-900 text-2xl font-bold mb-8">$1,250.00</div>

                                    {/* Simulated Card List - Light Variant */}
                                    <div className="w-full space-y-3 mb-8">
                                        <div className="w-full h-12 bg-white border border-slate-100 rounded-xl flex items-center px-4 gap-3 shadow-sm group-hover/phone:shadow-md transition-shadow">
                                            <div className="w-6 h-4 bg-orange-500/80 rounded-sm" />
                                            <div className="h-1.5 w-20 bg-slate-200 rounded-full" />
                                        </div>
                                        <div className="w-full h-12 bg-white border border-slate-100 rounded-xl flex items-center px-4 gap-3 shadow-sm group-hover/phone:shadow-md transition-shadow">
                                            <div className="w-6 h-4 bg-blue-500/80 rounded-sm" />
                                            <div className="h-1.5 w-24 bg-slate-200 rounded-full" />
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="w-full h-14 bg-blue-600 rounded-2xl mb-4 flex items-center justify-center text-white font-bold shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] group-hover/phone:bg-blue-500 transition-colors cursor-pointer">
                                        Pay Successfully
                                    </div>

                                    <div className="w-full flex justify-center gap-1.5 mt-auto">
                                        <div className="w-8 h-1 bg-slate-200 rounded-full" />
                                        <div className="w-2 h-1 bg-slate-200 rounded-full" />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Industry Vertical Banner - Replaces Accepted Globally */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-white/80 backdrop-blur-md z-20 flex items-center justify-center border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20">
                        <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">Tailored for your business</p>
                        <div className="flex items-center gap-10 opacity-70 transition-all font-bold text-slate-700 tracking-[0.15em] text-xs">
                            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-blue-500" /> COURSE CREATORS</span>
                            <span className="flex items-center gap-2"><Rocket className="w-4 h-4 text-blue-500" /> ACADEMIES</span>
                            <span className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-blue-500" /> COACHES</span>
                            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-blue-500" /> EDTECH</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE SECTION - LIGHT BLUE ACCENT */}
            <section className="py-32 bg-blue-50/20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mb-20 text-left">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl lg:text-5xl font-normal text-slate-900 mb-6"
                            style={georgiaFont}
                        >
                            Why Choose <span className="italic relative">
                                Athena Payment Gateway?
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    viewport={{ once: true }}
                                    className="absolute bottom-1 left-0 h-2 bg-blue-200/50 -z-10"
                                />
                            </span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: "Fast Onboarding",
                                desc: "Get your merchant account approved quickly with minimal hassle. Our streamlined process is built for agility."
                            },
                            {
                                icon: <Activity className="w-8 h-8" />,
                                title: "AI-Powered Insights",
                                desc: "Understand your customers better with intelligent analytics. Predict trends and optimize your revenue streams."
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8" />,
                                title: "Modern Payment Rails",
                                desc: "Built on modern payment rails for speed and security. We maintain 99.99% uptime for your global transactions."
                            },
                            {
                                icon: <LinkIcon className="w-8 h-8" />,
                                title: "Seamless Integration",
                                desc: "Tied directly into your course, membership, or service payments for a truly unified experience."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="p-10 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.08)] transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 translate-y-[-1rem] group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 scale-150">
                                    {item.icon}
                                </div>
                                <div className="mb-8 p-4 bg-blue-50 text-blue-600 w-fit rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 rotate-0 group-hover:rotate-[360deg]">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-normal text-slate-900 mb-4" style={georgiaFont}>{item.title}</h3>
                                <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS - LIGHTER SHADE */}
            <section className="py-32 bg-[#fcfdfe] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl lg:text-6xl font-normal text-slate-900 mb-6"
                            style={georgiaFont}
                        >
                            <span className="text-blue-600 italic">How It Works:</span> <br />
                            A Simple Step-by-Step Journey
                        </motion.h2>
                    </div>

                    <div className="relative">
                        <div className="absolute top-12 left-[10%] right-[10%] h-[2px] bg-blue-600/20 hidden lg:block" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            {[
                                { num: "01", title: "Apply for Access", desc: "Join our platform, and we’ll onboard you as a sub-merchant. Minimal paperwork, maximum speed." },
                                { num: "02", title: "Start Accepting Payments", desc: "Once approved, you can process payments directly through your LMS without third-party redirects." },
                                { num: "03", title: "Track & Optimize", desc: "Use AI analytics to improve your customer experience and increase your conversion rates." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="w-24 h-24 bg-white border-2 border-blue-600 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.1)] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-all duration-500 relative">
                                        <span className="text-3xl lg:text-4xl font-normal text-blue-600 group-hover:text-white transition-colors" style={georgiaFont}>
                                            {item.num}
                                        </span>
                                    </div>
                                    <div className="px-4">
                                        <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{item.title}</h4>
                                        <p className="text-lg text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            {/* AI ADVANTAGE - CLEAN & BRIGHT */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="flex-1 space-y-6">
                            {[
                                { icon: <Cpu />, title: "Smart Recommendations", desc: "AI suggests improvements to your checkout flow." },
                                { icon: <BarChart />, title: "Customer Insights", desc: "Learn more about your buyer behavior in real-time." },
                                { icon: <ShieldCheck />, title: "AI-Driven Security", desc: "Proactive fraud detection and safe global transactions." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-8 p-8 rounded-3xl border border-blue-50/50 hover:bg-blue-50/10 hover:shadow-xl transition-all group">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                        {React.cloneElement(item.icon, { className: "w-8 h-8" })}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-slate-500 text-lg font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-5xl lg:text-7xl font-normal text-slate-900 mb-10 leading-tight" style={georgiaFont}>
                                The <span className="italic text-blue-600">AI-Enhanced</span> Advantage
                            </h2>
                            <p className="text-2xl text-slate-500 mb-12 italic leading-relaxed">
                                “Our platform doesn't just process transactions; it understands them. We leverage neural networks to safeguard your capital.”
                            </p>
                            <div className="w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-400 to-transparent rounded-full shadow-sm" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION - SPLIT LAYOUT */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1)_0%,transparent_70%)]" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-left max-w-2xl">
                            <h2 className="text-4xl lg:text-6xl font-normal text-white mb-6" style={georgiaFont}>
                                Ready to <span className="italic text-blue-400">Get Started?</span>
                            </h2>
                            <p className="text-xl text-slate-400 leading-relaxed font-light">
                                Join Athena today and transform your business with AI-powered payments. Our team is ready to help you scale.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link
                                to="/contact"
                                className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-500 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all flex items-center gap-3"
                            >
                                Get Started Now <ArrowRight className="w-6 h-6" />
                            </Link>
                            <Link
                                to="/contact"
                                className="px-10 py-5 border border-white/20 text-white rounded-2xl font-semibold text-xl hover:bg-white/5 transition-all backdrop-blur-sm"
                            >
                                Apply for Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AthenaPayment;
