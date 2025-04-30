import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { createUserProfile, getUserProfile } from '../services/userService';
import { UserProfile } from '../types/user';

type User = SupabaseUser

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check active sessions
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const profile = await getUserProfile(session.user.id);
          setUserProfile(profile);
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const profile = await getUserProfile(session.user.id);
            setUserProfile(profile);
          } else {
            setUserProfile(null);
          }
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
        setUserProfile(null);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    if (data.user) setUser(data.user);
  };

  const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    if (data.user) {
      setUser(data.user);
      // Create user profile
      const profile = await createUserProfile(data.user.id, email);
      setUserProfile(profile);
    }
  };

  const logout = async () => {
    try {
      // First clear all local state and storage
      setUser(null);
      setUserProfile(null);
      window.localStorage.clear();
      sessionStorage.clear();

      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Navigate to home page
      window.location.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      user,
      userProfile,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};