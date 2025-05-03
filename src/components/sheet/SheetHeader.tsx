import { BarChart, Shuffle } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProgressChart from './ProgressChart';

interface SheetHeaderProps {
  title: string;
  totalProblems: number;
  completedProblems: number;
  isAuthenticated: boolean;
  onRandomProblem: () => void;
}

const SheetHeader: React.FC<SheetHeaderProps> = ({
  title,
  totalProblems,
  completedProblems,
  isAuthenticated,
  onRandomProblem
}) => {
  const percentComplete = Math.round((completedProblems / totalProblems) * 100) || 0;
  const location = useLocation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
      <div className="md:flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Master these carefully curated problems to excel in technical interviews.
          </p>

          <div className="flex flex-wrap gap-4 mb-6 md:mb-0">
            <button
              onClick={onRandomProblem}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
            >
              <Shuffle size={16} />
              <span>Random Problem</span>
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
              >
                <BarChart size={16} />
                <span>View Dashboard</span>
              </Link>
            ) : (
              <Link
                to={`/login?redirectTo=${location.pathname}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
              >
                <span>Login to Track Progress</span>
              </Link>
            )}
          </div>
        </div>

        {isAuthenticated && (
          <div className="mt-6 md:mt-0 flex flex-col items-center">
            <ProgressChart
              percentage={percentComplete}
              size={120}
            />
            <div className="mt-3 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedProblems}/{totalProblems}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                problems completed
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SheetHeader;