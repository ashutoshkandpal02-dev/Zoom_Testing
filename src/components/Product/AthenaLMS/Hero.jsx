import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Zap, BarChart, Globe, Sparkles, MousePointer2, Search, Bell, User, Book, LayoutDashboard, Users, CheckCircle, MessageSquare, CreditCard, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AthenaHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-white flex items-center pt-20 overflow-hidden select-none">

      {/* --- INTERACTIVE BACKGROUND --- */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
      >
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-blue-200/40 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-gradient-to-tr from-indigo-100/50 to-transparent blur-[100px] rounded-full" />
      </div>

      {/* Subtle Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* --- LEFT SIDE: CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2"
          >


            <h1 className="text-5xl lg:text-7xl font-medium text-[#001D3D] leading-tight mb-8" style={{ fontFamily: "'Georgia', serif" }}>
              A simpler way to <br />
              <span className="relative inline-block text-blue-600">
                manage learning.
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="6" fill="transparent" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-lg mb-10">
              Stop fighting with complicated software. Athena LMS gives you everything you need to train your team and track their progress in one easy-to-use platform.
            </p>

            {/* Outcome Highlight */}
            <div className="relative mb-12 flex items-center gap-6 p-4 rounded-3xl bg-blue-50/50 border border-blue-100/50">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-[#001D3D] font-bold text-lg leading-tight">Built for results.</p>
                <p className="text-gray-500 text-sm">Most platforms just host files. We help you actually grow.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              <button className="px-10 py-5 bg-[#001D3D] text-white rounded-2xl font-medium text-lg shadow-2xl hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                Request Demo <ChevronRight size={20} />
              </button>
              <button className="px-10 py-5 bg-white text-[#001D3D] border-2 border-slate-200 rounded-2xl font-medium text-lg hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-3 group">
                <div className="p-1 bg-blue-100 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Play size={16} fill="currentColor" />
                </div>
                Explore Platform
              </button>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: THE LMS DASHBOARD MOCKUP --- */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-20 group" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.1s ease-out' }}>
              {/* Main Dashboard Frame */}
              <div className="bg-white border border-blue-100 rounded-[2.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,29,61,0.15)] flex overflow-hidden aspect-[1.4/1]">

                {/* Internal Sidebar */}
                <div className="hidden md:flex w-20 bg-slate-50 border-r border-slate-100 flex-col items-center py-6 gap-6">
                  <div className="w-10 h-10 bg-[#001D3D] rounded-xl flex items-center justify-center mb-4">
                    <Globe size={20} className="text-white animate-spin-slow" />
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-blue-600 bg-blue-50 rounded-lg">
                    <LayoutDashboard size={18} />
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-slate-400">
                    <Book size={18} />
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-slate-400">
                    <Users size={18} />
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-slate-400">
                    <BarChart size={18} />
                  </div>
                  <div className="mt-auto w-8 h-8 flex items-center justify-center text-slate-400">
                    <HelpCircle size={18} />
                  </div>
                </div>

                {/* Internal Main Content */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                  {/* Internal Top Bar */}
                  <div className="h-14 px-6 flex items-center justify-between bg-white border-b border-slate-50">
                    <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl flex-1 max-w-sm mr-4">
                      <Search size={14} className="text-slate-400" />
                      <div className="w-32 h-2 text-slate-300 bg-slate-200/50 rounded-full" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Bell size={20} className="text-slate-400" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                      </div>
                      <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden border border-slate-100">
                        <img src="https://i.pravatar.cc/100?img=12" alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* Internal Content Area */}
                  <div className="flex-1 overflow-hidden p-6">
                    {/* Welcome Banner */}
                    <div className="relative bg-[#E6F4FF] rounded-3xl p-6 overflow-hidden mb-6 flex justify-between items-center group">
                      <div className="relative z-10 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2 block">Welcome Back</span>
                        <h4 className="text-xl md:text-2xl font-black text-[#001D3D] leading-tight mb-2">
                          Welcome to Athena LMS, User!
                        </h4>
                        <p className="text-xs text-slate-500 max-w-xs mb-0">Your journey to knowledge excellence continues. Track your progress here.</p>
                      </div>
                      <div className="relative w-24 h-24 hidden sm:flex items-center justify-center bg-white rounded-2xl shadow-xl shadow-blue-500/10 border border-blue-50 overflow-hidden">
                        <div className="absolute inset-0 bg-[#001D3D]" />
                        <Globe size={40} className="text-white relative z-10" />
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-xl" />
                    </div>

                    {/* Stats Layout */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                        <h5 className="text-sm font-bold text-[#001D3D]">Your Progress Overview</h5>
                        <span className="text-[10px] text-slate-400 font-medium">Real-time snapshot</span>
                      </div>
                      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                        <div className="bg-white border border-indigo-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500">
                              <Users size={12} />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Courses</span>
                          </div>
                          <div className="text-xl font-black text-[#001D3D]">7</div>
                          <div className="text-[8px] text-slate-400">0 completed</div>
                        </div>
                        <div className="bg-white border border-blue-100 p-4 rounded-2xl shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                              <Book size={12} />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Modules</span>
                          </div>
                          <div className="text-xl font-black text-[#001D3D]">19</div>
                          <div className="text-[8px] text-slate-400 text-blue-500">6 completed</div>
                        </div>
                        <div className="bg-white border border-green-100 p-4 rounded-2xl shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                              <CheckCircle size={12} />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Lessons</span>
                          </div>
                          <div className="text-xl font-black text-[#001D3D]">166</div>
                          <div className="text-[8px] text-slate-400">0 completed</div>
                        </div>
                        <div className="bg-white border border-orange-100 p-4 rounded-2xl shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
                              <BarChart size={12} />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Completion</span>
                          </div>
                          <div className="text-xl font-black text-[#001D3D]">16%</div>
                          <div className="text-[8px] text-slate-400">Overall progress</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default AthenaHero;