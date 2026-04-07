import React, { useEffect, useState } from 'react';
import { getUpcomingEvents } from '../../pages/Events/services/calendarEventApiService';
import { Calendar, Clock, Video, Repeat, Zap, CalendarX } from 'lucide-react';
import { expandRecurringEvents } from '../../pages/Events/utils/eventUtils';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── helpers ───────────────────────────────────────────────── */
const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const formatTime = (d) =>
  new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const getDayNum  = (d) => new Date(d).getDate();
const getDayName = (d) => new Date(d).toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();
const getMonth   = (d) => new Date(d).toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();

/* ─── single blue palette ───────────────────────────────────── */
const P = {
  50:  '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  400: '#818cf8',
  600: '#4f46e5',
  800: '#3730a3',
};

/* ─── Skeleton ──────────────────────────────────────────────── */
const Skeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.07 }}
        className="rounded-xl bg-white"
        style={{
          border: '1px solid #e5e7eb',
          borderLeft: `3px solid ${P[200]}`,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        <div className="p-5 space-y-4">
          <div className="flex justify-between">
            <div className="space-y-2 flex-1 mr-4">
              <div className="h-4 bg-gray-100 rounded-lg w-4/5 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded-lg w-3/5 animate-pulse" />
            </div>
            <div className="w-10 h-10 rounded-xl animate-pulse" style={{ background: P[50] }} />
          </div>
          <div className="flex gap-2">
            <div className="h-5 w-12 rounded-full animate-pulse" style={{ background: P[50] }} />
            <div className="h-5 w-20 rounded-full bg-gray-100 animate-pulse" />
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg animate-pulse" style={{ background: P[50] }} />
            <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg animate-pulse" style={{ background: P[50] }} />
            <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="h-10 bg-gray-100 rounded-xl animate-pulse mt-2" />
        </div>
      </motion.div>
    ))}
  </div>
);

/* ─── Empty state ───────────────────────────────────────────── */
const EmptyState = ({ hasEvents }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <div className="relative mb-6">
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center"
        style={{ background: P[50], border: `1px solid ${P[100]}` }}
      >
        <CalendarX size={36} style={{ color: P[400] }} />
      </div>
      <motion.div
        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
        style={{ background: P[600] }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <Zap size={13} className="text-white" />
      </motion.div>
    </div>
    <h3 className="font-medium text-gray-800 text-xl mb-2">
      {hasEvents ? 'No sessions match your filters' : 'All clear for now!'}
    </h3>
    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
      {hasEvents
        ? 'Try adjusting your search or filter options to find sessions.'
        : 'No upcoming events scheduled yet. Check back soon!'}
    </p>
  </motion.div>
);

/* ─── Live pulse dot ────────────────────────────────────────── */
const LiveDot = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
  </span>
);

