import React from 'react';
import { useProblems } from '../contexts/ProblemContext';
import { useAuth } from '../contexts/AuthContext';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentActivity from '../components/dashboard/RecentActivity';
import ProblemDistribution from '../components/dashboard/ProblemDistribution';
import TopicProgress from '../components/dashboard/TopicProgress';
import { getSdeSheetData, getAdvancedSheetData } from '../data/sheetData';
import { Calendar, Trophy } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { completedProblems, dailyStats } = useProblems();
  const { userProfile } = useAuth();

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Combine both sheets for overall statistics
  const allProblems = [...getSdeSheetData(), ...getAdvancedSheetData()];
  
  // Filter completed problems
  const completed = allProblems.filter(p => completedProblems.includes(p.id));
  
  // Calculate statistics
  const totalProblems = allProblems.length;
  const totalCompleted = completed.length;
  const percentComplete = Math.round((totalCompleted / totalProblems) * 100) || 0;
  
  // Get difficulty counts
  const easyProblems = allProblems.filter(p => p.difficulty.toLowerCase() === 'easy');
  const mediumProblems = allProblems.filter(p => p.difficulty.toLowerCase() === 'medium');
  const hardProblems = allProblems.filter(p => p.difficulty.toLowerCase() === 'hard');
  
  const easyCompleted = completed.filter(p => p.difficulty.toLowerCase() === 'easy').length;
  const mediumCompleted = completed.filter(p => p.difficulty.toLowerCase() === 'medium').length;
  const hardCompleted = completed.filter(p => p.difficulty.toLowerCase() === 'hard').length;
  
  // Group by topic for topic progress
  const topicProgress = allProblems.reduce((acc, problem) => {
    if (!acc[problem.topic]) {
      acc[problem.topic] = { total: 0, completed: 0 };
    }
    
    acc[problem.topic].total += 1;
    
    if (completedProblems.includes(problem.id)) {
      acc[problem.topic].completed += 1;
    }
    
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {userProfile.username}!
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
                <p className="text-xl font-bold text-gray-900 dark:text-white">{userProfile.streak_count} days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-green-500" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{userProfile.longest_streak} days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Solved</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{userProfile.problems_solved}</p>
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
            <p className="text-3xl font-bold text-primary">{dailyStats.problemsSolved}</p>
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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Recent Activity
        </h2>
        <RecentActivity
          completedProblems={completed.slice(0, 10)}
        />
      </div>
    </div>
  );
};

export default DashboardPage;