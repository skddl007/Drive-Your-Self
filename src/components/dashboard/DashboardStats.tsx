import React, { useEffect, useState } from 'react';

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
  const [animatedCount, setAnimatedCount] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    // Animate count from 0 to actual value
    const countDuration = 1500; // 1.5 seconds
    const countFrames = 60;
    const countIncrement = count / countFrames;
    let currentCount = 0;

    const countInterval = setInterval(() => {
      currentCount += countIncrement;
      if (currentCount >= count) {
        setAnimatedCount(count);
        clearInterval(countInterval);
      } else {
        setAnimatedCount(Math.floor(currentCount));
      }
    }, countDuration / countFrames);

    // Animate percentage from 0 to actual value
    const percentDuration = 1500; // 1.5 seconds
    const percentFrames = 60;
    const percentIncrement = percentage / percentFrames;
    let currentPercent = 0;

    const percentInterval = setInterval(() => {
      currentPercent += percentIncrement;
      if (currentPercent >= percentage) {
        setAnimatedPercentage(percentage);
        clearInterval(percentInterval);
      } else {
        setAnimatedPercentage(Math.floor(currentPercent));
      }
    }, percentDuration / percentFrames);

    return () => {
      clearInterval(countInterval);
      clearInterval(percentInterval);
    };
  }, [count, percentage]);

  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return {
          gradient: 'from-blue-500 to-blue-600',
          shadow: 'shadow-blue-500/20',
          text: 'text-blue-600 dark:text-blue-400',
          hover: 'hover:shadow-blue-500/40'
        };
      case 'green':
        return {
          gradient: 'from-green-500 to-green-600',
          shadow: 'shadow-green-500/20',
          text: 'text-green-600 dark:text-green-400',
          hover: 'hover:shadow-green-500/40'
        };
      case 'yellow':
        return {
          gradient: 'from-yellow-500 to-yellow-600',
          shadow: 'shadow-yellow-500/20',
          text: 'text-yellow-600 dark:text-yellow-400',
          hover: 'hover:shadow-yellow-500/40'
        };
      case 'red':
        return {
          gradient: 'from-red-500 to-red-600',
          shadow: 'shadow-red-500/20',
          text: 'text-red-600 dark:text-red-400',
          hover: 'hover:shadow-red-500/40'
        };
    }
  };

  const colorClasses = getColorClass();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-1 ${colorClasses.hover}`}>
      <div className={`h-3 bg-gradient-to-r ${colorClasses.gradient}`}></div>
      <div className="p-6">
        <h3 className={`text-lg font-medium ${colorClasses.text} mb-4 flex items-center`}>
          {title}
        </h3>

        <div className="flex items-end justify-between">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300">
              {animatedCount}
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1 text-lg">
              / {total}
            </span>
          </div>

          <div className={`text-xl font-bold ${colorClasses.text} transition-all duration-300`}>
            {animatedPercentage}%
          </div>
        </div>

        <div className="mt-4 w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full bg-gradient-to-r ${colorClasses.gradient} transition-all duration-1000 ease-out rounded-full`}
            style={{ width: `${animatedPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;