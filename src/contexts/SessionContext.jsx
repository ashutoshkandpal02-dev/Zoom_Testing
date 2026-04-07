import React, { createContext, useContext, useState, useEffect } from 'react';
import { isTokenExpired, clearAccessToken } from '@/services/tokenService';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Check token expiration periodically
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        setIsSessionExpired(true);
      }
    };

    // Check immediately
    checkTokenExpiration();

    // Check every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginRedirect = () => {
    // Clear expired token
    clearAccessToken();
    localStorage.removeItem('loginTime');
    
    // Close modal and redirect to login
    setIsSessionExpired(false);
    window.location.href = '/login';
  };

  const closeModal = () => {
    setIsSessionExpired(false);
  };

  return (
    <SessionContext.Provider
      value={{
        isSessionExpired,
        handleLoginRedirect,
        closeModal,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
