"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Shield, Star, Crown } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Ultimate Bundle',
      price: '$2,500',
      period: '/per academy',
      description: 'The definitive AI powerhouse for established teams. Everything pre-configured for a global launch.',
      features: [
        'Unlimited Storage & Bandwidth',
        '25,000 AI Monthly Power-Tokens',
        'Full White-Label Ecosystem',
        'Custom Enterprise Domain',
        'Concierge 1-on-1 Setup',
        'Advanced Analytics Dashboard',
        'All AI Agent Tools Included',
        'Priority Global CDN Access',
      ],
      cta: 'Secure Your Academy',
      popular: true,
      highlight: true,
      icon: <Crown className="w-6 h-6" />,
    },
    {
      name: 'Custom Enterprise',
      price: 'Contact Us',
      period: '',
      description: 'Massive scale requirements? We build custom toolsets and infrastructure to your exact blueprint.',
      features: [
        'Bespoke Feature Selection',
        'SLA & Global Compliance',
        'SSO & Identity Management',
        'Full API & Data Streams',
        'Private Cloud Infrastructure',
      ],
      cta: 'Connect With Us',
      popular: false,
      color: 'slate',
    },
  ];

  const triggerContact = () => {
    window.dispatchEvent(new CustomEvent('openContactPopup'));
  };

  return (
    <section className="bg-slate-50 pt-12 pb-24 px-4 relative overflow-hidden">
      {/* RICH DYNAMIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-gradient-to-bl from-blue-100/40 via-transparent to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-gradient-to-tr from-indigo-100/30 via-transparent to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
              Premium Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 leading-tight">
              Scale Your Training with <span className="text-blue-600">AI Marketplace</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Elite infrastructure for organizations that demand precision, speed, and intelligence.
            </p>
          </motion.div>
        </div>

        {/* Global Impact Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-[3rem] p-1 shadow-2xl overflow-hidden group"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-[2.9rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between relative border border-white/10">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />

            <div className="relative z-10 text-white md:max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                  <Zap className="w-5 h-5 text-blue-400 fill-blue-400" />
                </div>
                <span className="font-bold tracking-[0.2em] uppercase text-xs text-blue-300">Limited Availability Launch Pack</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-extrabold mb-6 leading-[1.15]">
                The ultimate <span className="text-blue-400">Global Launchpad</span> for your Training Academy.
              </h3>
              <p className="text-blue-100/80 text-lg mb-0 font-normal leading-relaxed">
                Master every feature. No limits. The $2,500 bundle gives you the full-stack AI ecosystem plus white-glove setup.
                Perfect for teams ready to dominate their niche in record time.
              </p>
            </div>

            <div className="relative z-10 mt-10 md:mt-0 flex flex-col items-center md:items-end">
              <div className="text-center md:text-right mb-8">
                <span className="text-blue-300/50 line-through text-xl block mb-1">$7,500+ Market Value</span>
                <div className="text-6xl md:text-7xl font-black text-white tracking-tighter">$2,500</div>
                <p className="text-blue-400 font-bold mt-2 tracking-widest uppercase text-xs">Full Implementation Price</p>
              </div>
              <button
                onClick={triggerContact}
                className="bg-blue-600 text-white hover:bg-blue-500 px-12 py-5 rounded-2xl font-bold text-lg shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] transition-all active:scale-95 flex items-center gap-3 group"
              >
                Get Started Now
                <Star className="w-5 h-5 fill-current text-yellow-400 group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Pricing Grid */}
        <div className="flex flex-col md:flex-row justify-center gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white border rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full md:max-w-md ${plan.highlight
                ? 'border-blue-500 shadow-xl scale-105 z-20 md:-mt-4'
                : 'border-slate-200 z-10'
                }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-4 h-4" /> Best Value
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${plan.highlight ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {plan.icon || (plan.name === 'Ultimate Bundle' ? <Crown className="w-5 h-5" /> : <Shield className="w-5 h-5" />)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 font-bold ml-1">{plan.period}</span>
                </div>
                <p className="text-[0.95rem] text-slate-500 font-medium leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-4">
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Check className="w-3.5 h-3.5 stroke-[4]" />
                    </div>
                    <span className="text-sm text-slate-700 font-semibold leading-snug">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={triggerContact}
                className={`w-full py-5 rounded-2xl font-black text-base transition-all duration-300 active:scale-95 shadow-lg ${plan.highlight
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10'
                  }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Questions? <button onClick={triggerContact} className="text-blue-600 hover:underline font-bold">Chat with our experts</button> to find the best fit for your team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
