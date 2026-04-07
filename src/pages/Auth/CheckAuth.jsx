import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from '@/pages/Auth/Login';
import {
    getAccessToken,
    hasTokenInCookies,
    getTokenFromStorage,
    isAuthenticated,
    isTokenExpired,
    clearAccessToken,
} from '@/services/tokenService';

export default function CheckAuth() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        try {
            const path = location.pathname || '';

            const tokenPresent = !!(
                getAccessToken() || getTokenFromStorage() || hasTokenInCookies()
            );

            const auth = isAuthenticated();
            const tokenExpired = tokenPresent && isTokenExpired();

            if (path.includes('/login')) {
                if (tokenPresent && !tokenExpired && auth) {
                    navigate('/dashboard', { replace: true });
                    return;
                }

                // No token or expired token — render the Login page
                setShowLogin(true);
            } else {
                // Not on /login - check if we need to handle expired token
                if (tokenPresent && tokenExpired) {
                    // Token is expired, clear it and redirect to login
                    clearAccessToken();
                    localStorage.removeItem('loginTime');
                    navigate('/login', { replace: true });
                    return;
                } else if (!tokenPresent || !auth) {
                    // No token or not authenticated, redirect to login
                    navigate('/login', { replace: true });
                    return;
                }
                
                // Valid token, don't render anything (shouldn't happen for the route)
                setShowLogin(false);
            }
        } catch (e) {
            // Fail-safe: render login if anything goes wrong
            console.warn('CheckAuth error:', e);
            setShowLogin(true);
        }
    }, [location.pathname, navigate]);

    return showLogin ? <Login /> : null;
}
