import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Globe, MousePointer2, 
  Layers, Image as ImageIcon, Type, 
  Heart, Plus, Search, Grid
} from "lucide-react";

const BuildoraHero = () => {
  const [activeTheme, setActiveTheme] = useState("lifestyle");
  const [isBuilding, setIsBuilding] = useState(false);
  const [progress, setProgress] = useState(0);

  const themes = {
    lifestyle: {
      title: "Lifestyle",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      accent: "#ff6b6b",
      tag: "Minimalist Style"
    },
    interior: {
      title: "Interior",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
      accent: "#7b8a70",
      tag: "Modern Spaces"
    },
    art: {
      title: "Studio",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop",
      accent: "#6c5ce7",
      tag: "Creative Portfolio"
    }
  };

  useEffect(() => {
    setIsBuilding(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 100 : p + 4));
    }, 30);
    setTimeout(() => setIsBuilding(false), 1200);
    return () => clearInterval(interval);
  }, [activeTheme]);

  return (
    <section className="relative min-h-screen bg-white pt-24 pb-20 overflow-hidden font-sans">
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HERO TEXT --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="bg-blue-300 p-1.5 rounded-full text-white">
              <Sparkles size={14} fill="white" />
            </div>
            <span className="text-xs font-bold tracking-tight text-blue-950">IDEA TO WEBSITE IN SECONDS</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-blue-950 mb-6">
            Build a site as <br /> 
            <span className="text-blue-800 italic font-serif">effortless</span> as a pin.
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex bg-white border-2 border-gray-100 rounded-2xl p-3 shadow-sm w-full max-w-2xl">
              <input 
                type="text" 
                placeholder="Name your brand..." 
                className="flex-1 px-6 py-4 outline-none text-blue-950 font-medium text-lg"
              />
              <button className="bg-blue-300 hover:bg-blue-400 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95">
                Create
              </button>
            </div>
          </div>
        </div>

        {/* --- PINTEREST CANVAS --- */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Theme Toggles */}
          <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2">
            {Object.keys(themes).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTheme(t)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeTheme === t ? "bg-blue-950 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {themes[t].title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6 items-start">
            
            {/* Left: Component Pins */}
            <div className="hidden lg:flex col-span-3 flex-col gap-6 mt-12">
              <PinCard delay={0.1} title="Typography" icon={<Type size={18}/>}>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-100 rounded" />
                  <div className="h-4 w-2/3 bg-gray-100 rounded" />
                </div>
              </PinCard>
              <PinCard delay={0.2} title="Visual Assets" icon={<ImageIcon size={18}/>}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square bg-gray-100 rounded-lg" />
                  <div className="aspect-square bg-gray-200 rounded-lg" />
                </div>
              </PinCard>
            </div>

            {/* Middle: Main Builder Live Preview */}
            <div className="col-span-12 lg:col-span-6">
              <motion.div 
                layout
                className="bg-white rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-gray-100 relative"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTheme}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="relative aspect-[4/5] md:aspect-[16/10]"
                  >
                    <img src={themes[activeTheme].image} className="w-full h-full object-cover" alt="preview" />
                    <div className="absolute inset-0 bg-black/10" />
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16 text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-xs font-black uppercase tracking-widest mb-4 opacity-80">{themes[activeTheme].tag}</p>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">Elevate your <br/> presence.</h2>
                        <div className="flex gap-4">
                          <div className="h-12 w-32 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">Shop</div>
                          <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"><Heart size={20}/></div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Progress Loader */}
                    {isBuilding && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-50">
                        <div className="w-48 space-y-4">
                          <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-tighter">
                            <span>Generating Layout</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              className="h-full bg-blue-300"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right: Floating Actions */}
            <div className="hidden lg:flex col-span-3 flex-col gap-6">
               <PinCard delay={0.3} title="Color Story" icon={<Grid size={18}/>}>
                <div className="flex gap-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border border-gray-100 shadow-sm" style={{backgroundColor: i % 2 === 0 ? themes[activeTheme].accent : '#f3f4f6'}} />
                  ))}
                </div>
              </PinCard>
              <div className="bg-blue-950 text-white p-6 rounded-[24px] shadow-xl">
                <p className="text-xs font-bold opacity-60 mb-4 tracking-widest">PUBLISH</p>
                <p className="text-lg font-medium leading-snug mb-6">Ready to share your vision with the world?</p>
                <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                  Claim Domain
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

/* Reusable Pinterest-style Card */
const PinCard = ({ children, title, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="bg-white p-5 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-50 group cursor-pointer"
  >
    <div className="flex items-center gap-3 mb-4 text-gray-400 group-hover:text-blue-600 transition-colors">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
    </div>
    {children}
  </motion.div>
);

export default BuildoraHero;