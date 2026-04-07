import React, { useState } from "react";
import {
  Sparkles,
  Image as ImageIcon,
  Presentation,
  Share2,
  Video,
  Wand2,
  ArrowRight
} from "lucide-react";

// Assets (Assuming these paths remain consistent)
import bgrmeove from "../../../assets/designova/bg_remove.jpg";
import ppt from "../../../assets/designova/ppt.webp";
import socialmedia from "../../../assets/designova/social_media.png";
import edit from "../../../assets/designova/edit.webp";

const TemplateLibraryRedesign = () => {
  const [activeCategory, setActiveCategory] = useState("Try it now");

  const categories = ["Try it now", "AI", "Presentation", "Social Media", "Video"];

  const cards = [
    {
      id: 1,
      title: "Watch your words turn into visuals with AI",
      button: "Generate media",
      icon: <Sparkles size={24} />,
      category: "AI",
      // High-Contrast Dark Gradient
      className: "lg:col-span-2 bg-[#1e40af] text-white",
      overlay: "bg-gradient-to-t from-blue-900/90 via-blue-800/40 to-transparent",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Remove backgrounds in one click",
      button: "Try Now",
      icon: <ImageIcon size={24} />,
      category: "AI",
      // Clean Light Mode with border
      className: "bg-white text-[#0c4a6e] border-2 border-slate-100 shadow-sm",
      overlay: "bg-gradient-to-t from-white via-white/20 to-transparent",
      img: bgrmeove
    },
    {
      id: 3,
      title: "Inspire with professional presentations",
      icon: <Presentation size={24} />,
      category: "Presentation",
      // Light Blue High Visibility
      className: "bg-[#e0f2ff] text-[#0c4a6e] border border-blue-100",
      overlay: "bg-gradient-to-t from-[#e0f2ff] via-transparent to-transparent",
      img: ppt,
    },
    {
      id: 4,
      title: "Create scroll-stopping social content",
      button: "Design Socials",
      icon: <Share2 size={24} />,
      category: "Social Media",
      // Dark Slate with high contrast text
      className: "lg:col-span-2 bg-[#0f172a] text-white",
      overlay: "bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent",
      img: socialmedia,
    },
    {
      id: 5,
      title: "Awesome videos for any screen",
      icon: <Video size={24} />,
      category: "Video",
      className: "lg:col-span-2 bg-[#3b82f6] text-white",
      overlay: "bg-gradient-to-t from-blue-700 via-transparent to-transparent",
      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6,
      title: "Edit with AI-powered tools",
      button: "Edit Image",
      icon: <Wand2 size={24} />,
      category: "AI",
      className: "bg-[#fbbf24] text-black",
      overlay: "bg-gradient-to-t from-[#fbbf24] via-transparent to-transparent",
      img: edit,
    },
  ];

  const filteredCards =
    activeCategory === "Try it now"
      ? cards
      : cards.filter((card) => card.category === activeCategory);

  return (
    <section className="py-24 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#0c4a6e] mb-8 tracking-tight">
            Ready-Made Templates
          </h2>

          <div className="flex justify-center">
            <div className="flex gap-1 bg-white border border-slate-200 rounded-full p-1.5 shadow-sm overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-sm font-bold rounded-full transition-all whitespace-nowrap ${activeCategory === cat
                      ? "bg-[#3b82f6] text-white shadow-md"
                      : "text-slate-500 hover:text-[#0c4a6e] hover:bg-slate-50"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[320px]">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className={`group rounded-2xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${card.className}`}
            >
              {/* Image Layer - Higher visibility opacity (60-80%) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                {/* Advanced Gradient Overlay for Text Visibility */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${card.overlay}`} />
              </div>

              {/* Content Layer */}
              <div className="relative h-full p-8 flex flex-col justify-between z-10">
                <div className="flex items-start">
                  <div className="p-3 bg-white/90 backdrop-blur-md rounded-xl text-[#0c4a6e] shadow-sm border border-white/20">
                    {card.icon}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold leading-tight drop-shadow-sm">
                    {card.title}
                  </h3>

                  {card.button ? (
                    <button className="flex items-center gap-2 bg-[#0c4a6e] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg hover:bg-[#3b82f6] transition-all transform hover:scale-105">
                      {card.button}
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <div className="text-sm font-black flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer uppercase tracking-wider">
                      Explore <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TemplateLibraryRedesign;