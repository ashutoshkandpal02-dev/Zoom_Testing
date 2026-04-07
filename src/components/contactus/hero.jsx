import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, BookOpen, Award, Headphones, Sparkles, MessageSquare } from 'lucide-react';

export default function Hero() {
  useEffect(() => {
    // Dynamically load WonderEngine script
    const script = document.createElement('script');
    script.src = 'https://api.wonderengine.ai/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const stats = [
    { label: "Courses Created", value: "1,500+", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Active Learners", value: "45,000+", icon: Users, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Success Rate", value: "98%", icon: Award, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Support", value: "24/7", icon: Headphones, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  const benefits = [
    "Find out if Athena LMS meets your specific technical & business needs.",
    "Share your learning goals & let our experts map out a custom strategy.",
    "Learn how global leaders use Athena to scale revenue & engagement."
  ];

  return (
    <section className="relative min-h-screen pt-0 pb-20 px-4 overflow-hidden bg-slate-50">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-100/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-100/30 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl -mt-8 lg:-mt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {/* <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-700 text-sm font-bold tracking-wide border border-blue-200"
              >
                <Sparkles size={14} />
                Connect with Experts
              </motion.span> */}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 leading-[1.1] tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Scale Your Education <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                  With Precision.
                </span>
              </h1>

              <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
                Book a brief discovery call to see how Athena's AI-powered ecosystem can transform your training programs.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 p-0.5 rounded-full bg-blue-100 group-hover:bg-blue-600 transition-colors">
                    <CheckCircle2 size={16} className="text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-slate-700 font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.6 }}
                  className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 leading-none">{stat.value}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CONTENT: THE FORM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Form Container with Glassmorphism */}
            <div className="relative z-10 bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 overflow-hidden">
              <div className="bg-blue-50/50 border-b border-slate-100 p-6 text-center space-y-1">
                <div className="inline-flex p-2 bg-blue-600/10 rounded-xl mb-2 text-blue-600">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Send us a message</h3>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Typical response time: &lt; 2 hours</p>
              </div>

              <div className="p-4 bg-white/50 min-h-[500px]">
                <iframe
                  className="w-full h-[500px] border-none rounded-b-[2rem]"
                  src="https://api.wonderengine.ai/widget/form/tHMfncbmbEpAOXwKxNxj"
                  id="inline-tHMfncbmbEpAOXwKxNxj"
                  title="Athena Contact Form"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-activation-type="alwaysActivated"
                  data-form-name="Athena Contact Form"
                  data-height="500"
                  data-layout-iframe-id="inline-tHMfncbmbEpAOXwKxNxj"
                  data-form-id="tHMfncbmbEpAOXwKxNxj"
                ></iframe>
              </div>
            </div>

            {/* Decorative dots/shapes around form */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400/20 blur-2xl rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-400/20 blur-2xl rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
