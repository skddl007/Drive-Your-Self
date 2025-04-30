import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { updateUserProfile } from '../services/userService';

interface ProblemContextType {
  completedProblems: string[];
  markProblemCompleted: (problemId: string) => void;
  dailyStats: {
    problemsSolved: number;
    streak: number;
    longestStreak: number;
  };
}

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

export const useProblems = () => {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error('useProblems must be used within a ProblemProvider');
  }
  return context;
};

interface ProblemProviderProps {
  children: ReactNode;
}

export const ProblemProvider: React.FC<ProblemProviderProps> = ({ children }) => {
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [dailyStats, setDailyStats] = useState({
    problemsSolved: 0,
    streak: 0,
    longestStreak: 0
  });
  const { user, userProfile } = useAuth();

  // Load user data from Supabase
  useEffect(() => {
    if (user) {
      const loadUserData = async () => {
        // Load completed problems
        const { data: problemsData, error: problemsError } = await supabase
          .from('completed_problems')
          .select('problem_id')
          .eq('user_id', user.id);

        if (!problemsError && problemsData) {
          setCompletedProblems(problemsData.map(item => item.problem_id));
        }

        // Load today's activity
        const today = new Date().toISOString().split('T')[0];
        const { data: activityData, error: activityError } = await supabase
          .from('daily_activity')
          .select('problems_solved')
          .eq('user_id', user.id)
          .eq('activity_date', today)
          .single();

        // Load user profile for streak info
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('streak_count, longest_streak')
          .eq('user_id', user.id)
          .single();

        if (!activityError && !profileError && profileData) {
          setDailyStats({
            problemsSolved: activityData?.problems_solved || 0,
            streak: profileData.streak_count,
            longestStreak: profileData.longest_streak
          });
        }
      };

      loadUserData();
    }
  }, [user]);

  const markProblemCompleted = async (problemId: string) => {
    if (!user || !userProfile) return;

    const isCompleting = !completedProblems.includes(problemId);

    try {
      if (isCompleting) {
        const today = new Date().toISOString().split('T')[0];

        // Add to completed_problems
        await supabase
          .from('completed_problems')
          .insert([{ user_id: user.id, problem_id: problemId }]);

        // Update or create daily activity
        const { data: existingActivity } = await supabase
          .from('daily_activity')
          .select('id, problems_solved')
          .eq('user_id', user.id)
          .eq('activity_date', today)
          .single();

        if (existingActivity) {
          await supabase
            .from('daily_activity')
            .update({ problems_solved: existingActivity.problems_solved + 1 })
            .eq('id', existingActivity.id);
        } else {
          await supabase
            .from('daily_activity')
            .insert([{ user_id: user.id, activity_date: today, problems_solved: 1 }]);
        }

        // Update user profile
        await updateUserProfile(user.id, {
          problems_solved: userProfile.problems_solved + 1,
          total_submissions: userProfile.total_submissions + 1,
          last_submission_date: today
        });
      } else {
        // Remove from completed_problems
        await supabase
          .from('completed_problems')
          .delete()
          .eq('user_id', user.id)
          .eq('problem_id', problemId);

        // Update user profile
        await updateUserProfile(user.id, {
          problems_solved: Math.max(0, userProfile.problems_solved - 1)
        });
      }

      // Update local state
      setCompletedProblems(prev => {
        if (prev.includes(problemId)) {
          return prev.filter(id => id !== problemId);
        }
        return [...prev, problemId];
      });
    } catch (error) {
      console.error('Error updating problem status:', error);
    }
  };

  return (
    <ProblemContext.Provider value={{
      completedProblems,
      markProblemCompleted,
      dailyStats
    }}>
      {children}
    </ProblemContext.Provider>
  );
};