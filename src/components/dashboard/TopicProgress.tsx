import React, { useEffect, useState } from 'react';

interface TopicProgressProps {
  topicProgress: Record<string, { total: number; completed: number }>;
}

const TopicProgress: React.FC<TopicProgressProps> = ({ topicProgress }) => {
  const [animatedPercentages, setAnimatedPercentages] = useState<Record<string, number>>({});

  // Sort topics by completion percentage
  const sortedTopics = Object.entries(topicProgress)
    .sort((a, b) => {
      const aPercentage = a[1].total > 0 ? (a[1].completed / a[1].total) * 100 : 0;
      const bPercentage = b[1].total > 0 ? (b[1].completed / b[1].total) * 100 : 0;
      return bPercentage - aPercentage;
    })
    .slice(0, 6); // Show top 6 topics

  // Initialize animated percentages
  useEffect(() => {
    const initialPercentages: Record<string, number> = {};
    sortedTopics.forEach(([topic]) => {
      initialPercentages[topic] = 0;
    });
    setAnimatedPercentages(initialPercentages);

    // Animate percentages
    const duration = 1500; // 1.5 seconds
    const frames = 60;
    const interval = duration / frames;

    let currentFrame = 0;

    const animationTimer = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / frames, 1);

      // Easing function for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

      const newPercentages: Record<string, number> = {};
      sortedTopics.forEach(([topic, { total, completed }]) => {
        const targetPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        newPercentages[topic] = targetPercentage * easedProgress;
      });

      setAnimatedPercentages(newPercentages);

      if (currentFrame >= frames) {
        clearInterval(animationTimer);
      }
    }, interval);

    return () => clearInterval(animationTimer);
  }, [sortedTopics]);

  // Function to get color based on percentage
  const getColorClass = (percentage: number) => {
    if (percentage < 30) return 'from-red-400 to-red-500';
    if (percentage < 70) return 'from-yellow-400 to-yellow-500';
    return 'from-green-400 to-green-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
          Topic Progress
        </span>
      </h2>

      {sortedTopics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium mb-2">No topics yet</p>
          <p className="text-sm text-center">Start solving problems to see your topic progress!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {sortedTopics.map(([topic, { total, completed }]) => {
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
            const colorClass = getColorClass(percentage);

            return (
              <div key={topic} className="transform transition-all duration-300 hover:scale-105">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gray-700 dark:text-gray-300 truncate pr-2 font-medium">
                    {topic}
                  </div>
                  <div className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full font-medium">
                    {completed}/{total} ({percentage}%)
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${animatedPercentages[topic] || 0}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {Object.keys(topicProgress).length > 6 && (
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded-md transition-all duration-300 transform hover:-translate-y-1">
            View all topics
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicProgress;