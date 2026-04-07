import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  BookOpen,
  Award,
  MonitorPlay,
  Clock,
  TrendingUp,
  Users,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CourseCard from '@/components/dashboard/CourseCard';
import SponsorBanner from '@/components/sponsorAds/SponsorBanner';
import SponsorSidebarAd from '@/components/sponsorAds/SponsorSidebarAd';
import DashboardCalendar from '@/components/dashboard/DashboardCalendar';
import ProgressStats, {
  StatCardsSection,
  DetailedProgressSection,
  SkeletonCard,
  SkeletonProgress,
  SkeletonModule
} from '@/components/dashboard/ProgressStats';
import { fetchUserProgressOverview } from '@/services/progressService';

import { useUser } from '@/contexts/UserContext';
import { useCourses } from '@/contexts/CoursesContext';
import { useSponsorAds } from '@/contexts/SponsorAdsContext';
import { getCourseTrialStatus } from '@/utils/trialUtils';

const DashboardTopSection = ({ isWinter }) => {

  const { userProfile } = useUser();
  const { userCourses: coursesFromContext, isLoading: coursesLoading, error: coursesError } = useCourses();
  const userName = useMemo(() => {
    if (!userProfile) return '';
    return (
      `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() ||
      userProfile.email ||
      'User'
    );
  }, [userProfile]);

  const [error, setError] = useState(null);
  const handleRetry = () => window.location.reload();
  const courseSectionTitle = 'My Courses';

  // Process courses for display with trial status and image
  const userCourses = useMemo(() => {
    return coursesFromContext.map(course => ({
      ...course,
      modulesCount: course._count?.modules || 0,
      trialStatus: getCourseTrialStatus(course),
      image:
        course.thumbnail ||
        course.image ||
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    }));
  }, [coursesFromContext]);

  // Set error if courses context has error
  useEffect(() => {
    if (coursesError) {
      setError('Failed to load courses');
    }
  }, [coursesError]);

  /* =========================
     PROGRESS LOGIC (MOVED)
  ========================= */
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressData, setProgressData] = useState(null);
  const [progressError, setProgressError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchProgress = async () => {
      if (!userProfile?.id) return;

      // Load cache
      const cached = sessionStorage.getItem("progress_overview");
      if (cached) {
        try {
          setProgressData(JSON.parse(cached));
          setProgressLoading(false);
        } catch { }
      }

      try {
        const freshData = await fetchUserProgressOverview();
        if (!ignore) {
          setProgressData(freshData);
          sessionStorage.setItem("progress_overview", JSON.stringify(freshData));
        }
      } catch (err) {
        if (!ignore && !cached) {
          setProgressError(err.message || "Unable to load progress data");
        }
      } finally {
        if (!ignore) {
          setProgressLoading(false);
        }
      }
    };

    fetchProgress();
    return () => { ignore = true; };
  }, [userProfile?.id]);

  const summary = progressData?.summary || {};
  const overall = progressData?.overall_completion || {};
  const achievements = progressData?.achievements || {};
  const currentCourse = progressData?.current_course;

  const clamp = (num, min, max) => Math.max(min, Math.min(num, max));
  const pendingModules = Math.max(0, (summary.modules?.total || 0) - (summary.modules?.completed || 0));

  const highlightStats = useMemo(() => [
    { icon: Users, label: "Courses", value: summary.courses?.enrolled || 0, subtext: `${summary.courses?.completed || 0} completed` },
    { icon: Briefcase, label: "Modules", value: summary.modules?.total || 0, subtext: `${summary.modules?.completed || 0} completed` },
    { icon: Clock, label: "Lessons", value: summary.lessons?.total || 0, subtext: `${summary.lessons?.completed || 0} completed` },
    { icon: TrendingUp, label: "Completion", value: `${clamp(overall.percentage || 0, 0, 100)}%`, subtext: "Overall progress" },
  ], [summary, overall]);

  /* =========================
     COURSE CAROUSEL
  ========================= */
  const courseScrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : true
  );

  useEffect(() => {
    const resize = () => setIsSmallScreen(window.innerWidth < 640);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const visibleCards = isSmallScreen ? 1 : 2;

  const handleScroll = dir => {
    const max = userCourses.length - visibleCards;
    const next = Math.max(0, Math.min(scrollIndex + dir, max));
    setScrollIndex(next);
    if (courseScrollRef.current) {
      const cardW = courseScrollRef.current.firstChild?.offsetWidth || 320;
      courseScrollRef.current.scrollTo({
        left: next * (cardW + 16),
        behavior: 'smooth',
      });
    }
  };

  const shimmerCardCount = Math.max(visibleCards, 2);

  const CourseShimmerCard = () => (
    <div className="h-[340px] rounded-2xl bg-gray-100 animate-pulse" />
  );

  /* =========================
     SPONSOR ADS
  ========================= */
  const { getActiveAdsByPlacement, refreshAds } = useSponsorAds();
  const [bannerCarouselIndex, setBannerCarouselIndex] = useState(0);
  const [sidebarCarouselIndex, setSidebarCarouselIndex] = useState(0);

  const dashboardBannerAds = useMemo(() =>
    getActiveAdsByPlacement('dashboard_banner'),
    [getActiveAdsByPlacement]
  );

  const dashboardSidebarAds = useMemo(() =>
    getActiveAdsByPlacement('dashboard_sidebar'),
    [getActiveAdsByPlacement]
  );

  useEffect(() => {
    if (dashboardBannerAds.length <= 1) return;
    const i = setInterval(
      () =>
        setBannerCarouselIndex(p =>
          p === dashboardBannerAds.length - 1 ? 0 : p + 1
        ),
      10000
    );
    return () => clearInterval(i);
  }, [dashboardBannerAds.length]);

  useEffect(() => {
    if (dashboardSidebarAds.length <= 1) return;
    const i = setInterval(
      () =>
        setSidebarCarouselIndex(p =>
          p === dashboardSidebarAds.length - 1 ? 0 : p + 1
        ),
      5500
    );
    return () => clearInterval(i);
  }, [dashboardSidebarAds.length]);

  /* =========================
     UI STYLES
  ========================= */
  const customScrollbarStyles = `
    .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
  `;

  // Sync scroll buttons when user scrolls manually
  const handleScrollSync = useCallback(() => {
    if (courseScrollRef.current) {
      const { scrollLeft } = courseScrollRef.current;
      const cardW = courseScrollRef.current.firstChild?.offsetWidth || 296;
      const gap = 16;
      const index = Math.round(scrollLeft / (cardW + gap));
      setScrollIndex(index);
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg border w-full border-gray-200 p-4 mb-4">
      <style>{customScrollbarStyles}</style>

      {/* ================= HEADER / PROGRESS OVERVIEW ================= */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Your Progress Overview
            </h3>
            <p className="text-sm text-gray-500">Real-time snapshot of your learning journey</p>
          </div>
        </div>

        {error && <div className="p-4 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-sm mb-4">{error}</div>}
        {progressError && <div className="p-4 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-sm mb-4">{progressError}</div>}

        {progressLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <StatCardsSection highlightStats={highlightStats} />
        )}
      </div>

      {/* ================= MAIN CONTENT GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6 relative z-0">

        {/* LEFT SECTION */}
        <div className="xl:col-span-8 space-y-6">

          {/* PROGRESS STATS DETAILS */}
          {progressLoading ? (
            <div className="w-full bg-white space-y-6 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 border border-gray-100 bg-gray-50 p-8 flex flex-col items-center w-full rounded-3xl">
                  <SkeletonProgress />
                </div>
                <div className="col-span-2 border border-gray-100 bg-white p-8 space-y-6 w-full rounded-3xl">
                  <SkeletonModule />
                </div>
              </div>
            </div>
          ) : (
            <DetailedProgressSection
              overall={overall}
              summary={summary}
              achievements={achievements}
              currentCourse={currentCourse}
              pendingModules={pendingModules}
            />
          )}

          {/* BANNERS */}
          {dashboardBannerAds.length > 0 && (
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${bannerCarouselIndex * 100}%)`,
                  }}
                >
                  {dashboardBannerAds.map((ad, index) => (
                    <div key={ad.id} className="w-full flex-shrink-0">
                      <SponsorBanner ad={ad} isActive={index === bannerCarouselIndex} />
                    </div>
                  ))}
                </div>
              </div>

              {dashboardBannerAds.length > 1 && (
                <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center gap-2">
                  {dashboardBannerAds.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setBannerCarouselIndex(index)}
                      className={`h-2 rounded-full transition-all ${index === bannerCarouselIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="xl:col-span-4 space-y-6">
          {/* Sidebar ads */}
          {dashboardSidebarAds.length > 0 && (
            <div className="relative overflow-hidden rounded-xl h-[250px]">
              <div
                className="flex flex-col transition-transform duration-500"
                style={{
                  transform: `translateY(-${sidebarCarouselIndex * 100}%)`,
                }}
              >
                {dashboardSidebarAds.map((ad) => (
                  <div key={ad.id} className="h-[250px]">
                    <SponsorSidebarAd ad={ad} />
                  </div>
                ))}
              </div>

              {dashboardSidebarAds.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {dashboardSidebarAds.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSidebarCarouselIndex(index)}
                      className={`h-1.5 rounded-full ${index === sidebarCarouselIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          <DashboardCalendar />
        </div>
      </div>

      {/* ================= MY COURSES ================= */}
      <div className="bg-white w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">{courseSectionTitle}</h2>
          <Button variant="outline" asChild>
            <Link to="/dashboard/courses" className="flex items-center gap-2">
              View all <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        {coursesLoading ? (
          <div className="flex gap-4 px-1 pb-1">
            {Array.from({ length: shimmerCardCount }).map((_, idx) => (
              <div key={idx} className="min-w-[296px]">
                <CourseShimmerCard />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            {scrollIndex > 0 && (
              <button
                onClick={() => handleScroll(-1)}
                className="hidden sm:flex absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <div
              ref={courseScrollRef}
              onScroll={handleScrollSync}
              className="flex gap-4 overflow-x-auto no-scrollbar px-1 pb-1 scroll-smooth"
            >
              {userCourses.length > 0 ? (
                userCourses.map((course) => (
                  <div key={course.id} className="min-w-[226px] max-w-[226px] flex-shrink-0">
                    <CourseCard course={course} {...course} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
                  You haven't enrolled in any courses yet.
                </div>
              )}
            </div>

            {scrollIndex < userCourses.length - visibleCards && userCourses.length > visibleCards && (
              <button
                onClick={() => handleScroll(1)}
                className="hidden sm:flex absolute right-[-24px] top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTopSection;
