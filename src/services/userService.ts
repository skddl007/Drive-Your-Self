import { supabase } from '../lib/supabase';
import { UserProfile } from '../types/user';

export const createUserProfile = async (userId: string, email: string): Promise<UserProfile> => {
  const username = email.split('@')[0]; // Default username from email
  
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        user_id: userId,
        username,
        problems_solved: 0,
        streak_count: 0,
        total_submissions: 0,
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
