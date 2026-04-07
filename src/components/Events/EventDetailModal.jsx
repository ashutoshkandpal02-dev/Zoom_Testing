import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, Clock, Users, Video, ExternalLink, Repeat } from "lucide-react";
import { getEventDetail } from "../../pages/Events/services/calendarEventApiService";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

/* ─── single blue palette ───────────────────────────────────── */
const P = {
  50:  '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  400: '#818cf8',
  600: '#4f46e5',
  800: '#3730a3',
};

const EventDetailModal = ({ isOpen, onClose, eventId, startTime: clickedStartTime }) => {
  const navigate = useNavigate();
  const { userProfile } = useUser();
  const [event, setEvent]           = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading]       = useState(false);
  const [canJoin, setCanJoin]       = useState(false);
  const [error, setError]           = useState(null);

  useEffect(() => {
    if (isOpen && eventId) {
      fetchEventDetails();
    } else {
      setEvent(null);
      setAttendance(null);
      setError(null);
    }
  }, [isOpen, eventId]);

  // ─────────────────────────────────────────────────────────────
  // BUG FIX: occurrenceId nikaal ke API ko pass karo
  //
  // Pehle: getEventDetail(eventId) call hoti thi bina occurrenceId ke
  //  → Backend null occurrenceId se query karta tha
  //  → DB mein "" ya specific occurrenceId stored hoti thi → match fail → Absent
  //
  // Ab:
  //  1. Pehle event fetch karo (occurrences ke saath)
  //  2. clickedStartTime se sahi occurrence match karo
  //  3. Woh occurrenceId ke saath dobara attendance check karo
  // ─────────────────────────────────────────────────────────────
