import { Calendar, ExternalLink, Trophy } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardStats from '../components/dashboard/DashboardStats';
import ProblemDistribution from '../components/dashboard/ProblemDistribution';
import RecentActivity from '../components/dashboard/RecentActivity';
import TopicProgress from '../components/dashboard/TopicProgress';
import { useAuth } from '../contexts/AuthContext';
import { useProblems } from '../contexts/ProblemContext';
import { getAdvancedSheetData, getSdeSheetData } from '../data/sheetData';

const DashboardPage: React.FC = () => {
  const { completedProblems, dailyStats } = useProblems();
  const { user, userProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">This may take a moment</p>
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {userProfile?.username || 'Coder'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Keep up the great work!
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{userProfile?.streak_count || 0} days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-green-500" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{userProfile?.longest_streak || 0} days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Solved</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{totalCompleted}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-primary">{Math.min(dailyStats.problemsSolved, 5)}</p>
            <p className="text-sm text-muted-foreground">Problems Solved Today</p>
          </div>
          <div className="h-2 flex-grow mx-8 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${Math.min((dailyStats.problemsSolved / 5) * 100, 100)}%` }}
            />
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{Math.min(dailyStats.problemsSolved, 5)}/5</p>
            <p className="text-sm text-muted-foreground">Daily Goal</p>
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStats
          title="Total Progress"
          count={totalCompleted}
          total={totalProblems}
          percentage={percentComplete}
          color="blue"
        />
        <DashboardStats
          title="Easy Problems"
          count={easyCompleted}
          total={easyProblems.length}
          percentage={Math.round((easyCompleted / easyProblems.length) * 100) || 0}
          color="green"
        />
        <DashboardStats
          title="Medium Problems"
          count={mediumCompleted}
          total={mediumProblems.length}
          percentage={Math.round((mediumCompleted / mediumProblems.length) * 100) || 0}
          color="yellow"
        />
        <DashboardStats
          title="Hard Problems"
          count={hardCompleted}
          total={hardProblems.length}
          percentage={Math.round((hardCompleted / hardProblems.length) * 100) || 0}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ProblemDistribution
            easyTotal={easyProblems.length}
            easyCompleted={easyCompleted}
            mediumTotal={mediumProblems.length}
            mediumCompleted={mediumCompleted}
            hardTotal={hardProblems.length}
            hardCompleted={hardCompleted}
          />
        </div>
        <div>
          <TopicProgress topicProgress={topicProgress} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          {completed.length > 10 && (
            <Link
              to="/completed-problems"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1"
            >
              View all
              <ExternalLink size={14} />
            </Link>
          )}
        </div>
        <RecentActivity
          completedProblems={completed.slice(0, 10)}
          showViewAll={completed.length > 10}
          onViewAllClick={() => navigate('/completed-problems')}
        />
      </div>
    </div>
  );
};

export default DashboardPage;