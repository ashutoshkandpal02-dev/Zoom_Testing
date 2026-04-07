import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  fetchUserProfile,
  setUserRole,
  setUserRoles,
} from '@/services/userService';
import Cookies from 'js-cookie';
import { refreshAvatarFromBackend } from '@/lib/avatar-utils';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadAttempted, setLoadAttempted] = useState(false); // Flag to prevent duplicate loads
  const [lastLoadTime, setLastLoadTime] = useState(null); // Track last load time to prevent rapid retries
  const userProfileRef = useRef(null); // Ref to track userProfile without causing re-renders
  const isLoadingRef = useRef(false); // Ref to track loading state without causing re-renders

  // Define loadUserProfile before useEffects that use it
  const loadUserProfile = useCallback(async () => {
    try {
      // Prevent duplicate calls within 5 seconds
      const now = Date.now();
      if (loadAttempted && lastLoadTime && (now - lastLoadTime) < 5000) {
        console.log('[UserContext] Skipping duplicate loadUserProfile call (within 5s debounce)');
        return;
      }

      // Prevent concurrent calls - if already loading, skip
      if (isLoadingRef.current) {
        console.log('[UserContext] Already loading, skipping duplicate call');
        return;
      }

      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);
      setLoadAttempted(true);
      setLastLoadTime(now);

      // Check if user is authenticated before making API calls
      const token =
        localStorage.getItem('authToken') ||
        localStorage.getItem('token') ||
        Cookies.get('accesstoken');
      if (!token) {
        setUserProfile(null);
        isLoadingRef.current = false;
        setIsLoading(false);
        return;
      }

      // Try to fetch user profile
      const data = await fetchUserProfile();
      setUserProfile(data);
      localStorage.setItem('userProfile', JSON.stringify(data));
      localStorage.setItem('userProfileTime', Date.now().toString());
      // Store user ID with cache to validate when different user logs in
      if (data.id || data.user_id) {
        localStorage.setItem('userProfile_userId', data.id || data.user_id);
      }

      // Set user role based on profile data
      if (Array.isArray(data.user_roles) && data.user_roles.length > 0) {
        const roles = data.user_roles.map(roleObj => roleObj.role);
        const priorityRoles = ['admin', 'instructor', 'user'];
        const highestRole =
          priorityRoles.find(role => roles.includes(role)) || 'user';

        console.log(
          'UserContext: Setting user role to:',
          highestRole,
          'from roles:',
          roles
        );
        setUserRole(highestRole);

        // Dispatch event to notify other components about role change
        window.dispatchEvent(new Event('userRoleChanged'));
      } else {
        // Default to user role if no roles found
        console.log('UserContext: No user_roles found, defaulting to user');
        setUserRole('user');
      }

      // Only load avatar if not already in localStorage (prevents unnecessary API calls)
      const existingAvatar = localStorage.getItem('userAvatar');
      if (!existingAvatar) {
        try {
          await refreshAvatarFromBackend();
        } catch (error) {
          console.warn('Failed to load avatar:', error);
          // Don't retry on failure - just log the warning
        }
      } else {
        console.log('[UserContext] Avatar already in localStorage, skipping getProfileAvatar call');
      }
    } catch (err) {
      console.error('Failed to load user profile:', err);
      setError(err.message);
      setUserProfile(null);
      // Don't reset loadAttempted to prevent infinite retries on failure

      // Check if this is an authentication error
      const status = err.response?.status;
      const isAuthError = status === 401 || status === 403;

      // Also check for 500 errors that might be auth-related
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        '';
      const is500AuthError =
        status === 500 &&
        (errorMessage.toLowerCase().includes('token') ||
          errorMessage.toLowerCase().includes('auth') ||
          errorMessage.toLowerCase().includes('unauthorized') ||
          errorMessage.toLowerCase().includes('jwt'));

      if (isAuthError || is500AuthError) {
        console.warn(
          '[UserContext] Authentication error detected, clearing session and redirecting to login'
        );

        // Clear all auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        Cookies.remove('accesstoken');
        Cookies.remove('Access-Token');
        Cookies.remove('userId');

        // Dispatch logout event
        window.dispatchEvent(new CustomEvent('userLoggedOut'));

        // Redirect to login after a short delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
      }
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [loadAttempted, lastLoadTime]); // Memoize with dependencies

  // Update ref whenever userProfile changes (for use in event handlers)
  useEffect(() => {
    userProfileRef.current = userProfile;
  }, [userProfile]);

  // Fetch user profile on mount only if authenticated
  useEffect(() => {
    // Try to load from cache first
    const cachedProfile = localStorage.getItem('userProfile');
    const cachedTime = localStorage.getItem('userProfileTime');
    const cachedUserId = localStorage.getItem('userProfile_userId');
    const currentUserId = localStorage.getItem('userId');
    const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes for profile

    if (cachedProfile && cachedTime && cachedUserId === currentUserId) {
      if (Date.now() - Number(cachedTime) < CACHE_DURATION) {
        try {
          const parsed = JSON.parse(cachedProfile);
          console.log('[UserContext] Restored user profile from cache');
          setUserProfile(parsed);
          setIsLoading(false);
          setLoadAttempted(true);
          setLastLoadTime(Number(cachedTime));
          return; // Skip initial fetch if cache is valid
        } catch (e) {
          console.error('[UserContext] Failed to parse cached profile', e);
        }
      }
    }

    // Check if user is authenticated before making API calls
    const token =
      localStorage.getItem('authToken') ||
      localStorage.getItem('token') ||
      Cookies.get('accesstoken');
    if (token) {
      loadUserProfile();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for authentication changes
  useEffect(() => {
    const handleAuthChange = () => {
      // Only fetch if authenticated and no existing profile
      // Use ref to check current userProfile without causing re-renders
      const token =
        localStorage.getItem('authToken') ||
        localStorage.getItem('token') ||
        Cookies.get('accesstoken');
      if (token && !userProfileRef.current) {
        loadUserProfile();
      }
    };

    const handleUserLoggedIn = () => {
      // Add small delay to ensure token is properly stored before making API calls
      setTimeout(() => {
        loadUserProfile();
      }, 100);
    };

    const handleUserLoggedOut = () => {
      setUserProfile(null);
      isLoadingRef.current = false;
      setIsLoading(false);
      // Clear profile cache on logout
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userProfileTime');
      localStorage.removeItem('userProfile_userId');
      // Reset flags for next login
      setLoadAttempted(false);
      setLastLoadTime(null);
    };

    // Listen for custom events
    window.addEventListener('userRoleChanged', handleAuthChange);
    window.addEventListener('userLoggedIn', handleUserLoggedIn);
    window.addEventListener('userLoggedOut', handleUserLoggedOut);

    return () => {
      window.removeEventListener('userRoleChanged', handleAuthChange);
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
      window.removeEventListener('userLoggedOut', handleUserLoggedOut);
    };
  }, [loadUserProfile]); // Include loadUserProfile in dependencies since it's memoized

  const updateUserProfile = updatedProfile => {
    setUserProfile(updatedProfile);

    // Also update localStorage for consistency
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

    // Dispatch a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent('userProfileUpdated', {
        detail: updatedProfile,
      })
    );
  };

  const refreshUserProfile = async () => {
    // Reset flags to allow manual refresh
    setLoadAttempted(false);
    setLastLoadTime(null);
    await loadUserProfile();
  };

  const value = {
    userProfile,
    isLoading,
    error,
    updateUserProfile,
    refreshUserProfile,
    loadUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
