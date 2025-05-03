import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface SheetCardProps {
  title: string;
  description: string;
  problemCount: number;
  topics: string[];
  path: string;
  icon: React.ReactNode;
  color: string;
}

const SheetCard: React.FC<SheetCardProps> = ({
  title,
  description,
  problemCount,
  topics,
  path,
  icon,
  color
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <div className={`bg-gradient-to-r ${color} px-6 py-4 flex justify-between items-center`}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="bg-white/20 p-2 rounded-full">
          {icon}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">{description}</p>

        <div className="flex items-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
            {problemCount} Problems
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Topics covered:</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={path}
          className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 text-gray-800 dark:text-white mt-auto"
        >
          <span>View Sheet</span>
          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default SheetCard;