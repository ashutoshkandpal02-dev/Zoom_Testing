import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Share2, 
  Zap, 
  MessageCircle, 
  UserPlus,
  Send,
  MoreHorizontal
} from 'lucide-react';
import imgMessages from '../../../assets/Athenalms/message.png';

const CommunityEngagement = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Refined Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* --- LEFT SIDE: THE PITCH --- */}
          <div className="lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
              <MessageCircle size={14} />
              <span>Instant Connectivity</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-[#001D3D] leading-tight mb-8 tracking-tighter">
              Community-Driven <br />
              <span className="text-blue-600">Learning Experience.</span>
            </h2>

            <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
              Athena LMS transforms passive learning into active collaboration. 
              <span className="text-[#001D3D] block mt-2 font-bold italic">
                Higher engagement leads to higher completion rates.
              </span>
            </p>

            <div className="grid grid-cols-1 gap-4 mb-10">
              {[
                { icon: <Users size={20} />, text: "Study groups", desc: "Collaborative learning circles" },
                { icon: <MessageSquare size={20} />, text: "Private messaging", desc: "Secure 1-on-1 conversations" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#001D3D]">{item.text}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote with accent */}
            <div className="relative pl-6 border-l-4 border-blue-600">
               <p className="text-lg text-gray-600 italic">
                 "Learning becomes interactive, accountable, and engaging."
               </p>
            </div>
          </div>

          {/* --- RIGHT SIDE: FEATURED MESSAGE INTERFACE --- */}
          <div className="lg:w-7/12 relative">
            <div className="relative z-10 group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] blur-2xl group-hover:opacity-100 transition-opacity" />
              
              <div className="relative bg-white border border-blue-100 rounded-[2.5rem] shadow-2xl overflow-hidden">
                {/* Custom Toolbar for the Image */}
                <div className="bg-white px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#001D3D] uppercase tracking-wider">Direct Messenger</h4>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">System Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-slate-300">
                    <MoreHorizontal size={20} />
                  </div>
                </div>

                {/* THE FULL IMAGE */}
                <div className="bg-slate-50 p-4">
                  <img 
                    src={imgMessages} 
                    alt="Athena Direct Messaging Interface" 
                    className="w-full h-auto rounded-2xl shadow-sm border border-white object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Mock Bottom Input Bar to frame the image */}
                <div className="p-6 bg-white border-t border-slate-50 flex gap-4">
                  <div className="flex-1 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-4 text-slate-300 text-sm italic">
                    Type a message to your cohort...
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Send size={18} />
                  </div>
                </div>
              </div>

             
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default CommunityEngagement;