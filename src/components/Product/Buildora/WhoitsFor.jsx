import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap } from 'lucide-react';

const AudienceComparison = () => {
  const personas = [
    {
      id: "01",
      title: "Entrepreneurs",
      desc: "Go from idea to live brand in an afternoon. No code, no stress. Build your legacy starting today.",
      image: "https://i.pinimg.com/1200x/2d/b4/1a/2db41a788c5b55f15f90c2a2f94ff19c.jpg",
      size: "lg:col-span-2"
    },
    {
      id: "02",
      title: "Small Biz",
      desc: "Professional sites that convert locals into regulars and scale with your growth.",
      image: "https://i.pinimg.com/1200x/1c/77/81/1c778165dc269226ec4a38cbe37941b3.jpg",
      size: "lg:col-span-1"
    },
    {
      id: "03",
      title: "Freelancers",
      desc: "A portfolio that looks as expensive as your rate. Secure better clients instantly.",
      image: "https://i.pinimg.com/originals/89/22/80/892280519eca08889eae361d9bd27d8a.png",
      size: "lg:col-span-1"
    },
    {
      id: "04",
      title: "Creators",
      desc: "The ultimate home for your content, courses, and digital products. Own your audience.",
      image: "https://i.pinimg.com/1200x/df/ba/21/dfba2178560d7194df287b42c27ce307.jpg",
      size: "lg:col-span-2"
    },
  ];

  return (
    <section className="py-24 bg-blue-100 text-slate-900 overflow-hidden font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-blue-400 pb-12">
          <div className="max-w-2xl">
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              Built for <br />
              <span className="text-blue-600">Results.</span>
            </h2>
          </div>
          <div className="max-w-xs text-right">
            <p className="text-sm font-bold uppercase tracking-widest mb-4">/ Target Audience</p>
            <p className="text-blue-900 font-medium">
              We've stripped away the noise to provide a high-end foundation for every type of builder.
            </p>
          </div>
        </div>

        {/* Minimalist Typographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-blue-400 border border-blue-400 mb-12 shadow-2xl">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className={`${p.size} group p-10 bg-blue-300 transition-all duration-300 flex flex-col justify-between min-h-[320px] ${p.image ? 'relative' : ''}`}
              style={p.image ? {
                backgroundImage: `url(${p.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : {}}
            >
              {p.image && (
                <div className={`absolute inset-0 ${p.id === "02" ? 'bg-blue-900/60' : 'bg-gradient-to-b from-black/5 via-black/10 to-black/20'}`} />
              )}
              <div className={p.image ? 'relative z-10' : ''}>
                <span className="block text-6xl font-black text-blue-400/50 mb-6 group-hover:text-white transition-colors">
                  {p.id}
                </span>
                <h3 className={`text-3xl font-black uppercase tracking-tight mb-4 ${p.image ? 'text-white' : ''}`}>{p.title}</h3>
                <p className={`font-medium leading-relaxed max-w-sm ${p.image && p.id === "02" ? 'text-white' : p.image && p.id === "03" ? 'text-white' : p.image ? 'text-white/90' : 'text-blue-900'}`}>
                  {p.desc}
                </p>
              </div>
              
              <div className={`flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] mt-8 group-hover:gap-8 transition-all cursor-pointer ${p.image ? 'text-white' : ''}`}>
                View Details <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Single CTA Card */}
        <div className="bg-slate-900 text-blue-300 p-16 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h3 className="text-4xl md:text-6xl font-black uppercase leading-none mb-8">
                        Join the <br /> 
                        <span className="text-white">Era.</span>
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {["SEO-First Architecture", "Auto-Responsive Layouts", "99.9% Cloud Uptime"].map((item, i) => (
                            <div key={i} className="text-left">
                                <span className="text-white text-sm font-black uppercase tracking-widest mb-2 block">/ 0{i+1}</span>
                                <p className="text-blue-300 font-medium text-lg">{item}</p>
                            </div>
                        ))}
                    </div>
                    
                    <button className="group flex items-center justify-center gap-4 px-12 py-6 border-2 border-blue-300 hover:bg-blue-300 hover:text-slate-900 transition-all mx-auto">
                        <span className="text-xl font-black uppercase">Get Started Now</span>
                        <Zap className="group-hover:fill-current" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceComparison;