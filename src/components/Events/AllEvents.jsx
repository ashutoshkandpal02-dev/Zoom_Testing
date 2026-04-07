import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../../pages/Events/services/calendarEventApiService';
import { Calendar, Clock, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { expandRecurringEvents } from '../../pages/Events/utils/eventUtils';

/* ─── tiny helpers ─────────────────────────────────────────── */
const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const formatTime = (d) =>
  new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const getDayName = (d) =>
  new Date(d).toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();

const getDayNum = (d) => new Date(d).getDate();

/* ─── single purple palette ────────────────────────────────── */
const P = {
  50:  '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  400: '#818cf8',
  600: '#4f46e5',
  800: '#3730a3',
};
/* ─── Card ─────────────────────────────────────────────────── */
const EventCard = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.055, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.015 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer bg-white"
      style={{
        border: `1px solid #e5e7eb`,
        borderLeft: `3px solid ${P[400]}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 28px rgba(127,119,221,0.14)`;
        e.currentTarget.style.borderColor = P[200];
        e.currentTarget.style.borderLeftColor = P[600];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderColor = '#e5e7eb';
        e.currentTarget.style.borderLeftColor = P[400];
      }}
    >
      <div className="p-5">
        {/* header row */}
        <div className="flex items-start justify-between mb-4">
          {/* date badge */}
          <div
            className="flex flex-col items-center justify-center rounded-lg px-3 py-2 min-w-[52px]"
            style={{ background: P[50] }}
          >
            <span
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: P[600] }}
            >
              {getDayName(event.startTime)}
            </span>
            <span className="text-[22px] font-medium leading-tight" style={{ color: P[800] }}>
              {getDayNum(event.startTime)}
            </span>
          </div>

          {/* live badge */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
            style={{ background: P[50], color: P[600], border: `1px solid ${P[100]}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: P[400] }} />
            Live Session
          </div>
        </div>

        {/* title */}
        <h4 className="font-medium text-[14px] leading-snug mb-4 line-clamp-2 text-gray-900 group-hover:text-gray-700 transition-colors">
          {event.title}
        </h4>

        {/* divider */}
        <div className="h-px mb-3" style={{ background: P[50] }} />

        {/* meta row */}
        <div className="flex items-center gap-4 text-[12px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} style={{ color: P[400] }} />
            <span>{formatDate(event.startTime)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} style={{ color: P[400] }} />
            <span>{formatTime(event.startTime)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Loading skeleton ─────────────────────────────────────── */
const Skeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.06 }}
        className="rounded-xl bg-white"
        style={{
          border: '1px solid #e5e7eb',
          borderLeft: `3px solid ${P[200]}`,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-start">
            <div className="w-14 h-14 rounded-lg animate-pulse" style={{ background: P[50] }} />
            <div className="w-24 h-7 rounded-full animate-pulse" style={{ background: P[50] }} />
          </div>
          <div className="h-4 w-3/4 rounded-lg animate-pulse bg-gray-100" />
          <div className="h-3 w-1/2 rounded-lg animate-pulse bg-gray-100" />
          <div className="h-px" style={{ background: P[50] }} />
          <div className="flex gap-4">
            <div className="h-3 w-24 rounded animate-pulse bg-gray-100" />
            <div className="h-3 w-16 rounded animate-pulse bg-gray-100" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ─── Empty state ──────────────────────────────────────────── */
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <div
      className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
      style={{ background: P[50], border: `1px solid ${P[100]}` }}
    >
      <Search size={28} style={{ color: P[400] }} />
      <motion.div
        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: P[600] }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Sparkles size={10} className="text-white" />
      </motion.div>
    </div>
    <h3 className="font-medium text-gray-800 text-base mb-1">No sessions found</h3>
    <p className="text-gray-400 text-sm max-w-xs">
      Try adjusting your search term or filters to discover sessions.
    </p>
  </motion.div>
);

/* ─── Main component ───────────────────────────────────────── */
const AllEvents = ({ searchTerm = '', filters = { course: 'all', month: 'all' } }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        const expanded = expandRecurringEvents(response);
        setEvents(expanded);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

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

  if (loading) return (
    <div className="px-2 md:px-4">
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: `${P[400]} transparent transparent transparent` }}
        />
        <span className="text-sm text-gray-400 font-medium">Loading sessions…</span>
      </div>
      <Skeleton />
    </div>
  );

  return (
    <div className="px-2 md:px-4">
      {filteredEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-5"
        >
          <span className="text-[12px] font-medium text-gray-400">
            {filteredEvents.length} session{filteredEvents.length !== 1 ? 's' : ''}
          </span>
          <div className="h-px flex-1 bg-gray-100" />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {filteredEvents.length === 0 ? (
          <EmptyState key="empty" />
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllEvents;