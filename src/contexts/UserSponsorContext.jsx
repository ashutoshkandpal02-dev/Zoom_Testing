import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getUserAdApplications } from '@/services/sponsorAdsService';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const UserSponsorContext = createContext(null);

// Map backend position to frontend placement
const POSITION_TO_PLACEMENT = {
  DASHBOARD: 'dashboard_banner',
  SIDEBAR: 'dashboard_sidebar',
  COURSE_PLAYER: 'course_player_sidebar',
  COURSE_LISTING: 'course_listing_tile',
  POPUP: 'popup',
};

// Map backend status to frontend status
const normalizeStatus = status => {
  const statusMap = {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
  };
  return statusMap[status] || status || 'Pending';
};

// Normalize backend application to frontend ad format
const normalizeApplication = app => {
  const mediaUrl = app.video_url || app.image_url || '';
  const mediaType = app.video_url ? 'video' : 'image';

  // Extract stats from sponsor_ad if available (for approved ads)
  const sponsorAd = app.sponsor_ad || app.sponsorAd;
  const impressions = sponsorAd?.view_count ?? app.view_count ?? 0;
  const clicks = sponsorAd?.click_count ?? app.click_count ?? 0;

  return {
    id: app.id,
    sponsorName: app.sponsor_name || app.sponsorName,
    adTitle: app.title || app.adTitle,
    description: app.description || '',
    mediaUrl: mediaUrl,
    mediaType: mediaType,
    placement:
      POSITION_TO_PLACEMENT[app.preferred_position] ||
      app.placement ||
      'dashboard_banner',
    budget: app.budget || '',
    startDate: app.preferred_start_date || app.startDate || '',
    endDate: app.preferred_end_date || app.endDate || '',
    status: normalizeStatus(app.status),
    website: app.link_url || app.website || '',
    type: mediaType === 'video' ? 'Video' : 'Image',
    companyName: app.company_name,
    contactEmail: app.contact_email,
    contactPhone: app.contact_phone,
    additionalNotes: app.additional_notes,
    adminNotes: app.admin_notes,
    reviewedBy: app.reviewed_by,
    reviewedAt: app.reviewed_at,
    createdAt: app.created_at,
    updatedAt: app.updated_at,
    sponsorAdId: app.sponsor_ad_id,
    // Add stats from sponsor_ad
    impressions: Number(impressions) || 0,
    clicks: Number(clicks) || 0,
    view_count: Number(impressions) || 0,
    click_count: Number(clicks) || 0,
  };
};

