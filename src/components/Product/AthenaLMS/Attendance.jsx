import React from 'react';
import { 
  CalendarCheck, 
  Activity,
  CheckCircle2,
  PieChart,
  Users,
  Search,
  ArrowUpRight,
  Download
} from 'lucide-react';
import imgAttendance from '../../../assets/Athenalms/attendance.png';

const AttendanceTracking = () => {
  const metrics = [
    { title: "Attendance percentage", icon: <PieChart size={18} />, color: "text-blue-600" },
    { title: "Days present vs absent", icon: <CalendarCheck size={18} />, color: "text-indigo-600" },
    { title: "Course completion", icon: <CheckCircle2 size={18} />, color: "text-emerald-600" },
    { title: "Progress breakdown", icon: <Activity size={18} />, color: "text-orange-600" },
    { title: "Overall performance metrics", icon: <Users size={18} />, color: "text-purple-600" }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#001D3D 1px, transparent 1px), linear-gradient(90deg, #001D3D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
              <Activity size={12} />
              <span>Intelligence Hub</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-[#001D3D] leading-tight tracking-tighter">
              Performance & <br /> Attendance <span className="text-blue-600 italic">Intelligence.</span>
            </h2>
          </div>
          <div className="lg:max-w-sm">
             <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Athena LMS provides real-time visibility into learner performance. 
              <span className="text-blue-600 font-bold"> Instructors gain actionable insights</span> — not just raw data.
            </p>
          </div>
        </div>

        {/* --- MAIN BENTO GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: MAIN DATA VIEW (8/12 Cols) */}
          <div className="lg:col-span-8 group">
            <div className="relative bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-blue-200">
              
              {/* Top Bar with 'File Tabs' look */}
              <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-t-xl border-x border-t border-slate-200 -mb-5 relative z-10">
                    <Search size={14} className="text-blue-600" />
                    <span className="text-[10px] font-black text-[#001D3D] uppercase tracking-tighter">Attendance_Report.v2</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="hidden md:block w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-blue-600 animate-pulse" />
                   </div>
                   <span className="text-[10px] font-black text-emerald-500">LIVE SYNCING</span>
                </div>
              </div>

              {/* IMAGE WRAPPER */}
              <div className="p-4 bg-slate-50/30">
                <div className="rounded-2xl overflow-hidden border border-white shadow-inner">
                  <img 
                    src={imgAttendance} 
                    alt="Attendance Tracking Dashboard" 
                    className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-[1.03]" 
                  />
                </div>
              </div>

              {/* Bottom Quick Stats */}
              <div className="px-8 py-4 bg-white border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 tracking-widest uppercase">
                <span>Total Learners: 1,284</span>
                <span>Last Updated: 2m ago</span>
              </div>
            </div>
          </div>

          {/* RIGHT: INSIGHT CARDS (4/12 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {metrics.map((item, i) => (
              <div key={i} className="group relative bg-white p-5 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-lg hover:border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-[#001D3D] font-black text-sm tracking-tight">{item.title}</span>
                </div>
                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default AttendanceTracking;