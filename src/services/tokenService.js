import Cookies from 'js-cookie';

export function getAccessToken() {
  // First try to get from cookies (priority since backend stores it there)
  const tokenFromCookie = Cookies.get('accessToken') || Cookies.get('token');
  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  // Fallback to localStorage for backward compatibility
  const token =
    localStorage.getItem('authToken') || localStorage.getItem('token');
  return token || '';
}

export function setAccessToken(token) {
  if (!token) return clearAccessToken();

  // Store in both cookies and localStorage for compatibility
  Cookies.set('accessToken', token, {
    expires: 14, // 14 days
    sameSite: 'Lax',
    secure: window.location.protocol === 'https:',
  });
  Cookies.set('token', token, {
    expires: 14,
    sameSite: 'Lax',
    secure: window.location.protocol === 'https:',
  });

  // Also keep in localStorage for backward compatibility
  localStorage.setItem('authToken', token);
  localStorage.setItem('token', token);

  window.dispatchEvent(new CustomEvent('authTokenUpdated', { detail: token }));
}

export function clearAccessToken() {
  // Clear from cookies
  Cookies.remove('accessToken');
  Cookies.remove('token');

  // Clear from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');

  window.dispatchEvent(new CustomEvent('authTokenCleared'));
}

export function saveLoginTime() {
  const now = new Date().toISOString();
  localStorage.setItem('loginTime', now);
  return now;
}

export function isTokenExpired() {
  const token = getAccessToken();
  const loginTime = localStorage.getItem('loginTime');

  if (!token || !loginTime) return true;

  try {
    // Parse JWT token to get expiration time
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenPayload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    
    // Check if token is expired (with 5 minute buffer)
    return currentTime >= (expirationTime - 300000); // 5 minutes before expiration
  } catch (error) {
    // If token parsing fails, consider it expired
    console.warn('Failed to parse token:', error);
    return true;
  }
}

export function isAuthenticated() {
  const token = getAccessToken();
  const loginTime = localStorage.getItem('loginTime');

  if (!token || !loginTime) return false;

  // Check if token is expired
  if (isTokenExpired()) return false;

  // Optional: Add token expiration check if needed
  // const loginDate = new Date(loginTime);
  // const now = new Date();
  // const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
  // return hoursSinceLogin < 24; // Example: 24-hour session

  return true;
}

export function storeAccessToken(token) {
  setAccessToken(token);
}

// Check if token exists in cookies (for cookie-based auth)
export function hasTokenInCookies() {
  return !!(Cookies.get('accessToken') || Cookies.get('token'));
}

// Get token from cookies only (useful for debugging)
export function getTokenFromCookies() {
  return Cookies.get('accessToken') || Cookies.get('token') || '';
}

// Get token from localStorage only (useful for debugging)
export function getTokenFromStorage() {
  return (
    localStorage.getItem('authToken') || localStorage.getItem('token') || ''
  );
}
