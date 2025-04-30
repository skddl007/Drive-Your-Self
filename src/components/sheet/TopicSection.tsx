import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProblemRow from './ProblemRow';
import { Problem } from '../../types';

interface TopicSectionProps {
  topic: string;
  problems: Problem[];
  completedProblems: string[];
  onMarkCompleted: (problemId: string) => void;
  isAuthenticated: boolean;
}

const TopicSection: React.FC<TopicSectionProps> = ({
  topic,
  problems,
  completedProblems,
  onMarkCompleted,
  isAuthenticated
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const completedCount = problems.filter(p => 
    completedProblems.includes(p.id)
  ).length;
  
  const percentComplete = Math.round((completedCount / problems.length) * 100);
  
  return (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{topic}</h3>
          <div className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
            {problems.length} problems
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-40 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${percentComplete}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {completedCount}/{problems.length}
              </span>
            </div>
          )}
          
          {isExpanded ? (
            <ChevronUp className="text-gray-400" size={20} />
          ) : (
            <ChevronDown className="text-gray-400" size={20} />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-750">
              <tr>
                {isAuthenticated && (
                  <th className="w-16 py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                )}
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Problem
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Companies
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Solve
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {problems.map((problem) => (
                <ProblemRow
                  key={problem.id}
                  problem={problem}
                  isCompleted={completedProblems.includes(problem.id)}
                  onMarkCompleted={onMarkCompleted}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopicSection;