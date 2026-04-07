import { format } from 'date-fns';

export const expandRecurringEvents = (data) => {
  if (!Array.isArray(data)) return [];

  const expanded = [];

  data.forEach((event) => {
    if (event.meeting?.occurrences?.length) {
      event.meeting.occurrences.forEach((occ) => {
        const start = new Date(occ.start_time);
        const duration = occ.duration || 60;
        const end = new Date(start.getTime() + duration * 60000);

        expanded.push({
          ...event,
          id: `${event.id}_${occ.occurrence_id}`,
          originalId: event.id,
          occurrenceId: occ.occurrence_id,
          startTime: occ.start_time,
          endTime: end.toISOString(),
          displayTitle: event.title,
          isOccurrence: true
        });
      });
    } else if (event.occurrences?.length) {
      event.occurrences.forEach((occ) => {
        const start = new Date(occ.startTime || occ.start_time);
        const end = new Date(occ.endTime || occ.end_time);

        // Real Zoom occurrenceId lo — index bilkul use mat karo
        const occId = occ.occurrenceId || occ.occurrence_id || null;

        expanded.push({
          ...event,
          // occId hai toh composite, nahi hai toh plain eventId
          id: occId ? `${event.id}_${occId}` : event.id,
          originalId: event.id,
          occurrenceId: occId,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          displayTitle: event.title,
          isOccurrence: true
        });
      });
    } else {
      expanded.push({
        ...event,
        displayTitle: event.title,
        isOccurrence: false
      });
    }
  });

  return expanded;
};