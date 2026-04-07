import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getAllEvents } from './services/calendarEventApiService';
import EventDetailModal from '../../components/Events/EventDetailModal';
import { format } from 'date-fns';
import { expandRecurringEvents } from './utils/eventUtils';

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const fetchEvents = async (start, end) => {
        try {
            setLoading(true);
            const rawEvents = await getAllEvents(start, end);
            const expandedData = expandRecurringEvents(rawEvents);
            
            // Format events for FullCalendar
            const formattedEvents = expandedData.map(event => ({
                id: event.id,
                title: event.displayTitle,
                start: event.startTime,
                end: event.endTime,
                extendedProps: {
                    ...event
                }
            }));
            
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDatesSet = (dateInfo) => {
        fetchEvents(dateInfo.startStr, dateInfo.endStr);
    };

    const handleEventClick = (info) => {
        setSelectedEvent(info.event.id);
        setSelectedStartTime(info.event.start);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-sm min-h-[80vh]">
            <div className="mb-6 flex justify-between items-center">
                
                {loading && <span className="text-sm text-blue-600 animate-pulse">Updating events...</span>}
            </div>

            <div className="calendar-container premium-calendar">
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
                    slotMinHeight={60} // Taller rows for better visibility
                    expandRows={true}
                    displayEventTime={false} // Hide event times
                    dayMaxEvents={true}
                    nowIndicator={true}
                    eventDisplay="block"
                    allDaySlot={false}
                    slotEventOverlap={false} // Force events to be side-by-side, not overlapping
                />
            </div>

            <EventDetailModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                eventId={selectedEvent} 
                startTime={selectedStartTime}
            />

            <style>{`
                /* Container Styles */
                .premium-calendar {
                    --fc-border-color: #f0f0f0;
                    --fc-daygrid-event-dot-width: 8px;
                    --fc-today-bg-color: #fffbeb; /* Light yellow for today */
                }

                /* Header/Toolbar Styles */
                .fc .fc-toolbar-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #374151;
                }
                .fc .fc-button-primary {
                    background-color: transparent !important;
                    border-color: #e5e7eb !important;
                    color: #4b5563 !important;
                    text-transform: capitalize !important;
                    font-weight: 500 !important;
                    border-radius: 6px !important;
                }
                .fc .fc-button-primary:hover {
                    background-color: #f9fafb !important;
                }
                .fc .fc-button-active {
                    background-color: #f3f4f6 !important;
                    color: #111827 !important;
                    font-weight: 600 !important;
                }

                /* Column Headers */
                .fc .fc-col-header-cell {
                    padding: 12px 0;
                    font-weight: 500;
                    color: #6b7280;
                    border: none;
                }

                /* Day Cells */
                /* Day Numbers - Neutral Gray */
                .fc .fc-daygrid-day-number {
                    color: #6b7280; 
                    font-weight: 500;
                    padding: 8px;
                    text-decoration: none !important;
                }

                .fc-event-time {
                    display: none !important; /* Explicitly hide just in case */
                }

                .fc-event-title,
                .fc-timegrid-event-title {
                    color: #4b5563 !important;
                    font-size: 0.8rem !important; /* Larger text now that time is hidden */
                    font-weight: 600 !important;
                    white-space: normal !important;
                    overflow: hidden !important;
                    display: -webkit-box !important;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    line-height: 1.2 !important;
                    text-align: center !important; /* Center for a cleaner look */
                    width: 100% !important;
                }

                .fc-event-main {
                    display: flex !important;
                    flex-direction: column !important; /* Stack time and title */
                    justify-content: center !important;
                    padding: 4px 8px !important;
                    overflow: hidden !important;
                    width: 100% !important;
                    color: #4b5563 !important;
                    height: 100% !important;
                }

                /* Event Styling for all views (Month, Week, Day) */
                .fc-event,
                .fc-daygrid-event, 
                .fc-timegrid-event,
                .fc-v-event {
                    background-color: #f3f4f6 !important; /* Neutral Gray theme */
                    border: none !important; 
                    border-left: 4px solid #6b7280 !important; /* Neutral Gray theme */
                    border-radius: 4px !important;
                    margin: 0 1px !important; 
                    padding: 0 !important; 
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
                    overflow: hidden !important;
                    cursor: pointer;
                    z-index: 1 !important;
                }

                .fc-event:hover, 
                .fc-daygrid-event:hover, 
                .fc-timegrid-event:hover, 
                .fc-v-event:hover {
                    background-color: #e5e7eb !important;
                }

                /* TimeGrid Slot Customization */
                .fc .fc-timegrid-slot {
                    height: 60px !important; /* Much taller rows */
                }

                .fc .fc-timegrid-slot-label {
                    vertical-align: middle !important;
                }

                .fc-timegrid-event {
                    min-height: 40px !important; /* Ensure tiny events are still visible/clickable */
                }

                /* Grid Customization */
                .fc-theme-standard td, .fc-theme-standard th {
                    border-color: #f0f0f0 !important;
                }

                .fc .fc-scrollgrid {
                    border-radius: 12px;
                    border: 1px solid #f0f0f0;
                }
            `}</style>
        </div>
    );
};

export default CalendarPage;
