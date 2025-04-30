import React from 'react';

interface ProblemDistributionProps {
  easyTotal: number;
  easyCompleted: number;
  mediumTotal: number;
  mediumCompleted: number;
  hardTotal: number;
  hardCompleted: number;
}

const ProblemDistribution: React.FC<ProblemDistributionProps> = ({
  easyTotal,
  easyCompleted,
  mediumTotal,
  mediumCompleted,
  hardTotal,
  hardCompleted
}) => {
  const totalProblems = easyTotal + mediumTotal + hardTotal;
  
  // Calculate percentages for the chart
  const easyWidth = (easyTotal / totalProblems) * 100;
  const mediumWidth = (mediumTotal / totalProblems) * 100;
  const hardWidth = (hardTotal / totalProblems) * 100;
  
  // Calculate completion percentages
  const easyCompletionPercent = (easyCompleted / easyTotal) * 100;
  const mediumCompletionPercent = (mediumCompleted / mediumTotal) * 100;
  const hardCompletionPercent = (hardCompleted / hardTotal) * 100;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Problem Distribution & Progress
      </h2>
      
      <div className="flex w-full h-10 rounded-lg overflow-hidden mb-8">
        <div 
          className="bg-green-500 h-full relative group" 
          style={{ width: `${easyWidth}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm">
            Easy
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap mt-2">
            {easyTotal} problems
          </div>
        </div>
        <div 
          className="bg-yellow-500 h-full relative group" 
          style={{ width: `${mediumWidth}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm">
            Medium
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap mt-2">
            {mediumTotal} problems
          </div>
        </div>
        <div 
          className="bg-red-500 h-full relative group" 
          style={{ width: `${hardWidth}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm">
            Hard
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap mt-2">
            {hardTotal} problems
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Easy</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">
              {easyCompleted} / {easyTotal}
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${easyCompletionPercent}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Medium</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">
              {mediumCompleted} / {mediumTotal}
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 rounded-full" 
              style={{ width: `${mediumCompletionPercent}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Hard</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">
              {hardCompleted} / {hardTotal}
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 rounded-full" 
              style={{ width: `${hardCompletionPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDistribution;