import React from 'react';

interface DashboardStatsProps {
  title: string;
  count: number;
  total: number;
  percentage: number;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  title,
  count,
  total,
  percentage,
  color
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'from-blue-500 to-blue-600';
      case 'green':
        return 'from-green-500 to-green-600';
      case 'yellow':
        return 'from-yellow-500 to-yellow-600';
      case 'red':
        return 'from-red-500 to-red-600';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className={`h-2 bg-gradient-to-r ${getColorClass()}`}></div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
          {title}
        </h3>
        
        <div className="flex items-end justify-between">
          <div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {count}
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1 text-lg">
              / {total}
            </span>
          </div>
          
          <div className="text-xl font-bold">
            {percentage}%
          </div>
        </div>
        
        <div className="mt-4 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getColorClass()}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;