import React from 'react';
import { 
  BarChart4, 
  Target, 
  MousePointerClick, 
  TrendingUp, 
  Globe,
  DollarSign,
  CheckCircle2
} from 'lucide-react';
import imgSponsorCenter from '../../../assets/Athenalms/sponsor.png';

const SponsorMonetization = () => {
  const monetizationFeatures = [
    { title: "Manage campaigns", icon: <Target size={18} /> },
    { title: "Track ad performance", icon: <MousePointerClick size={18} /> },
    { title: "Submit placements", icon: <Globe size={18} /> },
    { title: "Monitor analytics", icon: <BarChart4 size={18} /> }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- TOP CONTENT BLOCK --- */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="lg:w-2/3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-black uppercase tracking-widest mb-6">
              <DollarSign size={14} />
              <span>Revenue Generation Engine</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-[#001D3D] leading-[1.1] tracking-tighter">
              Integrated Sponsor & <br /> 
              <span className="text-blue-600">Revenue System.</span>
            </h2>
          </div>
          <div className="lg:w-1/3">
            <p className="text-lg text-gray-500 font-medium leading-relaxed border-l-4 border-emerald-500 pl-6">
              Athena LMS goes beyond traditional functionality to create new 
              <span className="text-[#001D3D] font-bold"> monetization and growth opportunities</span>.
            </p>
          </div>
        </div>

        {/* --- MAIN DISPLAY BLOCK --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: THE FEATURE GRID (4/12) */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="space-y-3">
              {monetizationFeatures.map((feature, idx) => (
                <div key={idx} className="group p-6 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      {feature.icon}
                    </div>
                    <span className="font-black text-[#001D3D] tracking-tight text-lg">{feature.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 size={14} />
                    <span>Native Module Integrated</span>
                  </div>
                </div>
              ))}
            </div>

           
          </div>

          {/* RIGHT: THE DASHBOARD (8/12) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="relative">
              {/* Outer Shadow Effect */}
              <div className="absolute -inset-4 bg-slate-200/40 rounded-[3.5rem] blur-2xl" />
              
              <div className="relative bg-white border border-slate-200 rounded-[3rem] p-3 shadow-2xl">
                {/* Internal Browser Bar */}
                <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex items-center justify-between rounded-t-[2.5rem]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                  </div>
                  <div className="flex items-center gap-3 bg-white px-5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    <Globe size={14} className="text-blue-600" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">sponsor-center-dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500" />
                     <span className="text-[10px] font-black text-[#001D3D]">LIVE</span>
                  </div>
                </div>

                {/* THE IMAGE (Zoom disabled) */}
                <div className="overflow-hidden rounded-b-[2.5rem]">
                  <img 
                    src={imgSponsorCenter} 
                    alt="Athena Sponsor Center" 
                    className="w-full h-auto object-contain block" // Removed hover scale
                  />
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600 rounded-3xl -rotate-12 flex items-center justify-center text-white shadow-2xl -z-10 opacity-20" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SponsorMonetization;