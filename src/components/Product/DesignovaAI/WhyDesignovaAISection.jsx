import React from 'react';
import {
  XCircle, CheckCircle2, Zap, Monitor, Cloud,
  Clock, FastForward, User, MousePointer2, ShieldCheck,
  Cpu, Rocket, Sparkles
} from 'lucide-react';

const ComparisonSection = () => {
  const comparisonData = [
    {
      feature: "Learning Curve",
      traditional: "Months of training",
      designova: "Zero learning curve",
      tIcon: <User size={18} />,
      dIcon: <Sparkles size={18} />
    },
    {
      feature: "Core Engine",
      traditional: "Manual pixel pushing",
      designova: "Neural AI Rendering",
      tIcon: <Monitor size={18} />,
      dIcon: <Cpu size={18} />
    },
    {
      feature: "Production Time",
      traditional: "6-8 Hours / Asset",
      designova: "Under 30 Seconds",
      tIcon: <Clock size={18} />,
      dIcon: <Zap size={18} />
    },
    {
      feature: "Collaboration",
      traditional: "File versioning hell",
      designova: "Real-time Cloud Sync",
      tIcon: <Monitor size={18} />,
      dIcon: <Cloud size={18} />
    },
  ];

  return (
    <section className="py-20 bg-[#001D3D] relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <ShieldCheck size={14} />
            <span>The Competitive Edge</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
            Old School vs. <span className="text-blue-500 italic">New Era.</span>
          </h2>
          <p className="text-blue-200/60 text-lg font-medium">
            Why settle for legacy workflows when you can design at the speed of thought?
          </p>
        </div>

        {/* Comparison Engine */}
        <div className="max-w-6xl mx-auto relative">

          {/* Floating "VS" Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex w-16 h-16 bg-white rounded-full items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] border-4 border-[#001D3D]">
            <span className="text-[#001D3D] font-black italic">VS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-0 relative">

            {/* LEFT: TRADITIONAL (The "Fade" Side) */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[3rem] md:rounded-r-none p-8 lg:p-12 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400">
                  <Monitor size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Legacy Tools</h3>
                  <p className="text-sm text-gray-500">The hard way</p>
                </div>
              </div>

              <div className="space-y-8">
                {comparisonData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.feature}</span>
                      <div className="flex items-center gap-3 text-gray-300">
                        <XCircle size={18} className="text-red-500/50" />
                        <span className="font-medium text-lg">{item.traditional}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: DESIGNOVA (The "Glow" Side) */}
            <div className="relative group">
              {/* Vibrant Border Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

              <div className="relative bg-white rounded-[3rem] md:rounded-l-none p-8 lg:p-12 h-full shadow-2xl">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <Zap size={24} fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#001D3D]">Designova AI</h3>
                      <p className="text-sm text-blue-600 font-bold">Powered by V4 Engine</p>
                    </div>
                  </div>
                  <div className="hidden lg:block px-4 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">Recommended</div>
                </div>

                <div className="space-y-8">
                  {comparisonData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">{item.feature}</span>
                        <div className="flex items-center gap-3 text-[#001D3D]">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            {item.dIcon}
                          </div>
                          <span className="font-bold text-lg">{item.designova}</span>
                        </div>
                      </div>
                      <CheckCircle2 size={24} className="text-green-500" />
                    </div>
                  ))}
                </div>

                {/* Bottom Action Area */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">Starting at</p>
                    <p className="text-2xl font-black text-[#001D3D]">$0<span className="text-sm text-gray-400 font-medium">/mo</span></p>
                  </div>
                  <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-[#001D3D] transition-all shadow-xl shadow-blue-100 group">
                    Get Started <Rocket size={18} className="group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-blue-300/40 text-xs font-bold uppercase tracking-[0.3em]">No Credit Card Required • Instant Setup</p>
        </div>

      </div>
    </section>
  );
};

export default ComparisonSection;