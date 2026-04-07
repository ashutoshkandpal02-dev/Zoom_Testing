import { getAuthHeader } from '../../../services/authHeader';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getUpcomingEvents() {
  try {
    
    const response = await fetch(`${API_BASE_URL}/api/calendarEvent/upcoming`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    });

    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch upcoming events: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("That is my Logs: ", data.data.count);
    
    return  data.data.events || [];
  } catch (error) {
    console.error('getUpcomingEvents error:', error);
    throw error;
  }
}

export async function getAllEvents(from, to) {
  try {
    const url = new URL(`${API_BASE_URL}/api/calendarEvent/all`);
    if (from) url.searchParams.append('from', from);
    if (to) url.searchParams.append('to', to);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch all events: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.data.events || [];
  } catch (error) {
    console.error('getAllEvents error:', error);
    throw error;
  }
}

export async function getEventDetail(id) {
  try {
    if (!id) throw new Error("Event ID is required");

    // Split composite ID (joined by underscore)
    const idParts = id.toString().split('_');
    const eventId = idParts[0];
    const occurrenceId = idParts.length > 1 ? idParts[1] : null;
    
    let url = `${API_BASE_URL}/api/calendarEvent/${eventId}`;
    if (occurrenceId && occurrenceId !== 'undefined' && occurrenceId !== 'null') {
      url += `?occurrenceId=${occurrenceId}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch event detail: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    return {
      event: data?.data?.event,
      attendance: data?.data?.userAttendance,
      occurrenceId // Pass back the occurrence ID for the modal to use
    };

  } catch (error) {
    console.error('getEventDetail error:', error);
    throw error;
  }
}

export async function getAttendanceReport(id) {
  try {
    const [eventId, occurrenceId] = id.toString().split('_');
    
    let url = `${API_BASE_URL}/api/calendarEvent/attendance-report/${eventId}`;
    if (occurrenceId) {
      url += `?occurrenceId=${occurrenceId}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch attendance report: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('getAttendanceReport error:', error);
    throw error;
  }
}

export async function createEvent(eventData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/calendarEvent/create-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(eventData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      // For validation errors (400), just return the error message directly
      if (response.status === 400) {
        throw new Error(errorText);
      }
      throw new Error(`Failed to create event: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('createEvent error:', error);
    throw error;
  }
}

export async function updateEvent(eventId, updateData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/calendarEvent/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(updateData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      // For validation errors (400), just return the error message directly
      if (response.status === 400) {
        throw new Error(errorText);
      }
      throw new Error(`Failed to update event: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('updateEvent error:', error);
    throw error;
  }
}

export async function deleteEvent(eventId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/calendarEvent/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete event: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('deleteEvent error:', error);
    throw error;
  }
}

export async function getCourses() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/course/getAllCourses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('getCourses error:', error);
    return [];
  }
}

export async function getUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('getUsers error:', error);
    return [];
  }
}

export async function getZoomSignature(meetingNumber, role = 0) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/calendarEvent/signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ meetingNumber, role }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch Zoom signature: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('getZoomSignature error:', error);
    throw error;
  }
}

export async function getRecordingEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/calendarEvent/recording-events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch recording events: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.data.events || [];
  } catch (error) {
    console.error('getRecordingEvents error:', error);
    throw error;
  }
}

export async function getEventRecordings(id) {
  try {
    if (!id) throw new Error("ID is required");

    // Split composite ID (joined by underscore)
    const idParts = id.toString().split('_');
    const eventId = idParts[0];
    const occurrenceId = idParts.length > 1 ? idParts[1] : null;

    let url = `${API_BASE_URL}/api/calendarEvent/recording-events/${eventId}`;
    if (occurrenceId && occurrenceId !== 'undefined' && occurrenceId !== 'null') {
      url += `?occurrenceId=${occurrenceId}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch event recordings: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.data.recordings || [];
  } catch (error) {
    console.error('getEventRecordings error:', error);
    throw error;
  }
}
