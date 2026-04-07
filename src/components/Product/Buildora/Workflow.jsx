import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Layout, Globe, MousePointer2, 
  Sparkles, Check, MoveRight
} from 'lucide-react';

const WorkflowSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Select",
      desc: "Curated high-end templates designed for conversion.",
      icon: <Layout size={20} />,
      visual: "https://i.pinimg.com/1200x/6c/dc/ba/6cdcbab92ee1e4a0469019a35bf0d5fc.jpg",
      offset: "lg:-translate-y-8"
    },
    {
      title: "Edit",
      desc: "Real-time editing with fluid drag-and-drop precision.",
      icon: <Sparkles size={20} />,
      visual: "https://i.pinimg.com/1200x/4b/f5/cb/4bf5cbc15bccc9f55fb8f53eaa7c10ca.jpg",
      offset: "lg:translate-y-8"
    },
    {
      title: "Result",
      desc: "Instant deployment to our edge-delivery network.",
      icon: <Globe size={20} />,
      visual: "https://i.pinimg.com/1200x/68/aa/61/68aa613db13accf414562a2ec1fd72d7.jpg",
      offset: "lg:-translate-y-8"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-blue-600 font-bold text-[11px] uppercase tracking-[0.3em] mb-8 bg-blue-50/50 backdrop-blur-sm px-6 py-2.5 rounded-full border border-blue-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            The Modern Blueprint
          </motion.div>
          <h2 className="text-6xl lg:text-8xl font-serif text-[#001D3D] tracking-tight mb-8 font-black leading-none" style={{ fontFamily: 'Georgia, serif' }}>
            Your vision, <span className="text-blue-600 italic font-medium tracking-tighter">accelerated.</span>
          </h2>
        </div>

        {/* --- MAP LOOK STEPS --- */}
        <div className="relative mb-32">
          {/* Connecting Path Line (Desktop) */}
          <svg className="hidden lg:block absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 pointer-events-none" viewBox="0 0 1200 120" fill="none">
            <motion.path 
              d="M0 60 C 300 120, 900 0, 1200 60" 
              stroke="#E2E8F0" 
              strokeWidth="2" 
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveStep(i)}
                className={`relative group cursor-pointer ${step.offset}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`p-8 rounded-[3rem] transition-all duration-700 ${activeStep === i ? 'bg-white shadow-[0_40px_80px_-15px_rgba(0,29,61,0.08)] ring-1 ring-blue-50' : 'bg-transparent'}`}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 ${activeStep === i ? 'bg-blue-600 text-white rotate-12 scale-110 shadow-xl shadow-blue-200' : 'bg-slate-100 text-gray-400 rotate-0'}`}>
                      {step.icon}
                    </div>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Phase 0{i + 1}</p>
                    <h3 className="text-2xl font-black text-[#001D3D] mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-[200px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- PREVIEW WINDOW --- */}
        <div className="max-w-6xl mx-auto">
          <div className="relative p-4 lg:p-6 bg-slate-900 rounded-[4rem] shadow-2xl overflow-hidden border border-slate-800">
             {/* Browser Top Bar */}
             <div className="flex items-center justify-between mb-4 px-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                </div>
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] text-white/40 font-bold tracking-[0.2em] uppercase">
                  project_v2_final.buildora
                </div>
                <div className="w-12" /> {/* Spacer */}
             </div>

             <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden bg-slate-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={steps[activeStep].visual} 
                      className="w-full h-full object-contain opacity-80" 
                      alt="Workflow visual"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001D3D] via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating UI Elements */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-12 right-12 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl z-20"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </motion.div>
             </div>
          </div>
        </div>

        {/* --- BOTTOM ACTION --- */}
        <div className="mt-24 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-6 bg-blue-600 rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(59,130,246,0.3)]"
            >
              <div className="absolute inset-0 bg-[#001D3D] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative flex items-center gap-4 text-white font-bold text-xl uppercase tracking-tighter">
                Start Creating <MoveRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
            <div className="mt-8 flex items-center gap-6 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              <span>Trusted by 10k+ Creators</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>Enterprise Ready</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;