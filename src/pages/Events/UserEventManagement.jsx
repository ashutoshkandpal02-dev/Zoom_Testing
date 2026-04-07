import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getAllEvents, createEvent, updateEvent, deleteEvent, getCourses, getUsers } from './services/calendarEventApiService';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, ClipboardCheck, Plus, Pencil, Trash2, AlertCircle, Search, User, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { expandRecurringEvents } from './utils/eventUtils';

const UserEventManagement = () => {
    const [events, setEvents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [courseSearch, setCourseSearch] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        startTime: '',
        endTime: '',
        isRecurring: false,
        recurrence: {
            frequency: 'weekly',
            endDate: ''
        },
        courseIds: [],
        userIds: []
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [coursesData, usersData] = await Promise.all([
                    getCourses(),
                    getUsers()
                ]);
                setCourses(coursesData);
                setAllUsers(usersData);
            } catch (error) {
                console.error("Metadata fetch error:", error);
            }
        };
        fetchMetadata();
    }, []);

    const fetchEvents = async (start, end) => {
        try {
            setLoading(true);
            const data = await getAllEvents(start, end);
            const expandedData = expandRecurringEvents(data);

            const formattedEvents = expandedData.map(event => ({
                id: event.id,
                title: event.displayTitle,
                start: event.startTime,
                end: event.endTime,
                extendedProps: { ...event }
            }));

            setEvents(formattedEvents);
        } catch (error) {
            console.error("Failed to fetch events:", error);
            toast.error("Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    const handleDatesSet = (dateInfo) => {
        fetchEvents(dateInfo.startStr, dateInfo.endStr);
    };

    const handleEventClick = (info) => {
        // We combine extendedProps with the event id so it's always accessible
        setSelectedEvent({ ...info.event.extendedProps, id: info.event.id });
        setIsDetailModalOpen(true);
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const updateData = {
                title: formData.title,
                startTime: new Date(formData.startTime).toISOString(),
                endTime: new Date(formData.endTime).toISOString()
            };

            await updateEvent(selectedEvent.id, updateData);
            toast.success('Event updated successfully');
            setIsEditModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Update event error:', error);
            toast.error('Failed to update event');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteEvent = async () => {
        try {
            setSubmitting(true);
            await deleteEvent(selectedEvent.id);
            toast.success('Event deleted successfully');
            setIsDeleteModalOpen(false);
            setIsDetailModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Delete event error:', error);
            toast.error('Failed to delete event');
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
    setFormData({
        title: '',
        startTime: '',
        endTime: '',
        isRecurring: false,
        recurrence: {
            frequency: 'weekly',
            endDate: ''
        },
        courseIds: [],
        userIds: []
    });
    setCourseSearch('');
    setUserSearch('');
    };

    const openEditModal = () => {
        setFormData({
            title: selectedEvent.title,
            startTime: format(new Date(selectedEvent.startTime), "yyyy-MM-dd'T'HH:mm"),
            endTime: format(new Date(selectedEvent.endTime), "yyyy-MM-dd'T'HH:mm"),
            isRecurring: selectedEvent.isRecurring,
            recurrence: selectedEvent.recurrenceRuleNew || { frequency: 'weekly', interval: 1, count: 10, endDate: '' }
        });
        setIsDetailModalOpen(false);
        setIsEditModalOpen(true);
    };
    const isPastEvent = selectedEvent
  ? new Date(selectedEvent.endTime) < new Date()
  : false;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Manage Events</h2>
                <div className="flex gap-3 items-center">
                    {loading && <span className="text-sm text-blue-600 animate-pulse">Loading...</span>}
                    <Button onClick={() => navigate('/instructor/create-event')} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-xl h-11 px-6 shadow-md transition-all active:scale-95">
                        <Plus size={18} /> Create Event
                    </Button>
                </div>
            </div>

            <div className="calendar-container instructor-calendar bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    datesSet={handleDatesSet}
                    height="auto"
                    slotMinHeight={60}
                    expandRows={true}
                    displayEventTime={false} // Match user side
                    dayMaxEvents={true}
                    nowIndicator={true}
                    slotEventOverlap={false}
                    eventDisplay="block"
                />
            </div>

            {/* Event Detail Modal */}
            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
  <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-2xl">
    {selectedEvent && (
      <div className="bg-white">
        <div className="h-2 w-full bg-indigo-600"></div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 mb-4">
              {selectedEvent.title}
            </DialogTitle>
          </DialogHeader>

          {/* Event Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar size={18} className="text-indigo-500" />
              <span>
                {format(new Date(selectedEvent.startTime), "MMMM do, yyyy")}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Clock size={18} className="text-indigo-500" />
              <span>
                {format(new Date(selectedEvent.startTime), "hh:mm a")} -{" "}
                {format(new Date(selectedEvent.endTime), "hh:mm a")}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">

  {/* Attendance Report */}
  <Button
    disabled={!isPastEvent}
    className={`w-full rounded-xl h-11 transition-all gap-2
      ${isPastEvent
        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
        : "bg-indigo-300 text-white cursor-not-allowed"
      }`}
    onClick={() => {
      if (isPastEvent) {
        setIsDetailModalOpen(false);
        const [eventId, occurrenceId] = selectedEvent.id.toString().split('_');
        const url = occurrenceId 
          ? `/instructor/attendance-report/${eventId}?occurrenceId=${occurrenceId}`
          : `/instructor/attendance-report/${eventId}`;
        navigate(url);
      }
    }}
  >
    <ClipboardCheck size={18} />
    Attendance Report
  </Button>

  {/* Edit + Delete only for future events */}
  {!isPastEvent && (
    <div className={`grid gap-3 ${selectedEvent?.isRecurring ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {!selectedEvent?.isRecurring && (
        <Button
          variant="outline"
          className="border-gray-200 text-gray-600 rounded-xl h-11 gap-2"
          onClick={openEditModal}
        >
          <Pencil size={18} />
          Edit
        </Button>
      )}

      <Button
        variant="destructive"
        className="bg-red-50 text-red-600 hover:bg-red-100 border-none rounded-xl h-11 gap-2"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <Trash2 size={18} />
        Delete
      </Button>
    </div>
  )}

</div>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>


            {/* Edit Event Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[450px] p-6">
                    <DialogHeader>
                        <DialogTitle>Edit Event</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateEvent} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label>Event Title</Label>
                            <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Start Time</Label>
                            <Input required type="datetime-local" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>End Time</Label>
                            <Input required type="datetime-local" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} />
                        </div>
                        <div className="pt-4 flex gap-3">
                            <Button type="submit" className="flex-1 bg-indigo-600" disabled={submitting}>
                                {submitting ? 'Updating...' : 'Update Event'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[400px] p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                            <AlertCircle size={28} />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Event</h3>
                    <p className="text-gray-500 mb-8">This action cannot be undone. This will delete the Event and Zoom meeting.</p>
                    <div className="flex gap-3">
                        <Button variant="destructive" className="flex-1" onClick={handleDeleteEvent} disabled={submitting}>
                            {submitting ? 'Deleting...' : 'Yes, Delete'}
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <style>{`
                .instructor-calendar .fc-event-time { 
                    display: none !important;
                }
                .instructor-calendar .fc-event-title,
                .instructor-calendar .fc-timegrid-event-title { 
                    color: #4b5563 !important; 
                    font-size: 0.8rem !important; 
                    font-weight: 600 !important;
                    white-space: normal !important;
                    overflow: hidden !important;
                    display: -webkit-box !important;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    line-height: 1.2 !important;
                    text-align: center !important;
                    width: 100% !important;
                }
                .instructor-calendar .fc-event-main {
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                    padding: 4px 8px !important;
                    overflow: hidden !important;
                    width: 100% !important;
                    height: 100% !important;
                }
                .instructor-calendar .fc-event,
                .instructor-calendar .fc-daygrid-event,
                .instructor-calendar .fc-timegrid-event,
                .instructor-calendar .fc-v-event { 
                    background-color: #f3f4f6 !important; /* Gray-100 */
                    border: none !important; 
                    border-left: 4px solid #6b7280 !important; /* Gray-500 */
                    border-radius: 4px !important;
                    margin: 0 1px !important; 
                    padding: 0 !important; 
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
                    overflow: hidden !important;
                    cursor: pointer;
                }
                .instructor-calendar .fc-event:hover {
                    background-color: #e5e7eb !important; /* Gray-200 */
                }
                .instructor-calendar .fc .fc-timegrid-slot {
                    height: 60px !important;
                }
                .instructor-calendar .fc-timegrid-event {
                    min-height: 40px !important;
                }
                .instructor-calendar .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: 600; color: #1e293b; }
                .instructor-calendar .fc .fc-button-primary { background-color: white !important; border-color: #e2e8f0 !important; color: #64748b !important; }
                .instructor-calendar .fc .fc-button-active { background-color: #f1f5f9 !important; color: #1e293b !important; font-weight: 600 !important; }
                
                .instructor-calendar .fc .fc-daygrid-day-number {
                    color: #64748b !important;
                    font-weight: 500 !important;
                    padding: 8px !important;
                    text-decoration: none !important;
                }

                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            `}</style>
        </div>
    );
};

export default UserEventManagement;
