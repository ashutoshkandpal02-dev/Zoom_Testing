import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  CircleDot,
  Clock,
  Lock,
  TrendingUp,
  Users,
  ChevronRight,
} from "lucide-react";
import { fetchUserProgressOverview } from "@/services/progressService";
import { useUser } from "@/contexts/UserContext";

const clamp = (num, min, max) => Math.max(min, Math.min(num, max));


export function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 p-[2px] w-full">
      <div className="relative h-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-200 animate-pulse flex-shrink-0"></div>
          <div className="h-3 sm:h-4 w-full max-w-[60px] bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <div className="h-6 sm:h-7 md:h-8 w-full max-w-[80px] bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 sm:h-4 w-full max-w-[100px] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonProgress() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] aspect-square mb-3 sm:mb-4">
        <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
      <div className="h-3 sm:h-4 w-full max-w-[120px] sm:max-w-[140px] bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}

export function SkeletonModule() {
  return (
    <div className="space-y-2 sm:space-y-3 w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 w-full"
        >
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gray-200 animate-pulse w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0"></div>
            <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="h-3 sm:h-4 w-full max-w-[150px] sm:max-w-[200px] bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 sm:h-6 w-full max-w-[70px] sm:max-w-[80px] bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-2.5 sm:h-3 w-full bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export function useProgressData() {
  const { userProfile } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchProgressData = async () => {
      if (!userProfile?.id) return;

      setError(null);

      // 1️⃣ Load cache first (instant UI)
      const cached = sessionStorage.getItem("progress_overview");
      if (cached) {
        try {
          setData(JSON.parse(cached));
          setLoading(false);
        } catch { }
      }

      // 2️⃣ Always fetch fresh data
      try {
        console.time("progress_api");
        const freshData = await fetchUserProgressOverview();
        console.timeEnd("progress_api");

        if (!ignore) {
          setData(freshData);

          // update cache
          sessionStorage.setItem(
            "progress_overview",
            JSON.stringify(freshData)
          );
        }
      } catch (err) {
        if (!ignore && !cached) {
          setError(err.message || "Unable to load progress data");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchProgressData();

    return () => {
      ignore = true;
    };
  }, [userProfile?.id]);

  return { loading, error, data };
}

function CircularProgress({ value = 0, size = 180, stroke = 12 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = clamp(value, 0, 100);
  const offset = circumference - (clamped / 100) * circumference;

  const getMotivationalText = (percentage) => {
    if (percentage >= 90) return "Almost there!";
    if (percentage >= 75) return "Excellent progress!";
    if (percentage >= 50) return "Keep going!";
    if (percentage >= 25) return "Great start!";
    if (percentage > 0) return "You've got this!";
    return "Let's begin! 📚";
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      <div
        className="relative flex-shrink-0 w-full max-w-[180px] aspect-square"
        style={{ width: "100%", maxWidth: `${size}px` }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 drop-shadow-lg"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F3F4F6"
            strokeWidth={stroke}
            fill="transparent"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-none mb-1 sm:mb-2">
              {clamped}%
            </div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-wide text-gray-500 font-medium px-2">
              Overall completion
            </div>
          </motion.div>
        </div>
      </div>
      <motion.p
        className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-gray-700 text-center px-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {getMotivationalText(clamped)}
      </motion.p>
    </div>
  );
}

function SegmentedModuleBars({ modules = [], courseId }) {
  const navigate = useNavigate();
  const sortedModules = [...modules].sort((a, b) => {
    const aInProgress = a.progress > 0 && !a.completed;
    const bInProgress = b.progress > 0 && !b.completed;
    if (aInProgress && !bInProgress) return -1;
    if (!aInProgress && bInProgress) return 1;
    if (a.updated_at && b.updated_at) {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
    const aCompleted = a.completed;
    const bCompleted = b.completed;
    if (aCompleted && !bCompleted) return -1;
    if (!aCompleted && bCompleted) return 1;
    return 0;
  });

  const displayModules = sortedModules.slice(0, 3);

  const gridColsClass = useMemo(() => {
    if (displayModules.length === 1) return "md:grid-cols-1 lg:grid-cols-1";
    if (displayModules.length === 2) return "md:grid-cols-2 lg:grid-cols-2";
    return "md:grid-cols-3 lg:grid-cols-3";
  }, [displayModules.length]);

  console.log("displayModules", displayModules);

  return (
    <div className="w-full min-h-[120px]">
      <div className={`grid grid-cols-1 ${gridColsClass} gap-4 mb-6`}>
        {displayModules.map((m, index) => {
          const isCompleted = m.completed;
          const isInProgress = m.progress > 0 && !m.completed;
          const isPending = !isCompleted && m.progress === 0;

          const getProgressColor = () => {
            if (isCompleted) return "from-emerald-400 to-emerald-600";
            if (isInProgress) return "from-amber-400 to-orange-500";
            return "from-gray-300 to-gray-400";
          };

          const getBgColor = () => {
            if (isCompleted) return "bg-emerald-50 border-emerald-200";
            if (isInProgress) return "bg-amber-50 border-amber-200";
            return "bg-gray-50 border-gray-200";
          };

          const Icon = isCompleted
            ? CheckCircle2
            : isInProgress
              ? CircleDot
              : Lock;

          const moduleId = m.module_id || m.id;
          const handleModuleClick = () => {
            if (courseId && moduleId) {
              navigate(
                `/dashboard/courses/${courseId}/modules/${moduleId}/lessons`,
              );
            }
          };

          return (
            <motion.div
              key={m.module_id || m.id}
              className="relative w-full h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                onClick={handleModuleClick}
                className={`relative z-10 rounded-xl sm:rounded-2xl border p-4 sm:p-4 transition-all duration-300 hover:shadow-lg cursor-pointer w-full h-full ${getBgColor()}`}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div
                    className={`relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-sm flex-shrink-0 ${isCompleted
                      ? "bg-emerald-500"
                      : isInProgress
                        ? "bg-amber-500"
                        : "bg-gray-300"
                      }`}
                  >
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 text-white`} />
                    {isCompleted && (
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-600 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <h5 className="font-semibold text-gray-900 text-[10px] leading-tight break-words">
                        {m.title}
                      </h5>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        {isCompleted && (
                          <span className="text-[10px] sm:text-xs font-medium text-emerald-700 bg-emerald-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                            Completed
                          </span>
                        )}
                        {isInProgress && (
                          <span className="text-[10px] sm:text-xs font-medium text-amber-700 bg-amber-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                            In Progress
                          </span>
                        )}
                        {isPending && (
                          <span className="text-[10px] sm:text-xs font-medium text-gray-600 bg-gray-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative w-full">
                      <div className="h-2.5 sm:h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getProgressColor()} relative`}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${clamp(m.progress || 0, 0, 100)}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.2 + index * 0.1,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </motion.div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow-sm">
                          {clamp(m.progress || 0, 0, 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

  );
}

function StatCard({ icon: Icon, label, value, subtext, onClick }) {
  const getGradientColors = (label) => {
    switch (label) {
      case "Courses": return "from-violet-500 to-purple-600";
      case "Modules": return "from-blue-500 to-cyan-600";
      case "Lessons": return "from-emerald-500 to-teal-600";
      case "Completion": return "from-amber-500 to-orange-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getIconBgGradient = (label) => {
    switch (label) {
      case "Courses": return "from-violet-100 to-purple-100";
      case "Modules": return "from-blue-100 to-cyan-100";
      case "Lessons": return "from-emerald-100 to-teal-100";
      case "Completion": return "from-amber-100 to-orange-100";
      default: return "from-gray-100 to-gray-100";
    }
  };

  const getIconColor = (label) => {
    switch (label) {
      case "Courses": return "text-violet-600";
      case "Modules": return "text-blue-600";
      case "Lessons": return "text-emerald-600";
      case "Completion": return "text-amber-600";
      default: return "text-gray-600";
    }
  };

  return (
    <motion.div
      whileTap={onClick ? { scale: 0.97 } : {}}
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${getGradientColors(label)} p-[2px] w-full ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      style={{ height: "100%" }}
    >
      <div className="relative h-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 w-full overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3 flex-shrink-0">
          <div className={`relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br ${getIconBgGradient(label)} shadow-lg flex-shrink-0`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
            <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ${getIconColor(label)} relative z-10`} />
          </div>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-700 uppercase tracking-wide leading-tight">
            {label}
          </span>
        </div>
        <div className="space-y-1 sm:space-y-1.5 flex-1 flex flex-col justify-center items-center min-h-0">
          <motion.p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-none" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {value}
          </motion.p>
          <p className="text-[10px] sm:text-xs text-gray-600 font-medium leading-tight">
            {subtext}
          </p>
        </div>
        {onClick && (
          <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3">
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function StatCardsSection({ highlightStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full auto-rows-fr">
      {highlightStats.map((stat) => (
        <div key={stat.label} className="w-full min-w-0">
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}


export function ProgressOverviewCard({ overall, summary }) {
  return (
    <div className="border border-gray-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-2 sm:p-3 md:p-4 flex flex-col items-center shadow-lg w-full rounded-3xl h-full">
      <CircularProgress value={overall.percentage || 0} />

    </div>
  );
}



export function CourseProgressCard({ currentCourse, summary, pendingModules, achievements }) {
  const navigate = useNavigate();
  const courseId = currentCourse?.course_id || currentCourse?.id;
  const isInProgress = currentCourse?.status === "in-progress" || currentCourse?.modules_summary?.in_progress > 0 || currentCourse?.modules?.some((m) => m.progress > 0 && !m.completed);

  const handleCourseClick = () => {
    if (isInProgress && courseId) navigate(`/dashboard/courses/${courseId}`);
  };

  const completedModules = currentCourse?.modules_summary?.completed || 0;
  const totalModulesCount = currentCourse?.modules_summary?.total || 0;
  const courseProgress = totalModulesCount > 0 ? Math.round((completedModules / totalModulesCount) * 100) : 0;

  return (
    <div className="bg-white w-full overflow-hidden space-y-6 h-full">

      <div onClick={handleCourseClick} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 ${isInProgress && courseId ? "cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-xl" : ""}`}>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Current course</p>
          <div className="flex items-center gap-2">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 break-words leading-tight">{currentCourse?.course_title || "No course in progress"}</h4>
            {isInProgress && courseId && <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 text-right">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{courseProgress}%</div>
            <div className="text-xs text-gray-500 font-medium">Complete</div>
          </div>
          <div className="text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-100 font-medium whitespace-nowrap">
            {completedModules}/{totalModulesCount} modules
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm w-full mt-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center group">
            <p className="text-3xl font-bold text-gray-900 mb-2">{achievements?.credits_earned || 0}</p>
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Credits Earned</p>
          </div>
          <div className="text-center group">
            <p className="text-3xl font-bold text-amber-600 mb-2">{summary.modules?.in_progress || 0}</p>
            <p className="text-xs font-medium text-amber-700 uppercase tracking-wide">In-progress</p>
          </div>
          <div className="text-center group">
            <p className="text-3xl font-bold text-rose-600 mb-2">{pendingModules || 0}</p>
            <p className="text-xs font-medium text-rose-700 uppercase tracking-wide">Pending modules</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DetailedProgressSection({ overall, summary, achievements, currentCourse, pendingModules }) {
  return (
    <div>
      <SegmentedModuleBars modules={currentCourse?.modules || []} courseId={currentCourse?.course_id || currentCourse?.id} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex flex-col gap-4 h-full">
            <ProgressOverviewCard overall={overall} summary={summary} />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <CourseProgressCard currentCourse={currentCourse} summary={summary} pendingModules={pendingModules} achievements={achievements} />
        </div>
      </div>
    </div>
  );
}

export default function ProgressStats() {
  const { loading, error, data } = useProgressData();
  const navigate = useNavigate();
  const summary = data?.summary || {};
  const overall = data?.overall_completion || {};
  const achievements = data?.achievements || {};
  const currentCourse = data?.current_course;
  const pendingModules = Math.max(0, (summary.modules?.total || 0) - (summary.modules?.completed || 0));

  const highlightStats = [
    { icon: Users, label: "Courses", value: summary.courses?.enrolled || 0, subtext: `${summary.courses?.completed || 0} completed` },
    { icon: Briefcase, label: "Modules", value: summary.modules?.total || 0, subtext: `${summary.modules?.completed || 0} completed` },
    { icon: Clock, label: "Lessons", value: summary.lessons?.total || 0, subtext: `${summary.lessons?.completed || 0} completed` },
    { icon: TrendingUp, label: "Completion", value: `${clamp(overall.percentage, 0, 100) || 0}%`, subtext: "Overall progress" },
  ];

  if (loading) {
    return (
      <div className="w-full bg-white space-y-6 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 border border-gray-100 bg-gray-50 p-8 flex flex-col items-center w-full rounded-3xl"><SkeletonProgress /></div>
          <div className="col-span-2 border border-gray-100 bg-white p-8 space-y-6 w-full rounded-3xl"><SkeletonModule /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white space-y-6 overflow-hidden">
      <DetailedProgressSection overall={overall} summary={summary} achievements={achievements} currentCourse={currentCourse} pendingModules={pendingModules} />
    </div>
  );
}


