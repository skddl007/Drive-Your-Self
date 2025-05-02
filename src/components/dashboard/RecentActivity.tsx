import { Award, Check, Clock, ExternalLink } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Problem } from '../../types';

interface RecentActivityProps {
  completedProblems: Problem[];
  showViewAll?: boolean;
  onViewAllClick?: () => void;
}

// Function to format date in Indian time zone
const formatDateInIndianTimeZone = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  return new Intl.DateTimeFormat('en-IN', options).format(date);
};

const RecentActivity: React.FC<RecentActivityProps> = ({
  completedProblems,
  showViewAll = false,
  onViewAllClick
}) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    // Animate items appearing one by one
    const showItems = async () => {
      const newVisibleItems: number[] = [];

      for (let i = 0; i < completedProblems.length; i++) {
        // Add a small delay between each item
        await new Promise(resolve => setTimeout(resolve, 150));
        newVisibleItems.push(i);
        setVisibleItems([...newVisibleItems]);
      }
    };

    if (completedProblems.length > 0) {
      showItems();
    }
  }, [completedProblems]);

  if (completedProblems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <Clock size={48} className="mb-4 opacity-50 animate-pulse" />
        <p className="text-lg font-medium mb-2">No activity yet</p>
        <p className="text-sm">Start solving problems to see your activity here!</p>
      </div>
    );
  }

  // Get current date for comparison
  const now = new Date();

  // Function to get difficulty color classes
  const getDifficultyClasses = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return {
          bg: 'bg-gradient-to-r from-emerald-400 to-green-500',
          text: 'text-emerald-600 dark:text-emerald-400',
          icon: <Award className="text-emerald-500 dark:text-emerald-400" size={14} />
        };
      case 'medium':
        return {
          bg: 'bg-gradient-to-r from-amber-400 to-yellow-500',
          text: 'text-amber-600 dark:text-amber-400',
          icon: <Award className="text-amber-500 dark:text-amber-400" size={14} />
        };
      case 'hard':
        return {
          bg: 'bg-gradient-to-r from-rose-400 to-red-500',
          text: 'text-rose-600 dark:text-rose-400',
          icon: <Award className="text-rose-500 dark:text-rose-400" size={14} />
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-400 to-indigo-500',
          text: 'text-blue-600 dark:text-blue-400',
          icon: <Award className="text-blue-500 dark:text-blue-400" size={14} />
        };
    }
  };

  return (
    <div className="space-y-4">
      {completedProblems.map((problem, index) => {
        // Create a date based on the index (for demo purposes)
        // In a real app, you would use the actual completion date from the database
        const completionDate = new Date(now);
        completionDate.setHours(now.getHours() - index * 2);

        const difficultyClasses = getDifficultyClasses(problem.difficulty);
        const isVisible = visibleItems.includes(index);

        return (
          <div
            key={problem.id}
            className={`flex items-start gap-4 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700
                      hover:shadow-md transition-all duration-300 transform hover:-translate-y-1
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`p-2 rounded-full mt-1 transition-all duration-300 ${difficultyClasses.bg} text-white`}>
              <Check size={16} />
            </div>

            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <div className="font-medium text-gray-900 dark:text-white transition-colors">
                  {problem.title}
                </div>
                <div className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  {formatDateInIndianTimeZone(completionDate)}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
                <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full text-blue-700 dark:text-blue-300">
                  {problem.topic}
                </span>
                <span className={`flex items-center gap-1 ${difficultyClasses.text} bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full`}>
                  {difficultyClasses.icon}
                  {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                </span>
              </div>
            </div>

            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40
                        text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-md transition-all duration-300
                        flex items-center gap-1 text-sm font-medium hover:shadow-md"
            >
              View
              <ExternalLink size={14} />
            </a>
          </div>
        );
      })}

      {showViewAll && completedProblems.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onViewAllClick}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                      text-white rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                      flex items-center gap-2 font-medium"
          >
            View All Completed Problems
            <ExternalLink size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;