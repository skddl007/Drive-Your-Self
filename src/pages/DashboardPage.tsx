import { BarChart3, Calendar, ExternalLink, Target, TrendingUp, Trophy } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProblemDistribution from '../components/dashboard/ProblemDistribution';
import RecentActivity from '../components/dashboard/RecentActivity';
import TopicProgress from '../components/dashboard/TopicProgress';
import { useAuth } from '../contexts/AuthContext';
import { useProblems } from '../contexts/ProblemContext';
import { getAdvancedSheetData, getSdeSheetData } from '../data/sheetData';

// Add animation states for dashboard components
const DashboardPage: React.FC = () => {
  const [animatedSections, setAnimatedSections] = useState<string[]>([]);
  const { completedProblems, dailyStats } = useProblems();
  const { user, userProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(Date.now()); // Add a key to force re-render

  // Update key when location changes to force re-render
  useEffect(() => {
    setKey(Date.now());
    setAnimatedSections([]);
    setIsLoading(true);
    setRetryCount(0);
  }, [location.pathname]);

  // Add a retry mechanism to handle cases where userProfile is not immediately available
  useEffect(() => {
    console.log('Dashboard page mounted, auth state:', { isAuthenticated, user: !!user, userProfile: !!userProfile });

    if (!isAuthenticated || !user) {
      console.log('User not authenticated, redirecting to login');
      navigate('/login', { replace: true });
      return;
    }

    if (!userProfile && retryCount < 5) {
      console.log(`Waiting for user profile, retry ${retryCount + 1}/5`);
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    // After 5 seconds, stop showing the loading state even if userProfile is not available
    if (retryCount >= 5) {
      console.log('Max retries reached, proceeding without userProfile');
      setIsLoading(false);
    }

    if (userProfile) {
      console.log('User profile loaded, rendering dashboard');
      setIsLoading(false);
    }
  }, [isAuthenticated, user, userProfile, retryCount, navigate]);

  // Add staggered animations for dashboard sections
  useEffect(() => {
    if (!isLoading) {
      const sections = ['header', 'today', 'stats', 'distribution', 'activity'];
      const animateSequentially = async () => {
        for (const section of sections) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setAnimatedSections(prev => [...prev, section]);
        }
      };

      animateSequentially();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-500 border-r-transparent border-b-indigo-600 border-l-transparent mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BarChart3 size={24} className="text-blue-500 animate-pulse" />
            </div>
          </div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-4">Loading your dashboard...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 animate-pulse">Preparing your coding statistics</p>
          <p className="text-xs text-blue-500 mt-2">Dashboard ID: {key}</p>
        </div>
      </div>
    );
  }

  // Get problems from both sheets
  const sdeSheetProblems = getSdeSheetData();
  const advancedSheetProblems = getAdvancedSheetData();

  // Combine and deduplicate problems based on problem ID
  const problemMap = new Map();

  // Add SDE sheet problems to the map
  sdeSheetProblems.forEach(problem => {
    problemMap.set(problem.id, problem);
  });

  // Add Advanced sheet problems to the map (will overwrite duplicates)
  advancedSheetProblems.forEach(problem => {
    problemMap.set(problem.id, problem);
  });

  // Convert map back to array for our unique problems
  const allProblems = Array.from(problemMap.values());

  // Filter completed problems - ensure we have an array even if completedProblems is undefined
  const safeCompletedProblems = completedProblems || [];
  const completed = allProblems.filter(p => {
    // Check if the problem's id or title is in the completed problems list
    return safeCompletedProblems.includes(p.id) || safeCompletedProblems.includes(p.title);
  });

  // Calculate statistics
  const totalProblems = allProblems.length;
  const totalCompleted = completed.length;
  const percentComplete = totalProblems > 0 ? Math.round((totalCompleted / totalProblems) * 100) : 0;

  // Get difficulty counts from deduplicated problems
  const easyProblems = allProblems.filter(p => p.difficulty.toLowerCase() === 'easy');
  const mediumProblems = allProblems.filter(p => p.difficulty.toLowerCase() === 'medium');
  const hardProblems = allProblems.filter(p => p.difficulty.toLowerCase() === 'hard');

  // Count completed problems by difficulty
  const easyCompleted = completed.filter(p => p.difficulty.toLowerCase() === 'easy').length;
  const mediumCompleted = completed.filter(p => p.difficulty.toLowerCase() === 'medium').length;
  const hardCompleted = completed.filter(p => p.difficulty.toLowerCase() === 'hard').length;

  // Group by topic for topic progress
  const topicProgress = allProblems.reduce((acc, problem) => {
    // Ensure the topic exists in our accumulator
    if (!acc[problem.topic]) {
      acc[problem.topic] = { total: 0, completed: 0 };
    }

    // Increment the total count for this topic
    acc[problem.topic].total += 1;

    // Check if this problem is completed
    if (safeCompletedProblems.includes(problem.id) || safeCompletedProblems.includes(problem.title)) {
      acc[problem.topic].completed += 1;
    }

    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  return (
    <div key={key} className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between mb-8 transition-all duration-700 transform
                   ${animatedSections.includes('header') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="mb-6 md:mb-0">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
            Welcome back, {userProfile?.username || 'Coder'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Keep up the great work on your DSA journey!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{userProfile?.streak_count || 0} days</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:bg-green-50 dark:hover:bg-green-900/10">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{userProfile?.longest_streak || 0} days</p>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md p-4 border border-blue-400 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <Trophy className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-white/80">Total Progress</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold text-white">{totalCompleted}</p>
                    <p className="text-sm text-white/80 ml-1">/ {totalProblems}</p>
                    <p className="text-lg font-bold text-white ml-2">{percentComplete}%</p>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-blue-300/30"
                    fill="none"
                    strokeWidth="3"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-current text-white"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${percentComplete}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    strokeLinecap="round"
                    style={{ animation: 'progress 1.5s ease-out forwards' }}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">
                  {percentComplete}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-100 dark:border-gray-700 transition-all duration-700 transform overflow-hidden relative
                   ${animatedSections.includes('today') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
            <Target className="text-indigo-600 dark:text-indigo-400" size={24} />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Today's Progress
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-lg text-white text-center w-full md:w-auto transform transition-all duration-500 hover:scale-105 shadow-lg">
            <p className="text-4xl font-bold mb-1">{Math.min(dailyStats.problemsSolved, 5)}</p>
            <p className="text-sm opacity-90">Problems Solved Today</p>
          </div>
          <div className="h-4 flex-grow bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${Math.min((dailyStats.problemsSolved / 5) * 100, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg text-center w-full md:w-auto shadow-md transform transition-all duration-500 hover:scale-105">
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{Math.min(dailyStats.problemsSolved, 5)}/5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Daily Goal</p>
          </div>
        </div>
      </div>



      {/* Distribution and Topics */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 transition-all duration-700 transform
                   ${animatedSections.includes('distribution') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="lg:col-span-2 transform transition-all duration-500 hover:scale-[1.02]">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Problem Distribution & Progress
              </span>
            </h2>

            <ProblemDistribution
              easyTotal={easyProblems.length}
              easyCompleted={easyCompleted}
              mediumTotal={mediumProblems.length}
              mediumCompleted={mediumCompleted}
              hardTotal={hardProblems.length}
              hardCompleted={hardCompleted}
            />
          </div>
        </div>
        <div className="transform transition-all duration-500 hover:scale-[1.02]">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
                Topic Progress
              </span>
            </h2>

            <TopicProgress topicProgress={topicProgress} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-700 transform overflow-hidden relative
                   ${animatedSections.includes('activity') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
              <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              Recent Activity
            </h2>
          </div>
          {completed.length > 10 && (
            <Link
              to="/completed-problems"
              className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-md transition-all duration-300 flex items-center gap-1 text-sm font-medium hover:shadow-md transform hover:scale-105"
            >
              View all
              <ExternalLink size={14} className="ml-1 animate-pulse" />
            </Link>
          )}
        </div>
        <div className="transform transition-all duration-500 hover:translate-x-1">
          <RecentActivity
            completedProblems={completed.slice(0, 10)}
            showViewAll={completed.length > 10}
            onViewAllClick={() => navigate('/completed-problems')}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;