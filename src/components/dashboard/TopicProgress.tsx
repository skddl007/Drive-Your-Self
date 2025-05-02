import React from 'react';

interface TopicProgressProps {
  topicProgress: Record<string, { total: number; completed: number }>;
}

const TopicProgress: React.FC<TopicProgressProps> = ({ topicProgress }) => {
  // Sort topics by completion percentage
  const sortedTopics = Object.entries(topicProgress)
    .sort((a, b) => {
      const aPercentage = a[1].total > 0 ? (a[1].completed / a[1].total) * 100 : 0;
      const bPercentage = b[1].total > 0 ? (b[1].completed / b[1].total) * 100 : 0;
      return bPercentage - aPercentage;
    })
    .slice(0, 6); // Show top 6 topics

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Topic Progress
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

            return (
              <div key={topic}>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gray-700 dark:text-gray-300 truncate pr-2">
                    {topic}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {completed}/{total} ({percentage}%)
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {Object.keys(topicProgress).length > 6 && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
            View all topics
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicProgress;