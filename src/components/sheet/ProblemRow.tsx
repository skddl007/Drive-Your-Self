import React from 'react';
import { ExternalLink, Check, Circle } from 'lucide-react';
import { Problem } from '../../types';

interface ProblemRowProps {
  problem: Problem;
  isCompleted: boolean;
  onMarkCompleted: (problemId: string) => void;
  isAuthenticated: boolean;
}

const ProblemRow: React.FC<ProblemRowProps> = ({
  problem,
  isCompleted,
  onMarkCompleted,
  isAuthenticated
}) => {
  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated) {
      onMarkCompleted(problem.id);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };
  
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200">
      {isAuthenticated && (
        <td className="py-4 px-4">
          <button
            onClick={handleToggleComplete}
            className={`p-1 rounded-full border ${
              isCompleted 
                ? 'bg-green-100 border-green-300 dark:bg-green-900/20 dark:border-green-700'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {isCompleted ? (
              <Check className="text-green-600 dark:text-green-400" size={16} />
            ) : (
              <Circle className="text-gray-400" size={16} />
            )}
          </button>
        </td>
      )}
      
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className={`font-medium ${isCompleted ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
            {problem.title}
          </span>
          {problem.notes && (
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {problem.notes}
            </span>
          )}
        </div>
      </td>
      
      <td className="py-4 px-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </span>
      </td>
      
      <td className="py-4 px-4">
        <div className="flex flex-wrap gap-1">
          {problem.companies?.map((company, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full"
            >
              {company}
            </span>
          ))}
        </div>
      </td>
      
      <td className="py-4 px-4 text-right">
        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <span className="text-sm">Solve</span>
          <ExternalLink size={14} />
        </a>
      </td>
    </tr>
  );
};

export default ProblemRow;