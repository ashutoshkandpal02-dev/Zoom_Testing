import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  CreditCard, 
  ChevronRight, 
  PieChart, 
  Bell 
} from 'lucide-react';
import img1 from '../../../assets/Athenalms/maindash.png'
import img2 from '../../../assets/Athenalms/creditpopup.png'
import img3 from '../../../assets/Athenalms/performance.png'

const DashboardOverview = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT SIDE: CONTENT --- */}
          <div className="lg:w-2/5 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
              <LayoutDashboard size={14} />
              <span>Unified Ecosystem</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-[#001D3D] leading-tight mb-8 tracking-tighter">
              Complete Learning <br />
              <span className="text-blue-600">Command Center.</span>
            </h2>

            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
              Athena LMS provides a centralized dashboard where learners and instructors can track progress, 
              monitor performance, manage credits, and stay informed — <span className="text-[#001D3D] font-bold">all in real time.</span>
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50 hover:bg-white hover:shadow-xl hover:shadow-blue-100 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#001D3D]">Performance Analytics</h4>
                  <p className="text-sm text-gray-500">Real-time data visualization of course completion and engagement.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50 hover:bg-white hover:shadow-xl hover:shadow-blue-100 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#001D3D]">Credit Management</h4>
                  <p className="text-sm text-gray-500">Intelligent tracking of certifications and professional credits.</p>
                </div>
              </div>
            </div>

            <p className="mt-10 text-gray-400 italic text-sm border-l-2 border-blue-200 pl-4">
              "From course completion tracking to performance analytics and credit management, 
              everything is accessible in one intelligent interface."
            </p>
          </div>

          {/* --- RIGHT SIDE: 3-IMAGE LAYOUT (FULL ASPECT) --- */}
          <div className="lg:w-3/5 w-full order-1 lg:order-2">
            <div className="flex flex-col gap-6">
              
              {/* LARGE MAIN IMAGE (Main Dashboard) */}
              <div className="relative group w-full">
                <div className="absolute inset-0 bg-blue-600/5 rounded-[2rem] translate-y-2 translate-x-2" />
                <div className="relative bg-white rounded-[2rem] shadow-2xl border border-blue-100 overflow-hidden">
                  <div className="bg-slate-50 px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Athena Interface Main</span>
                  </div>
                  {/* object-contain ensures the full image is shown */}
                  <img 
                    src={img1}
                    alt="Main Dashboard Welcome Screen" 
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                  
                  {/* Floating Notification Badge */}
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow border border-blue-50">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Bell size={16} />
                    </div>
                    <span className="text-xs font-bold text-gray-800">System Live</span>
                  </div>
                </div>
              </div>

              {/* BOTTOM TWO IMAGES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Credit Popup Full Image */}
                <div className="bg-white rounded-[2rem] shadow-xl border border-blue-100 overflow-hidden flex flex-col group transition-all hover:shadow-blue-100">
                   <div className="p-4 bg-slate-50 border-b border-gray-100 flex items-center gap-2">
                      <PieChart size={14} className="text-blue-600" />
                      <span className="text-[10px] font-black uppercase text-gray-400">Credit Management</span>
                   </div>
                   <div className="p-2">
                    <img 
                      src={img2}
                      alt="Credit Management Popup" 
                      className="w-full h-auto object-contain rounded-xl"
                    />
                   </div>
                </div>

                {/* Performance Full Image */}
                <div className="bg-white rounded-[2rem] shadow-xl border border-blue-100 overflow-hidden flex flex-col group transition-all hover:shadow-blue-100">
                   <div className="p-4 bg-slate-50 border-b border-gray-100 flex items-center gap-2">
                      <Activity size={14} className="text-emerald-500" />
                      <span className="text-[10px] font-black uppercase text-gray-400">Performance Metrics</span>
                   </div>
                   <div className="p-2">
                    <img 
                      src={img3}
                      alt="Real-time Performance Stats" 
                      className="w-full h-auto object-contain rounded-xl"
                    />
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
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default DashboardOverview;