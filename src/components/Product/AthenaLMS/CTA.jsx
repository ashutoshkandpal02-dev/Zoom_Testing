import React from 'react';
import { ChevronRight, ArrowUpRight, Rocket, Users, Globe } from 'lucide-react';

const AthenaCTA = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-blue-50/30 opacity-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-[#001D3D] rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,29,61,0.5)]">
          
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            
            {/* --- LEFT: VALUE PROP --- */}
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-8">
                <Rocket size={14} className="animate-bounce" />
                <span>Ready to Scale?</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-8">
                Stop Delivering Courses. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 italic">
                  Start Delivering Outcomes.
                </span>
              </h2>

              <p className="text-xl text-blue-100/70 font-medium leading-relaxed max-w-xl mb-10 mx-auto lg:mx-0">
                Join the next generation of organizations using Athena LMS to drive performance, 
                revenue, and measurable learning impact.
              </p>

              {/* Trust Micro-Metrics */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-80">
                <div className="flex items-center gap-2 text-white">
                  <Users size={20} className="text-blue-400" />
                  <span className="text-sm font-bold tracking-tight">Enterprise Ready</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Globe size={20} className="text-blue-400" />
                  <span className="text-sm font-bold tracking-tight">Global Deployment</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <ArrowUpRight size={20} className="text-blue-400" />
                  <span className="text-sm font-bold tracking-tight">94.8% Success Rate</span>
                </div>
              </div>
            </div>

            {/* --- RIGHT: ACTION BOX --- */}
            <div className="lg:w-2/5 w-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-600 rounded-2xl rotate-12 flex items-center justify-center text-white shadow-xl animate-pulse">
                  <Rocket size={32} />
                </div>
                
                <h3 className="text-2xl font-black text-white mb-6 tracking-tight text-center lg:text-left">
                  Transform Your <br/> Ecosystem Today.
                </h3>
                
                <div className="space-y-4">
                  <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 group">
                    Request Custom Demo 
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="w-full py-5 bg-white text-[#001D3D] hover:bg-blue-50 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3">
                    Contact Sales
                  </button>
                </div>

                <p className="mt-6 text-center text-blue-200/40 text-xs font-bold uppercase tracking-widest">
                  No Commitment Required • 24/7 Support
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AthenaCTA;