const fetchEventDetails = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await getEventDetail(eventId);
    if (!response.event) throw new Error("Event details not found");
    setEvent(response.event);

    console.log("=== FRONTEND DEBUG ===");
    console.log("eventId:", eventId);
    console.log("clickedStartTime:", clickedStartTime);
    console.log("event.isRecurring:", response.event.isRecurring);
    console.log("event.occurrences:", JSON.stringify(response.event.occurrences, null, 2));
    console.log("Step 1 attendance from response:", response.attendance);

    let compositeId = eventId;
    if (clickedStartTime && response.event.occurrences?.length > 0) {
      const clickedMs = new Date(clickedStartTime).getTime();
      console.log("clickedMs:", clickedMs);

      response.event.occurrences.forEach((occ, i) => {
        console.log(`occ[${i}] startTime:`, occ.startTime, "→ ms:", new Date(occ.startTime).getTime(), "occurrenceId:", occ.occurrenceId);
      });

      const matchedOcc = response.event.occurrences.find(
        (occ) => new Date(occ.startTime).getTime() === clickedMs
      );
      console.log("matchedOcc:", JSON.stringify(matchedOcc, null, 2));

      if (matchedOcc?.occurrenceId) {
        compositeId = `${eventId}_${matchedOcc.occurrenceId}`;
      }
    }

    console.log("Final compositeId:", compositeId);

    const detailResponse = await getEventDetail(compositeId);
    console.log("Step 3 detailResponse:", JSON.stringify(detailResponse, null, 2));
    console.log("=== END FRONTEND DEBUG ===");

    setAttendance(detailResponse.attendance);

    const effectiveStartTime = clickedStartTime || response.event.startTime;
    if (effectiveStartTime) checkJoinStatus(effectiveStartTime);

  } catch (err) {
    setError(err.message || "Failed to load event details.");
  } finally {
    setLoading(false);
  }
};

  /* Join available 2 min before start until event ends */
  const checkJoinStatus = (startTime) => {
    const now   = new Date();
    const start = new Date(startTime);
    const diffMs = start.getTime() - now.getTime();
    const diffMin = diffMs / (1000 * 60);
    setCanJoin(diffMin <= 2);
  };

  if (!isOpen) return null;

  const startDate = clickedStartTime
    ? new Date(clickedStartTime)
    : event?.startTime ? new Date(event.startTime) : null;

  let endDate = event?.endTime ? new Date(event.endTime) : null;
  if (clickedStartTime && event?.startTime && event?.endTime) {
    const duration = new Date(event.endTime).getTime() - new Date(event.startTime).getTime();
    endDate = new Date(new Date(clickedStartTime).getTime() + duration);
  }

  const isPastEvent = endDate && endDate < new Date();

  /* Attendance badge — only meaningful for past events */
  const AttendanceBadge = () => {
    if (!isPastEvent) {
      return (
        <span
          className="inline-flex items-center gap-1.5 text-[12px] font-medium rounded-full px-2.5 py-1"
          style={{ background: P[50], color: P[600], border: `1px solid ${P[100]}` }}
        >
          Upcoming
        </span>
      );
    }
    const isPresent = attendance === 'Present';
    return (
      <span
        className="inline-flex items-center gap-1.5 text-[12px] font-medium rounded-full px-2.5 py-1"
        style={{
          background: isPresent ? '#dcfce7' : '#fee2e2',
          color:      isPresent ? '#16a34a' : '#dc2626',
          border:     `1px solid ${isPresent ? '#bbf7d0' : '#fecaca'}`,
        }}
      >
        {isPresent ? (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#16a34a" strokeWidth="2"><polyline points="2,6 5,9 10,3"/></svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#dc2626" strokeWidth="2"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>
        )}
        {attendance || 'Absent'}
      </span>
    );
  };

  const IconWrap = ({ children }) => (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: P[50] }}
    >
      {children}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-2xl border-none gap-0">

        {loading ? (
          <div className="flex items-center justify-center p-20">
            <div
              className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: `${P[400]} transparent transparent transparent` }}
            />
          </div>
        ) : error ? (
          <div className="p-10 text-center text-gray-400 text-sm">{error}</div>
        ) : event ? (
          <div className="bg-white">
            {/* top accent bar */}
            <div className="h-1 w-full" style={{ background: P[600] }} />

            <div className="p-6">
              {/* title */}
              <h2 className="text-[16px] font-medium text-gray-900 leading-snug mb-5">
                {event.title}
              </h2>

              {/* rows */}
              <div className="flex flex-col gap-4 mb-5">

                {/* Date */}
                <div className="flex items-center gap-3">
                  <IconWrap>
                    <Calendar size={15} style={{ color: P[600] }} />
                  </IconWrap>
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">Date</p>
                    <p className="text-[14px] font-medium text-gray-800">
                      {startDate ? format(startDate, "EEEE, MMMM do, yyyy") : "—"}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3">
                  <IconWrap>
                    <Clock size={15} style={{ color: P[600] }} />
                  </IconWrap>
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">Time</p>
                    <p className="text-[14px] font-medium text-gray-800">
                      {startDate && endDate
                        ? `${format(startDate, "hh:mm a")} – ${format(endDate, "hh:mm a")}`
                        : "—"}
                    </p>
                  </div>
                </div>

                {/* Attendance */}
                <div className="flex items-center gap-3">
                  <IconWrap>
                    <Users size={15} style={{ color: P[600] }} />
                  </IconWrap>
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1">Attendance</p>
                    <AttendanceBadge />
                  </div>
                </div>

                {/* Session type */}
                {event.isRecurring && (
                  <div className="flex items-center gap-3">
                    <IconWrap>
                      <Repeat size={15} style={{ color: P[600] }} />
                    </IconWrap>
                    <div>
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">Session type</p>
                      <p className="text-[14px] font-medium text-gray-800 capitalize">
                        {event.recurrenceRuleNew?.frequency || 'Recurring'} · Live session
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* divider */}
              <div className="h-px mb-5" style={{ background: P[50] }} />

              {/* footer buttons */}
              <div className="flex gap-3">
                {/* Close always visible */}
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-medium transition-all"
                  style={{
                    background: 'transparent',
                    color: P[600],
                    border: `1px solid ${P[200]}`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = P[50]; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  Close
                </button>

                {/* Join — only shown when NOT past AND within 2 min of start */}
                {!isPastEvent && (
                  <button
                    disabled={!canJoin || !event.meetingId}
                    onClick={() => {
                      if (event.meetingId) {
                        navigate(`/join-zoom/${event.meetingId}`, {
                          state: {
                            password: event.meetingPassword,
                            title: event.title,
                            userEmail: userProfile?.email,
                          },
                        });
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium text-white transition-all"
                    style={{
                      background: canJoin && event.meetingId ? P[600] : P[200],
                      cursor: canJoin && event.meetingId ? 'pointer' : 'not-allowed',
                    }}
                    onMouseEnter={(e) => {
                      if (canJoin && event.meetingId) e.currentTarget.style.background = P[800];
                    }}
                    onMouseLeave={(e) => {
                      if (canJoin && event.meetingId) e.currentTarget.style.background = P[600];
                    }}
                  >
                    {canJoin ? (
                      <>Join session <ExternalLink size={13} /></>
                    ) : (
                      'Starts soon'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-400 text-sm">
            Failed to load event details.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;