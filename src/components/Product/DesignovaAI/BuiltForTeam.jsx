import React from 'react';
import { Users2, Cloud, ShieldCheck, Share2, FolderTree, ArrowRight, UserPlus } from 'lucide-react';

const TeamsSection = () => {
  const teamFeatures = [
    {
      title: "Shared Brand Kits",
      desc: "Ensure every team member uses the right logos and colors.",
      icon: <FolderTree size={20} />
    },
    {
      title: "Cloud Storage",
      desc: "Access your assets from anywhere with encrypted cloud sync.",
      icon: <Cloud size={20} />
    },
    {
      title: "Multi-user Access",
      desc: "Control permissions with granular role-based access.",
      icon: <ShieldCheck size={20} />
    },
    {
      title: "Organization Workspace",
      desc: "Dedicated environments for different departments.",
      icon: <Users2 size={20} />
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* --- LEFT SIDE: COLLABORATION VISUAL --- */}
          <div className="w-full lg:w-1/2 relative">
            <div className="bg-[#001D3D] rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
              {/* Fake Dashboard Interface */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold border-2 border-[#001D3D]">JD</div>
                  <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-[10px] text-[#001D3D] font-bold border-2 border-[#001D3D] -ml-4">AL</div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#001D3D] border-2 border-[#001D3D] -ml-4">
                    <UserPlus size={12} />
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-[10px] font-bold tracking-widest uppercase">
                  Live Collaboration
                </div>
              </div>

              {/* Central Asset Preview */}
              <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-center gap-4">
                <div className="h-4 w-1/2 bg-blue-400/20 rounded"></div>
                <div className="flex gap-4">
                  <div className="h-20 w-1/3 bg-blue-600/20 rounded-lg animate-pulse"></div>
                  <div className="h-20 w-1/3 bg-blue-600/20 rounded-lg animate-pulse delay-75"></div>
                  <div className="h-20 w-1/3 bg-blue-600/20 rounded-lg animate-pulse delay-150"></div>
                </div>
                <div className="h-4 w-3/4 bg-blue-400/10 rounded"></div>
              </div>

              {/* Floating "Editor" Cursor */}
              <div className="absolute bottom-20 right-20 animate-bounce">
                <div className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded shadow-lg flex items-center gap-1">
                  <Share2 size={10} /> Alex is editing
                </div>
              </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full -z-10"></div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
              <Users2 size={16} />
              <span>Team Workspace</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-[#001D3D] mb-6 leading-tight">
              Designed for <br />
              <span className="text-blue-600 italic">Businesses & Teams</span>
            </h2>

            <p className="text-gray-500 mb-10 text-lg leading-relaxed">
              Scale your creativity without the chaos. Designova for Teams gives you
              the control and speed needed to manage global brands.
            </p>

            <div className="grid sm:grid-cols-2 gap-y-8 gap-x-12 mb-12">
              {teamFeatures.map((f, i) => (
                <div key={i} className="group">
                  <div className="text-blue-600 mb-3 transition-transform group-hover:scale-110">
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-[#001D3D] mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>

            <button className="group flex items-center gap-4 bg-[#001D3D] text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-900 transition-all">
              Explore Team Plans
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamsSection;