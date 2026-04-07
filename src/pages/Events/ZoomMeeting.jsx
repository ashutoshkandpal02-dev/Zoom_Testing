import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getZoomSignature } from './services/calendarEventApiService';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';

const ZoomMeeting = () => {
  const { meetingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile } = useUser();
  const { password } = location.state || {};

  // ✅ FIXED template string
  const userName = userProfile
    ? `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() || 'Participant'
    : 'Participant';

  const userEmail = userProfile?.email || '';
  const userIdStr = userProfile?.id?.toString() || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const joiningRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Load Zoom CSS dynamically
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "https://source.zoom.us/3.1.6/css/bootstrap.css";

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://source.zoom.us/3.1.6/css/react-select.css";

    document.head.appendChild(link1);
    document.head.appendChild(link2);

    joinMeeting();

    return () => {
      document.body.style.overflow = '';
      const zoomRoot = document.getElementById('zmmtg-root');
      if (zoomRoot) {
        zoomRoot.style.display = 'none';
      }
    };
  }, [meetingId]);

  const joinMeeting = async () => {
    if (joiningRef.current) return;
    joiningRef.current = true;

    setLoading(true);
    setError(null);

    try {
      // ✅ Dynamic import (good optimization)
      const { ZoomMtg } = await import("@zoom/meetingsdk");

      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();

      const userRoles = userProfile?.user_roles?.map(r => r.role) || [];
      const isHostRole =
        userRoles.includes('admin') || userRoles.includes('instructor');

      const roleValue = isHostRole ? 1 : 0;

      const { signature, sdkKey } = await getZoomSignature(
        meetingId,
        roleValue
      );

      const joinTimeout = setTimeout(() => {
        setError('Joining timed out. Please try again.');
        setLoading(false);
        joiningRef.current = false;
      }, 30000);

      ZoomMtg.init({
        leaveUrl: window.location.origin + '/dashboard/events',
        disablePreview: true,
        success: () => {
          ZoomMtg.join({
            signature,
            meetingNumber: meetingId,
            userName,
            userEmail,
            customerKey: userIdStr,
            sdkKey,
            passWord: password || '',
            success: () => {
              clearTimeout(joinTimeout);
              setLoading(false);
            },
            error: (err) => {
              clearTimeout(joinTimeout);

              // ✅ FIXED template string
              setError(`Failed to join: ${JSON.stringify(err)}`);

              setLoading(false);
              joiningRef.current = false;
            }
          });
        },
        error: (err) => {
          clearTimeout(joinTimeout);

          // ✅ FIXED template string
          setError(`Initialization failed: ${JSON.stringify(err)}`);

          setLoading(false);
          joiningRef.current = false;
        }
      });

    } catch (err) {
      setError('Could not connect to Zoom service. ' + err.message);
      setLoading(false);
      joiningRef.current = false;
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard/events');
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white">

      {loading && (
        <div className="flex flex-col items-center gap-4 text-center p-6 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <div>
            <h2 className="text-xl font-bold mb-1">Preparing Zoom Meeting</h2>
            <p className="text-zinc-400 text-sm">Initializing connection...</p>
          </div>
          <Button
            variant="ghost"
            className="mt-2 text-zinc-500 hover:text-white"
            onClick={handleGoBack}
          >
            Cancel and go back
          </Button>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center gap-6 max-w-md w-full p-8 bg-zinc-900 rounded-2xl shadow-2xl border border-red-900/30 text-center">
          <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mb-2">
            <ArrowLeft className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              Join Failed
            </h2>
            <p className="text-zinc-300 mb-4">{error}</p>
          </div>

          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              onClick={handleGoBack}
            >
              Go Back
            </Button>

            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                joiningRef.current = false;
                setError(null);
                joinMeeting();
              }}
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      <div id="zmmtg-root" />
    </div>
  );
};

export default ZoomMeeting;