/* ─── Event Card ────────────────────────────────────────────── */
const EventCard = ({ event, index, status, recurringLabel, shouldShowJoin, onJoin }) => {
  const isLive = status === 'LIVE';
  const canJoin = shouldShowJoin(event.startTime, event.endTime);
  const hasLink = !!event.meetingId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.015 }}
      className="group relative rounded-xl overflow-hidden bg-white flex flex-col"
      style={{
        border: isLive ? '1px solid #ef4444' : `1px solid #e5e7eb`,
        borderLeft: isLive ? `3px solid #ef4444` : `3px solid ${P[400]}`,
        boxShadow: isLive
          ? '0 0 0 0 transparent, 0 4px 20px rgba(239,68,68,0.15)'
          : '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!isLive) {
          e.currentTarget.style.boxShadow = `0 8px 28px rgba(55,138,221,0.14)`;
          e.currentTarget.style.borderColor = P[200];
          e.currentTarget.style.borderLeftColor = P[600];
        }
      }}
      onMouseLeave={(e) => {
        if (!isLive) {
          e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
          e.currentTarget.style.borderColor = '#e5e7eb';
          e.currentTarget.style.borderLeftColor = P[400];
        }
      }}
    >
      <div className="p-5 flex flex-col flex-1">
        {/* header */}
        <div className="flex items-start gap-3 mb-4">
          {/* date badge */}
          <div
            className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg px-3 py-2 min-w-[52px]"
            style={{ background: P[50] }}
          >
            <span className="text-[9px] font-semibold tracking-widest" style={{ color: P[600] }}>
              {getDayName(event.startTime)}
            </span>
            <span className="text-2xl font-medium leading-none" style={{ color: P[800] }}>
              {getDayNum(event.startTime)}
            </span>
            <span className="text-[9px] font-semibold tracking-wider mt-0.5" style={{ color: P[600] }}>
              {getMonth(event.startTime)}
            </span>
          </div>

          {/* title + badges */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 text-[14px] leading-snug line-clamp-2 group-hover:text-gray-700 transition-colors mb-2">
              {event.title}
            </h4>
            <div className="flex items-center gap-1.5 flex-wrap">
              {isLive && (
                <span className="flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-semibold border border-red-200">
                  <LiveDot /> LIVE
                </span>
              )}
              <span
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium border"
                style={{ background: P[50], color: P[600], borderColor: P[100] }}
              >
                <Repeat size={9} />
                {recurringLabel}
              </span>
            </div>
          </div>

          {/* video icon */}
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: P[50] }}
          >
            <Video size={15} style={{ color: P[400] }} />
          </div>
        </div>

        {/* divider */}
        <div className="h-px mb-4" style={{ background: P[50] }} />

        {/* meta */}
        <div className="space-y-2.5 mb-5 text-[13px] text-gray-400">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: P[50] }}
            >
              <Calendar size={12} style={{ color: P[400] }} />
            </div>
            <span>{formatDate(event.startTime)}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: P[50] }}
            >
              <Clock size={12} style={{ color: P[400] }} />
            </div>
            <span>
              {formatTime(event.startTime)} – {formatTime(event.endTime)}
            </span>
          </div>
        </div>

        <div className="flex-1" />

        {/* action button */}
        {hasLink ? (
          canJoin ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onJoin}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-white tracking-wide transition-all duration-200"
              style={{
                background: isLive
                  ? 'linear-gradient(135deg, #ef4444, #f97316)'
                  : P[600],
                boxShadow: isLive
                  ? '0 4px 16px rgba(239,68,68,0.3)'
                  : `0 4px 16px rgba(55,138,221,0.25)`,
              }}
            >
              {isLive ? '🔴 Join Live Now' : 'Join Session'}
            </motion.button>
          ) : (
            <div
              className="w-full py-2.5 rounded-xl text-[12px] font-medium text-center"
              style={{ background: P[50], color: P[600] }}
            >
              Available 2 min before start
            </div>
          )
        ) : (
          <div className="w-full py-2.5 rounded-xl text-[12px] font-medium text-center bg-gray-50 text-gray-400">
            Link not available yet
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Main ──────────────────────────────────────────────────── */
const UpcomingEvents = ({ searchTerm = '', filters = { course: 'all', month: 'all' } }) => {
  const navigate = useNavigate();
  const { userProfile } = useUser();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getUpcomingEvents();
        const expanded = expandRecurringEvents(response) || [];
        const nonRecurring = (response || []).filter((event) => !event.isRecurring);
        const allEvents = [...nonRecurring, ...expanded];
        const uniqueEvents = Array.from(
          new Map(allEvents.map((item) => [item.id + item.startTime, item])).values()
        );
        setEvents(uniqueEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const shouldShowJoin = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = (start - now) / 1000;
    return (diff <= 120 && diff >= 0) || (now >= start && now <= end);
  };

  const getEventStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (now >= start && now <= end) return 'LIVE';
    if (start > now) return 'UPCOMING';
    return 'ENDED';
  };

  const getRecurringLabel = (event) => {
    if (!event.isRecurring) return 'One-time';
    const freq = event.recurrenceRuleNew?.frequency;
    if (freq === 'daily') return 'Daily';
    if (freq === 'weekly') return 'Weekly';
    if (freq === 'monthly') return 'Monthly';
    return 'Recurring';
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      filters.course === 'all' ||
      event.courseId === filters.course ||
      (event.course &&
        (event.course.id === filters.course || event.course._id === filters.course));
    const eventDate = new Date(event.startTime);
    const matchesMonth =
      filters.month === 'all' || eventDate.getMonth().toString() === filters.month;
    return matchesSearch && matchesCourse && matchesMonth;
  });

  if (loading)
    return (
      <div className="px-1">
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: `${P[400]} transparent transparent transparent` }}
          />
          <span className="text-sm text-gray-400 font-medium">Gathering upcoming sessions…</span>
        </div>
        <Skeleton />
      </div>
    );

  return (
    <div className="px-1">
      {filteredEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-5"
        >
          <span className="text-[12px] font-medium text-gray-400">
            {filteredEvents.length} upcoming session{filteredEvents.length !== 1 ? 's' : ''}
          </span>
          <div className="h-px flex-1 bg-gray-100" />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {filteredEvents.length === 0 ? (
          <EmptyState key="empty" hasEvents={events.length > 0} />
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event, index) => {
              const status = getEventStatus(event.startTime, event.endTime);
              return (
                <EventCard
                  key={event.id + event.startTime}
                  event={event}
                  index={index}
                  status={status}
                  recurringLabel={getRecurringLabel(event)}
                  shouldShowJoin={shouldShowJoin}
                  onJoin={() =>
                    navigate(`/join-zoom/${event.meetingId}`, {
                      state: {
                        password: event.meetingPassword,
                        title: event.title,
                        userEmail: userProfile?.email,
                      },
                    })
                  }
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpcomingEvents;