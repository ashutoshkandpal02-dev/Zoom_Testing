import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Award, 
  CheckCircle, 
  Monitor, 
  ArrowRight 
} from 'lucide-react';
import imgCatalog from '../../../assets/Athenalms/catalog.png';
import imgMyLearning from '../../../assets/Athenalms/learning.png';
import imgCourseDetail from '../../../assets/Athenalms/coursestr.png';

const CourseExperience = () => {
  const features = [
    "Access premium courses",
    "Continue active learning",
    "Track module completion",
    "Navigate structured content"
  ];

  return (
    <section className="py-20 bg-[#e9f1f9] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/30 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
            <BookOpen size={14} />
            <span>Educational Framework</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-[#001D3D] leading-tight mb-6 tracking-tighter">
            Structured Course & <br /> Module Management
          </h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Athena LMS delivers structured learning pathways through courses, modules, and lessons. 
            <span className="text-blue-600"> Designed for clarity. Built for progression.</span>
          </p>
        </div>

        {/* --- TRIPLE SCREENSHOT GRID (Desktop Mockup) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-end">
          {[
            { img: imgCatalog, label: "Premium Catalog", desc: "Browse high-tier content" },
            { img: imgMyLearning, label: "My Learning", desc: "Active progress tracking", highlight: true },
            { img: imgCourseDetail, label: "Course Structure", desc: "Deep module navigation" }
          ].map((screen, idx) => (
            <div key={idx} className={`relative group transition-all duration-500 ${screen.highlight ? 'lg:scale-110 z-20' : 'z-10 opacity-90 hover:opacity-100'}`}>
              <div className="bg-[#001D3D] rounded-t-2xl p-3 flex items-center justify-between border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[8px] font-black uppercase text-blue-300 tracking-[0.2em]">{screen.label}</span>
              </div>
              <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden border-x border-b border-gray-200">
                <img 
                  src={screen.img} 
                  alt={screen.label} 
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]" 
                />
              </div>
              <div className="mt-4 text-center lg:text-left">
                <p className="text-[#001D3D] font-bold text-sm">{screen.label}</p>
                <p className="text-gray-400 text-xs">{screen.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- INTERACTIVE FEATURE LIST --- */}
        <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-xl shadow-blue-900/5 border border-blue-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <CheckCircle size={24} />
                </div>
                <p className="text-lg font-black text-[#001D3D] leading-tight">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default CourseExperience;