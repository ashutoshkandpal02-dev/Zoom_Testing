import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { fetchUserCourses } from '@/services/courseService';
import { useUser } from '@/contexts/UserContext';

const CoursesContext = createContext();

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};

export const CoursesProvider = ({ children }) => {
  const [userCourses, setUserCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const isLoadingRef = useRef(false);
  const { userProfile } = useUser();

  // Recording course IDs to filter out
  const RECORDING_COURSE_IDS = [
    'a188173c-23a6-4cb7-9653-6a1a809e9914', // Become Private Recordings
    '7b798545-6f5f-4028-9b1e-e18c7d2b4c47', // Operate Private Recordings
    '199e328d-8366-4af1-9582-9ea545f8b59e', // Business Credit Recordings
    'd8e2e17f-af91-46e3-9a81-6e5b0214bc5e', // Private Merchant Recordings
    'd5330607-9a45-4298-8ead-976dd8810283', // Sovereignty 101 Recordings
    '814b3edf-86da-4b0d-bb8c-8a6da2d9b4df', // I Want Remedy Now Recordings
  ];

  const loadCourses = useCallback(async (forceRefresh = false) => {
    // Prevent duplicate calls
    if (isLoadingRef.current && !forceRefresh) {
      console.log('[CoursesContext] Already loading, skipping duplicate call');
      return;
    }

    // Check cache (5 minutes) unless force refresh
    if (!forceRefresh && lastFetchTime) {
      const now = Date.now();
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
      if (now - lastFetchTime < CACHE_DURATION) {
        console.log('[CoursesContext] Using cached courses data');
        return;
      }
    }

    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUserCourses();

      // Filter out recording courses
      const filteredData = data.filter(
        course => !RECORDING_COURSE_IDS.includes(course.id)
      );

      setUserCourses(filteredData);
      setLastFetchTime(Date.now());

      // Also cache in localStorage for DashboardHeader compatibility
      localStorage.setItem('enrolledCourses', JSON.stringify(filteredData));
      localStorage.setItem('enrolledCoursesTime', Date.now().toString());
    } catch (err) {
      console.error('[CoursesContext] Failed to load courses:', err);
      setError(err.message || 'Failed to load courses');
      setUserCourses([]);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [lastFetchTime]);

  // Load courses when user profile is available
  useEffect(() => {
    if (userProfile?.id) {
      // Try to load from cache first
      const cachedCourses = localStorage.getItem('enrolledCourses');
      const cachedTime = localStorage.getItem('enrolledCoursesTime');
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

      if (cachedCourses && cachedTime && !lastFetchTime) {
        if (Date.now() - Number(cachedTime) < CACHE_DURATION) {
          try {
            const parsed = JSON.parse(cachedCourses);
            console.log('[CoursesContext] Restored courses from cache');
            setUserCourses(parsed);
            setIsLoading(false);
            setLastFetchTime(Number(cachedTime));
            return; // Skip initial fetch
          } catch (e) {
            console.error('[CoursesContext] Failed to parse cached courses', e);
          }
        }
      }
      loadCourses();
    } else if (!isLoadingRef.current) {
      setIsLoading(false);
    }
  }, [userProfile?.id, loadCourses]);

  const refreshCourses = useCallback(() => {
    loadCourses(true);
  }, [loadCourses]);

  const value = {
    userCourses,
    isLoading,
    error,
    refreshCourses,
    loadCourses,
  };

  return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
};