export const UserSponsorProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();

  // Fetch user ad applications from backend
  const fetchApplications = useCallback(async () => {
    // Don't make API calls if user is not authenticated
    if (!isAuthenticated) {
      console.log('[UserSponsor] User not authenticated, skipping API call');
      setAds([]);
      setLoading(false);
      setError(null);
      return;
    }

    // Prevent multiple simultaneous calls
    if (isFetching) {
      console.log('[UserSponsor] Already fetching, skipping duplicate call');
      return;
    }

    try {
      setIsFetching(true);
      setLoading(true);
      setError(null);
      const applications = await getUserAdApplications();
      const normalizedAds = applications.map(normalizeApplication);
      setAds(normalizedAds);
      localStorage.setItem('user_sponsor_ads', JSON.stringify(normalizedAds));
      localStorage.setItem('user_sponsor_ads_time', Date.now().toString());
    } catch (err) {
      // Handle 401/403 errors gracefully - don't set error state
      // These are expected when user is not authenticated
      if (err.response?.status === 401 || err.response?.status === 403) {
        console.warn(
          '[UserSponsor] Unauthorized - user may not be authenticated, returning empty applications'
        );
        setAds([]);
        setError(null);
      } else {
        console.error('[UserSponsor] Failed to fetch applications:', err);
        setError(err.message);
        setAds([]);
      }
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [isFetching, isAuthenticated]);

  // Only call when authenticated and not yet loaded
  useEffect(() => {
    // Only fetch applications if we are explicitly on the 'my-ads' page
    // This prevents API calls on other pages
    const isAdsPage = location.pathname.includes('/my-ads');

    if (isAuthenticated && !hasInitialLoad && isAdsPage) {
      // Try to load from cache first
      const cachedAds = localStorage.getItem('user_sponsor_ads');
      const cachedTime = localStorage.getItem('user_sponsor_ads_time');
      const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

      if (cachedAds && cachedTime) {
        if (Date.now() - Number(cachedTime) < CACHE_DURATION) {
          try {
            const parsed = JSON.parse(cachedAds);
            console.log('[UserSponsor] Restored applications from cache');
            setAds(parsed);
            setLoading(false);
            setHasInitialLoad(true);
            return;
          } catch (e) {
            console.error('[UserSponsor] Failed to parse cached ads', e);
          }
        }
      }

      setHasInitialLoad(true);
      fetchApplications();
    } else if (!isAuthenticated) {
      // Reset state when user logs out
      setAds([]);
      setLoading(false);
      setError(null);
      setHasInitialLoad(false);
      localStorage.removeItem('user_sponsor_ads');
      localStorage.removeItem('user_sponsor_ads_time');
    }
  }, [isAuthenticated, hasInitialLoad, fetchApplications, location.pathname]); // Re-run when authentication status changes

  const addRequest = useCallback(() => {
    // Refresh applications after new request is submitted
    fetchApplications();
  }, [fetchApplications]);

  const updateAd = useCallback((id, updates) => {
    // Note: Updates are local only since backend doesn't support editing applications
    // In a real scenario, you might want to disable editing or create a new API endpoint
    setAds(prev => prev.map(ad => (ad.id === id ? { ...ad, ...updates } : ad)));
  }, []);

  const deleteAd = useCallback(async id => {
    // Note: Backend doesn't provide delete endpoint for applications
    // This is local only - you may want to disable this or add API endpoint
    setAds(prev => prev.filter(ad => ad.id !== id));
  }, []);

  const toggleAdStatus = useCallback(id => {
    // Note: Status toggling is handled by admin, not user
    // This is kept for UI compatibility but may not have backend support
    setAds(prev =>
      prev.map(ad => {
        if (ad.id !== id || ad.status === 'Rejected') return ad;
        if (ad.status === 'Approved') return { ...ad, status: 'Paused' };
        if (ad.status === 'Paused') return { ...ad, status: 'Approved' };
        return ad;
      })
    );
  }, []);

  const resubmitAd = useCallback(id => {
    // Note: Resubmission would require backend API endpoint
    // This is local only for now
    setAds(prev =>
      prev.map(ad => (ad.id === id ? { ...ad, status: 'Pending' } : ad))
    );
  }, []);

  const analytics = useMemo(() => {
    // Basic analytics from ads data
    const approvedAds = ads.filter(ad => ad.status === 'Approved');
    const pendingAds = ads.filter(ad => ad.status === 'Pending');
    const rejectedAds = ads.filter(ad => ad.status === 'Rejected');

    // Calculate totals from approved ads
    // Approved ads have sponsor_ad object with click_count and view_count
    const totals = approvedAds.reduce(
      (acc, ad) => {
        const impressions =
          Number(ad.impressions) || Number(ad.view_count) || 0;
        const clicks = Number(ad.clicks) || Number(ad.click_count) || 0;
        acc.impressions += impressions;
        acc.clicks += clicks;
        return acc;
      },
      { impressions: 0, clicks: 0 }
    );

    const ctr =
      totals.impressions > 0
        ? Number(((totals.clicks / totals.impressions) * 100).toFixed(2))
        : 0;

    // Prepare chart data
    const clicksPerAd = approvedAds.map(ad => ({
      id: ad.id,
      name: ad.adTitle || ad.title || 'Untitled',
      clicks: Number(ad.clicks) || Number(ad.click_count) || 0,
    }));

    // Generate timeline series (last 7 days)
    const timelineSeries = Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - idx));
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        impressions: Math.round(totals.impressions / 7), // Simplified distribution
      };
    });

    // Type distribution
    const typeCounts = approvedAds.reduce((acc, ad) => {
      const type = ad.mediaType || ad.type || 'image';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const typeDistributionSeries = Object.entries(typeCounts).map(
      ([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      })
    );

    return {
      totalImpressions: totals.impressions,
      totalClicks: totals.clicks,
      ctr,
      clicksPerAd,
      timelineSeries,
      typeDistributionSeries,
      activeAdsCount: approvedAds.length,
      pendingAdsCount: pendingAds.length,
      rejectedAdsCount: rejectedAds.length,
      totalAdsCount: ads.length,
    };
  }, [ads]);

  const value = useMemo(
    () => ({
      ads,
      analytics,
      loading,
      error,
      refreshApplications: fetchApplications,
      addRequest,
      updateAd,
      deleteAd,
      toggleAdStatus,
      resubmitAd,
    }),
    [
      ads,
      analytics,
      loading,
      error,
      fetchApplications,
      addRequest,
      updateAd,
      deleteAd,
      toggleAdStatus,
      resubmitAd,
    ]
  );

  return (
    <UserSponsorContext.Provider value={value}>
      {children}
    </UserSponsorContext.Provider>
  );
};

export const useUserSponsor = () => {
  const context = useContext(UserSponsorContext);
  if (!context) {
    throw new Error('useUserSponsor must be used within a UserSponsorProvider');
  }
  return context;
};
