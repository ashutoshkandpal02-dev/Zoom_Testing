import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Lock, Users, Settings,
  Terminal, Puzzle, Activity, ArrowRight,
  Globe, Database, Cpu, Server, Zap,
  Search, BarChart, Cloud, HardDrive
} from "lucide-react";

/**
 * AdminScalabilityAI - Emphasizes the infrastructure and scaling power of Buildora.
 * High-impact dark mode section with server statistics.
 */
const AdminScalabilityAI = () => {
  const securityFeatures = [
    { title: "99.9% Uptime", desc: "Enterprise hosting.", icon: <Server size={18} /> },
    { title: "SSL Security", desc: "Built-in protection.", icon: <Lock size={18} /> },
    { title: "SEO Engine", desc: "Rank automatically.", icon: <Search size={18} /> },
    { title: "Global CDN", desc: "Instant loading.", icon: <Globe size={18} /> },
  ];

  return (
    <section className="py-32 bg-[#001D3D] relative overflow-hidden font-sans text-white">
      {/* Background patterns: subtle scanning lines & gradients */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.2) 1px, transparent 1px)`, backgroundSize: '100% 40px' }} />
      <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="grid lg:grid-cols-12 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
              <ShieldCheck size={14} />
              Infrastructure Engineered for Scale
            </div>

            <h2 className="text-5xl lg:text-7xl font-serif text-white tracking-tighter mb-10 font-black leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Scale with <br />
              <span className="text-blue-500 italic font-light">absolute power.</span>
            </h2>

            <p className="text-xl text-blue-100/60 font-medium mb-12 max-w-xl font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
              Buildora’s cloud-native architecture automatically scales with your traffic.
              Forget server management—just focus on your vision while we handle the rest.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {securityFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-900/40 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-white mb-2">{f.title}</h4>
                  <p className="text-[10px] uppercase font-black tracking-widest text-blue-400 opacity-70">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: The Hardware/Terminal Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="relative p-1 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-[3.5rem] shadow-2xl overflow-hidden group">
              <div className="bg-[#0c162d] rounded-[3.4rem] p-12 lg:p-20 relative overflow-hidden">

                {/* Decorative Glow behind the visual */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/20 blur-[100px] pointer-events-none" />

                <div className="space-y-12 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 group-hover:rotate-6 transition-all duration-700">
                      <Cloud size={40} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white italic tracking-tight">Cloud Hosting Engine</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Active Region: global-edge-1</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Service Availability</p>
                        <h5 className="text-4xl font-black italic">99.9<span className="text-blue-500 text-2xl">%</span></h5>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Network Latency</p>
                        <h5 className="text-2xl font-black text-white/50 tracking-tight">14<span className="text-blue-500 text-sm italic">ms</span></h5>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group-hover:bg-white/10 transition-colors duration-500">
                      <div className="flex items-center gap-4">
                        <ShieldCheck className="text-blue-500" size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/60">Malware Protection</span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-emerald-400">ENABLED</span>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group-hover:bg-white/10 transition-colors duration-500">
                      <div className="flex items-center gap-4">
                        <Activity className="text-blue-500" size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/60">DDoS Mitigation</span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-emerald-400">SECURE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdminScalabilityAI;
