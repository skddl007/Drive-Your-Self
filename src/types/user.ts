export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  email?: string;
  full_name?: string;
  problems_solved: number;
  streak_count: number;
  total_submissions: number;
  last_submission_date?: string;
  current_streak_start?: string;
  longest_streak: number;
  created_at: string;
  updated_at: string;
}
