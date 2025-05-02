import { Check, Clock, ExternalLink } from 'lucide-react';
import React from 'react';
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
  if (completedProblems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <Clock size={48} className="mb-4 opacity-50" />
        <p className="text-lg font-medium mb-2">No activity yet</p>
        <p className="text-sm">Start solving problems to see your activity here!</p>
      </div>
    );
  }

  // Get current date for comparison
  const now = new Date();

  return (
    <div className="space-y-4">
      {completedProblems.map((problem, index) => {
        // Create a date based on the index (for demo purposes)
        // In a real app, you would use the actual completion date from the database
        const completionDate = new Date(now);
        completionDate.setHours(now.getHours() - index * 2);

        return (
          <div
            key={problem.id}
            className="flex items-start gap-4 p-4 rounded-lg transition-colors duration-200
                      hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mt-1 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors">
              <Check className="text-green-600 dark:text-green-400" size={16} />
            </div>

            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {problem.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {formatDateInIndianTimeZone(completionDate)}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                {problem.topic} - <span className={`
                  ${problem.difficulty === 'easy' ? 'text-green-600 dark:text-green-400' : ''}
                  ${problem.difficulty === 'medium' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                  ${problem.difficulty === 'hard' ? 'text-red-600 dark:text-red-400' : ''}
                `}>{problem.difficulty}</span>
              </div>
            </div>

            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline whitespace-nowrap flex items-center gap-1 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
            >
              View Problem
              <ExternalLink size={14} />
            </a>
          </div>
        );
      })}

      {showViewAll && completedProblems.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onViewAllClick}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-700 dark:text-blue-300 rounded-md transition-colors flex items-center gap-2"
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