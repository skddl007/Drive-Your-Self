-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table with extended fields
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  username TEXT NOT NULL,
  email TEXT,
  problems_solved INTEGER DEFAULT 0,
  streak_count INTEGER DEFAULT 0,
  total_submissions INTEGER DEFAULT 0,
  last_submission_date DATE,
  current_streak_start DATE,
  longest_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id),
  UNIQUE(username),
  UNIQUE(email)
);

-- Create daily_activity table
CREATE TABLE IF NOT EXISTS public.daily_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  problems_solved INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, activity_date)
);

-- Create completed_problems table with additional metadata
CREATE TABLE IF NOT EXISTS public.completed_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  difficulty TEXT,
  topic TEXT,
  UNIQUE(user_id, problem_id)
);

-- Create problem_notes table
CREATE TABLE IF NOT EXISTS public.problem_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id TEXT NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, problem_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_notes ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Anyone can view user profiles"
  ON public.user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id AND auth.uid() IS NOT NULL);



-- Completed problems policies
CREATE POLICY "Anyone can view completed problems"
  ON public.completed_problems FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their completed problems"
  ON public.completed_problems FOR INSERT
  WITH CHECK (auth.uid() = user_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their completed problems"
  ON public.completed_problems FOR DELETE
  USING (auth.uid() = user_id AND auth.uid() IS NOT NULL);

-- Daily activity policies
CREATE POLICY "Anyone can view daily activity"
  ON public.daily_activity FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their daily activity"
  ON public.daily_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their daily activity"
  ON public.daily_activity FOR UPDATE
  USING (auth.uid() = user_id AND auth.uid() IS NOT NULL);

-- Problem notes policies
CREATE POLICY "Anyone can view problem notes"
  ON public.problem_notes FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their problem notes"
  ON public.problem_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their problem notes"
  ON public.problem_notes FOR UPDATE
  USING (auth.uid() = user_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their problem notes"
  ON public.problem_notes FOR DELETE
  USING (auth.uid() = user_id AND auth.uid() IS NOT NULL);

-- Function to update streak count
CREATE OR REPLACE FUNCTION public.update_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_activity_date DATE;
  streak_days INTEGER;
BEGIN
  -- Get the last activity date before this one
  SELECT MAX(activity_date)
  INTO last_activity_date
  FROM public.daily_activity
  WHERE user_id = NEW.user_id
    AND activity_date < NEW.activity_date;

  -- If this is the first activity or there was no activity yesterday
  IF last_activity_date IS NULL OR last_activity_date < (NEW.activity_date - INTERVAL '1 day') THEN
    -- Start new streak
    UPDATE public.user_profiles
    SET streak_count = 1,
        current_streak_start = NEW.activity_date
    WHERE user_id = NEW.user_id;
  ELSE
    -- Continue streak
    UPDATE public.user_profiles
    SET streak_count = streak_count + 1,
        longest_streak = GREATEST(longest_streak, streak_count + 1)
    WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating streak on daily activity insert
CREATE TRIGGER update_streak_on_activity
  AFTER INSERT ON public.daily_activity
  FOR EACH ROW
  EXECUTE FUNCTION public.update_streak();

-- Function to update streak count
CREATE OR REPLACE FUNCTION public.update_streak_count()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  streak INTEGER;
BEGIN
  -- Get the last submission date
  SELECT last_submission_date INTO last_date
  FROM public.user_profiles
  WHERE user_id = NEW.user_id;

  -- Get current streak
  SELECT streak_count INTO streak
  FROM public.user_profiles
  WHERE user_id = NEW.user_id;

  -- If this is the first problem or last solved was yesterday, increment streak
  IF last_date IS NULL OR last_date = CURRENT_DATE - INTERVAL '1 day' THEN
    streak := COALESCE(streak, 0) + 1;
  -- If last solved was before yesterday, reset streak to 1
  ELSIF last_date < CURRENT_DATE - INTERVAL '1 day' THEN
    streak := 1;
  END IF;

  -- Update user profile
  UPDATE public.user_profiles
  SET
    last_submission_date = CURRENT_DATE,
    streak_count = streak,
    problems_solved = problems_solved + 1
  WHERE user_id = NEW.user_id;

  -- Update or insert daily activity
  INSERT INTO public.daily_activity (user_id, activity_date, problems_solved)
  VALUES (NEW.user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, activity_date)
  DO UPDATE SET problems_solved = daily_activity.problems_solved + 1;

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updating streak and stats when problem is completed
CREATE TRIGGER update_user_stats_on_problem_completion
  AFTER INSERT ON public.completed_problems
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_streak_count();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updating timestamp
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();
