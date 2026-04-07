import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/UserContext';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { userProfile, isLoading: isUserLoading, error: userError } = useUser();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [profileGraceExpired, setProfileGraceExpired] = useState(false);

  useEffect(() => {
    // Additional check to ensure we have both auth and user data loaded
    if (!isAuthLoading && !isUserLoading) {
      setIsCheckingAuth(false);
    }
  }, [isAuthLoading, isUserLoading]);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isCheckingAuth || isAuthLoading || isUserLoading) {
        console.error('[ProtectedRoute] Loading timeout - forcing logout');
        setLoadingTimeout(true);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [isCheckingAuth, isAuthLoading, isUserLoading]);

  // Grace period: when authenticated but userProfile is still null (being fetched),
  // wait up to 5 seconds before treating it as an error.
  useEffect(() => {
    if (isAuthenticated && !userProfile && !isUserLoading && !userError) {
      // Profile is null but no error and not loading — profile fetch may not have started yet
      const graceTimer = setTimeout(() => {
        setProfileGraceExpired(true);
      }, 5000);

      return () => clearTimeout(graceTimer);
    }

    // Reset grace period if profile loads or user starts loading again
    if (userProfile || isUserLoading) {
      setProfileGraceExpired(false);
    }
  }, [isAuthenticated, userProfile, isUserLoading, userError]);

  // Listen for logout events
  useEffect(() => {
    const handleLogout = () => {
      console.log(
        '[ProtectedRoute] Logout event detected, redirecting to login'
      );
      setIsCheckingAuth(false);
    };

    window.addEventListener('userLoggedOut', handleLogout);
    return () => window.removeEventListener('userLoggedOut', handleLogout);
  }, []);

  // If loading timeout or user error, redirect to login
  if (loadingTimeout || userError) {
    console.error(
      '[ProtectedRoute] Timeout or error detected, clearing session and redirecting'
    );
    localStorage.clear();
    sessionStorage.clear();
    return (
      <Navigate
        to="/login"
        state={{ from: location, reason: 'session_expired' }}
        replace
      />
    );
  }

  // Show loading while checking authentication
  if (isCheckingAuth || isAuthLoading || isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div
          className="text-center"
          role="status"
          aria-live="polite"
          aria-busy="true"
          data-testid="auth-loader"
        >
          <div className="relative mx-auto mb-6 h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-blue-600/90 border-t-transparent motion-safe:animate-spin"></div>
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-sm animate-ping"></div>
          </div>
          <p className="text-gray-800 font-medium">Verifying your access…</p>
          <p className="mt-1 text-sm text-gray-600 animate-pulse">
            Fetching your profile and permissions
          </p>
          <div className="mt-6 mx-auto h-1 w-40 overflow-hidden rounded-full bg-blue-200/60">
            <div className="h-full w-1/2 bg-blue-600/80 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user profile is not loaded yet (still being fetched after login),
  // show the loading spinner instead of an error — this prevents the
  // "Authentication Error" flash that happens during the race condition
  // between AuthContext (sets isAuth=true immediately) and UserContext
  // (fetches profile asynchronously).
  if (!userProfile && !profileGraceExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div
          className="text-center"
          role="status"
          aria-live="polite"
          aria-busy="true"
          data-testid="profile-loader"
        >
          <div className="relative mx-auto mb-6 h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-blue-600/90 border-t-transparent motion-safe:animate-spin"></div>
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-sm animate-ping"></div>
          </div>
          <p className="text-gray-800 font-medium">Loading your profile…</p>
          <p className="mt-1 text-sm text-gray-600 animate-pulse">
            Just a moment
          </p>
        </div>
      </div>
    );
  }

  // If user profile is truly not loaded after the grace period, show error
  if (!userProfile) {
    console.error('User profile not found despite being authenticated');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Authentication Error
          </h2>
          <p className="text-gray-600 mb-4">
            Unable to load user profile. Please try logging in again.
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Check if user has required roles
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role =>
      userProfile.roles?.includes(role)
    );

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
