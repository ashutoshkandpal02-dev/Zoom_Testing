import React from 'react';
import { 
  LifeBuoy, 
  Settings, 
  Filter, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import imgSupport from '../../../assets/Athenalms/support.png';

const SupportControl = () => {
  const supportFeatures = [
    { text: "Submit tickets", icon: <Settings size={18} />, desc: "Direct portal for user issues." },
    { text: "Track status", icon: <Clock size={18} />, desc: "Real-time updates on resolution." },
    { text: "Filter by priority", icon: <Filter size={18} />, desc: "Handle critical needs first." },
    { text: "Service requests", icon: <CheckCircle2 size={18} />, desc: "Manage bulk admin tasks." }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
          

          
          {/* --- LEFT SIDE: THE VISUAL PROOF --- */}
          <div className="lg:w-[55%] relative group">
            {/* Background Glow */}

            
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 to-indigo-600/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h2 className="text-5xl font-black text-[#001D3D] leading-[0.9] mb-8 tracking-tighter">
              Administrative <br />
              <span className="text-blue-600">Total Control.</span>
            </h2>

            <div className="relative bg-[#F8FAFC] border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-blue-900/10 transition-transform duration-700 group-hover:scale-[1.02]">
              {/* Browser-style Header */}
              
              <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="h-4 w-px bg-slate-200 mx-2" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Support_Module.v1</span>
                </div>
                <ShieldCheck size={16} className="text-blue-600" />
              </div>
              

              {/* The Dashboard Image */}
              <div className="p-2 md:p-4 bg-white">
                <img 
                  src={imgSupport} 
                  alt="Athena LMS Support Tickets Dashboard" 
                  className="w-full h-auto rounded-xl" 
                />
              </div>
            </div>

           
          </div>

          {/* --- RIGHT SIDE: THE CONTENT --- */}
          <div className="lg:w-[45%] ">
           
          

            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10">
              Athena LMS eliminates the need for external helpdesks. 
              <span className="text-slate-900 font-bold"> Everything is unified</span>—from ticket submission to service request tracking—keeping your operations inside one secure perimeter.
            </p>

            {/* Feature List: Vertical Stack */}
            <div className="space-y-4">
              {supportFeatures.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                >
                  <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-[#001D3D] text-sm uppercase tracking-tight mb-0.5">{item.text}</h4>
                    <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-10 flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest group">
              Explore Admin Tools 
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportControl;