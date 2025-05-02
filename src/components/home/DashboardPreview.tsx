import React from 'react';

const DashboardPreview: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Welcome back, Coder!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Keep up the great work!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">7</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">42</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 divide-x divide-gray-200 dark:divide-gray-700">
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">32%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">45%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Easy</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">28%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Medium</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">15%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Hard</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Topic Progress</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-400">Arrays</span>
              <span className="text-gray-600 dark:text-gray-400">65%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-400">Linked Lists</span>
              <span className="text-gray-600 dark:text-gray-400">40%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-400">Trees</span>
              <span className="text-gray-600 dark:text-gray-400">25%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Recent Activity</h4>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Completed: Merge Two Sorted Lists</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Completed: Valid Parentheses</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Completed: Two Sum</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
