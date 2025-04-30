import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  onTopicFilter: (topic: string | null) => void;
  onDifficultyFilter: (difficulty: string | null) => void;
  selectedTopic: string | null;
  selectedDifficulty: string | null;
  topics: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  onTopicFilter,
  onDifficultyFilter,
  selectedTopic,
  selectedDifficulty,
  topics
}) => {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 sticky top-4 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
        <Filter size={18} className="text-gray-500 dark:text-gray-400" />
        <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Difficulty
        </h4>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                selectedDifficulty === difficulty
                  ? getDifficultyActiveClass(difficulty)
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => onDifficultyFilter(difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Topics
        </h4>
        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`text-left px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                selectedTopic === topic
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => onTopicFilter(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function for difficulty colors
const getDifficultyActiveClass = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
    case 'medium':
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    case 'hard':
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    default:
      return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  }
};

export default FilterBar;