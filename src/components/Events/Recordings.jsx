import React, { useEffect, useState } from 'react';
import { Calendar, MonitorPlay, Play, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecordingEvents, getEventRecordings } from '@/pages/Events/services/calendarEventApiService';
import { useToast } from '@/hooks/use-toast';

/* ─── single blue palette ───────────────────────────────────── */
const P = {
  50:  '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  400: '#818cf8',
  600: '#4f46e5',
  800: '#3730a3',
};

/* ─── helpers ───────────────────────────────────────────────── */
const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/* ─── Skeleton ──────────────────────────────────────────────── */
const Skeleton = () => (
  <div className="flex flex-col gap-3">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.06 }}
        className="flex items-center gap-4 p-3 rounded-xl bg-white"
        style={{
          border: '1px solid #e5e7eb',
          borderLeft: `3px solid ${P[200]}`,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        <div className="w-[72px] h-12 rounded-lg animate-pulse flex-shrink-0" style={{ background: P[50] }} />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/5 rounded-lg bg-gray-100 animate-pulse" />
          <div className="h-5 w-24 rounded-full animate-pulse" style={{ background: P[50] }} />
        </div>
        <div className="h-3 w-24 rounded bg-gray-100 animate-pulse hidden sm:block" />
        <div className="h-8 w-20 rounded-lg animate-pulse flex-shrink-0" style={{ background: P[50] }} />
      </motion.div>
    ))}
  </div>
);

/* ─── Empty state ───────────────────────────────────────────── */
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <div
      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
      style={{ background: P[50], border: `1px solid ${P[100]}` }}
    >
      <MonitorPlay size={30} style={{ color: P[400] }} />
    </div>
    <h3 className="font-medium text-gray-800 text-base mb-1">No recordings found</h3>
    <p className="text-gray-400 text-sm max-w-xs">
      Try adjusting your filters to find recordings.
    </p>
  </motion.div>
);

/* ─── Recording Row ─────────────────────────────────────────── */
const RecordingRow = ({ recording, index, onWatch, isFetching }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group flex items-center gap-4 p-3 rounded-xl bg-white"
      style={{
        border: '1px solid #e5e7eb',
        borderLeft: `3px solid ${P[400]}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(55,138,221,0.11)';
        e.currentTarget.style.borderColor = P[200];
        e.currentTarget.style.borderLeftColor = P[600];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderColor = '#e5e7eb';
        e.currentTarget.style.borderLeftColor = P[400];
      }}
    >
      {/* thumbnail */}
      <div
        className="flex-shrink-0 rounded-lg overflow-hidden"
        style={{ width: 72, height: 48, background: P[50] }}
      >
        <img
          src={recording.thumbnail}
          alt={recording.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-medium text-gray-900 truncate mb-1.5">
          {recording.title}
        </h3>
        <span
          className="inline-flex items-center text-[11px] font-medium rounded-full px-2.5 py-0.5"
          style={{ background: P[50], color: P[600], border: `1px solid ${P[100]}` }}
        >
          {recording.course}
        </span>
      </div>

      {/* date */}
      <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-gray-400 flex-shrink-0">
        <Calendar size={12} style={{ color: P[400] }} />
        <span>{formatDate(recording.recordedDate)}</span>
      </div>

      {/* watch button */}
      <button
        onClick={onWatch}
        disabled={isFetching}
        className="flex-shrink-0 flex items-center gap-1.5 text-[12px] font-medium text-white rounded-lg px-3.5 py-2 transition-colors"
        style={{
          background: isFetching ? P[200] : P[600],
          cursor: isFetching ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => { if (!isFetching) e.currentTarget.style.background = P[800]; }}
        onMouseLeave={(e) => { if (!isFetching) e.currentTarget.style.background = P[600]; }}
      >
        {isFetching ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <>
            <Play size={12} fill="white" color="white" />
            Watch
          </>
        )}
      </button>
    </motion.div>
  );
};

/* ─── Main ──────────────────────────────────────────────────── */
const Recordings = ({ searchTerm = '', filters = { course: 'all', month: 'all' } }) => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingId, setFetchingId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      const events = await getRecordingEvents();
      const mappedRecordings = events.map((event) => ({
        id: event.id,
        title: event.title,
        course: event.eventCourses?.[0]?.course?.title || 'General Session',
        courseId: event.eventCourses?.[0]?.courseId || 'all',
        recordedDate: event.startTime,
        thumbnail:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop' || 'https://creditorappuniquebucket02082025.s3.us-east-1.amazonaws.com/lesson-resources%2F476d3076-1a0b-4aae-b8d0-819f51e753bb-logo_creditor.jpg',
      }));
      setRecordings(mappedRecordings);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load recordings.' });
    } finally {
      setLoading(false);
    }
  };

  const handleWatchRecording = async (eventId) => {
    try {
      setFetchingId(eventId);
      const files = await getEventRecordings(eventId);
      if (files?.length) {
        const videoFile =
          files.find((f) => f.fileType?.toLowerCase().includes('video')) || files[0];
        if (videoFile.recordingUrl) {
          window.open(videoFile.recordingUrl, '_blank');
        } else {
          toast({ title: 'Processing', description: 'Recording not ready yet.' });
        }
      } else {
        toast({ title: 'No recordings found' });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not open recording.' });
    } finally {
      setFetchingId(null);
    }
  };

  const filteredRecordings = recordings.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filters.course === 'all' || r.courseId === filters.course;
    const matchesMonth =
      filters.month === 'all' ||
      (new Date(r.recordedDate).getMonth()).toString() === filters.month;
    return matchesSearch && matchesCourse && matchesMonth;
  });

  if (loading)
    return (
      <div className="px-2 md:px-4">
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: `${P[400]} transparent transparent transparent` }}
          />
          <span className="text-sm text-gray-400 font-medium">Loading recordings…</span>
        </div>
        <Skeleton />
      </div>
    );

  return (
    <div className="px-2 md:px-4">
      {filteredRecordings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-5"
        >
          <span className="text-[12px] font-medium text-gray-400">
            {filteredRecordings.length} recording{filteredRecordings.length !== 1 ? 's' : ''}
          </span>
          <div className="h-px flex-1 bg-gray-100" />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {filteredRecordings.length === 0 ? (
          <EmptyState key="empty" />
        ) : (
          <motion.div key="list" className="flex flex-col gap-3">
            {filteredRecordings.map((recording, index) => (
              <RecordingRow
                key={recording.id}
                recording={recording}
                index={index}
                isFetching={fetchingId === recording.id}
                onWatch={() => handleWatchRecording(recording.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recordings;