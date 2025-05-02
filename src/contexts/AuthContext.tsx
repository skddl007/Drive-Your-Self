import { User as SupabaseUser } from '@supabase/supabase-js';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
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
        console.log('Initializing auth context');

        // Check active sessions
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setUser(null);
          setUserProfile(null);
          return;
        }

        console.log('Session check result:', !!session);

        if (session?.user) {
          console.log('User found in session:', session.user.email);
          setUser(session.user);

          try {
            // Fetch user profile
            const profile = await getUserProfile(session.user.id);

            if (profile) {
              console.log('User profile found:', profile.username);
              setUserProfile(profile);
            } else if (session.user.email) {
              console.log('No profile found, creating new profile');
              // If profile doesn't exist, create one
              const newProfile = await createUserProfile(session.user.id, session.user.email);
              console.log('New profile created:', newProfile.username);
              setUserProfile(newProfile);
            }
          } catch (profileError) {
            console.error('Error handling user profile during initialization:', profileError);
            // Continue even if profile fetch fails
          }
        } else {
          console.log('No active session found');
          setUser(null);
          setUserProfile(null);
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event);

          if (session?.user) {
            console.log('User in auth change event:', session.user.email);
            setUser(session.user);

            try {
              // Fetch or create user profile
              const profile = await getUserProfile(session.user.id);

              if (profile) {
                console.log('User profile found in auth change:', profile.username);
                setUserProfile(profile);
              } else if (event === 'SIGNED_IN' && session.user.email) {
                console.log('No profile found in auth change, creating new profile');
                const newProfile = await createUserProfile(session.user.id, session.user.email);
                console.log('New profile created in auth change:', newProfile.username);
                setUserProfile(newProfile);
              }
            } catch (profileError) {
              console.error('Error handling user profile during auth change:', profileError);
              // Continue even if profile fetch fails
            }
          } else {
            console.log('No user in auth change event, clearing state');
            setUser(null);
            setUserProfile(null);
          }
        });

        return () => {
          console.log('Cleaning up auth subscription');
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
        setUserProfile(null);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Starting login process for:', email);

      // Clear any existing session first to avoid conflicts
      await supabase.auth.signOut();

      // Sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      if (!data.user || !data.session) {
        console.error('Login failed: No user or session returned');
        throw new Error('Login failed. Please try again.');
      }

      console.log('User logged in successfully:', data.user.email);
      console.log('Session established:', !!data.session);

      // Set the user in state
      setUser(data.user);

      try {
        // Fetch user profile after successful login
        const profile = await getUserProfile(data.user.id);

        if (profile) {
          console.log('User profile found:', profile.username);
          setUserProfile(profile);
        } else {
          console.log('No profile found, creating new profile');
          // If profile doesn't exist, create one
          const newProfile = await createUserProfile(data.user.id, email);
          console.log('New profile created:', newProfile.username);
          setUserProfile(newProfile);
        }
      } catch (profileError) {
        console.error('Error handling user profile after login:', profileError);
        // Continue even if profile fetch fails - we can still authenticate the user
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login process error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Registration error:', error);
        throw error;
      }

      if (data.user) {
        console.log('User registered successfully:', data.user.email);
        setUser(data.user);

        // Create user profile
        try {
          const profile = await createUserProfile(data.user.id, email);
          console.log('Profile created for new user:', profile.username);
          setUserProfile(profile);
        } catch (profileError) {
          console.error('Error creating user profile during registration:', profileError);
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Registration process error:', error);
      throw error;
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