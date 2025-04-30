import React from 'react';
import { Check, Clock } from 'lucide-react';
import { Problem } from '../../types';

interface RecentActivityProps {
  completedProblems: Problem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ completedProblems }) => {
  if (completedProblems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <Clock size={48} className="mb-4 opacity-50" />
        <p className="text-lg font-medium mb-2">No activity yet</p>
        <p className="text-sm">Start solving problems to see your activity here!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {completedProblems.map((problem, index) => (
        <div 
          key={problem.id}
          className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
        >
          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mt-1">
            <Check className="text-green-600 dark:text-green-500" size={16} />
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <div className="font-medium text-gray-900 dark:text-white">
                {problem.title}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {/* In a real app, we would show an actual date */}
                {index === 0 ? 'Today' : index === 1 ? 'Yesterday' : `${index + 1} days ago`}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {problem.topic} - {problem.difficulty}
            </div>
          </div>
          
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline whitespace-nowrap"
          >
            View Problem
          </a>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;