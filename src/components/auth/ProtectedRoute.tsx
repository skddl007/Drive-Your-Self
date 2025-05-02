import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Checking session in ProtectedRoute');
        const { data } = await supabase.auth.getSession();
        const hasActiveSession = !!data.session;
        console.log('Session check result:', hasActiveSession);
        setHasSession(hasActiveSession);
        setIsChecking(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setHasSession(false);
        setIsChecking(false);
      }
    };

    checkSession();
  }, []);

  // If we're still checking, show a loading spinner
  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If there's no session or the user is not authenticated, redirect to login
  if (!hasSession || !isAuthenticated) {
    console.log('No active session or not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If we have a session and the user is authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;