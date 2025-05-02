import React, { useEffect, useState } from 'react';

interface ProblemDistributionProps {
  easyTotal: number;
  easyCompleted: number;
  mediumTotal: number;
  mediumCompleted: number;
  hardTotal: number;
  hardCompleted: number;
}

interface DifficultyData {
  label: string;
  total: number;
  completed: number;
  color: string;
  gradient: string;
  hoverGradient: string;
  textColor: string;
}

const ProblemDistribution: React.FC<ProblemDistributionProps> = ({
  easyTotal,
  easyCompleted,
  mediumTotal,
  mediumCompleted,
  hardTotal,
  hardCompleted
}) => {
  const [animatedWidths, setAnimatedWidths] = useState({
    easy: 0,
    medium: 0,
    hard: 0
  });

  const [animatedCompletions, setAnimatedCompletions] = useState({
    easy: 0,
    medium: 0,
    hard: 0
  });

  const totalProblems = easyTotal + mediumTotal + hardTotal;

  // Calculate percentages for the chart (handle division by zero)
  const easyWidth = totalProblems > 0 ? (easyTotal / totalProblems) * 100 : 0;
  const mediumWidth = totalProblems > 0 ? (mediumTotal / totalProblems) * 100 : 0;
  const hardWidth = totalProblems > 0 ? (hardTotal / totalProblems) * 100 : 0;

  // Calculate completion percentages (handle division by zero)
  const easyCompletionPercent = easyTotal > 0 ? (easyCompleted / easyTotal) * 100 : 0;
  const mediumCompletionPercent = mediumTotal > 0 ? (mediumCompleted / mediumTotal) * 100 : 0;
  const hardCompletionPercent = hardTotal > 0 ? (hardCompleted / hardTotal) * 100 : 0;

  // Animate the progress bars
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const frames = 60;
    const interval = duration / frames;

    let currentFrame = 0;

    const animationTimer = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / frames, 1);

      // Easing function for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

      setAnimatedWidths({
        easy: easyWidth * easedProgress,
        medium: mediumWidth * easedProgress,
        hard: hardWidth * easedProgress
      });

      setAnimatedCompletions({
        easy: easyCompletionPercent * easedProgress,
        medium: mediumCompletionPercent * easedProgress,
        hard: hardCompletionPercent * easedProgress
      });

      if (currentFrame >= frames) {
        clearInterval(animationTimer);
      }
    }, interval);

    return () => clearInterval(animationTimer);
  }, [easyWidth, mediumWidth, hardWidth, easyCompletionPercent, mediumCompletionPercent, hardCompletionPercent]);

  // Define difficulty data
  const difficulties: DifficultyData[] = [
    {
      label: 'Easy',
      total: easyTotal,
      completed: easyCompleted,
      color: 'bg-gradient-to-r from-emerald-400 to-green-500',
      gradient: 'bg-gradient-to-r from-emerald-400 to-green-500',
      hoverGradient: 'hover:from-emerald-500 hover:to-green-600',
      textColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      label: 'Medium',
      total: mediumTotal,
      completed: mediumCompleted,
      color: 'bg-gradient-to-r from-amber-400 to-yellow-500',
      gradient: 'bg-gradient-to-r from-amber-400 to-yellow-500',
      hoverGradient: 'hover:from-amber-500 hover:to-yellow-600',
      textColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      label: 'Hard',
      total: hardTotal,
      completed: hardCompleted,
      color: 'bg-gradient-to-r from-rose-400 to-red-500',
      gradient: 'bg-gradient-to-r from-rose-400 to-red-500',
      hoverGradient: 'hover:from-rose-500 hover:to-red-600',
      textColor: 'text-rose-600 dark:text-rose-400'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Problem Distribution & Progress
        </span>
      </h2>

      {/* Distribution Bar */}
      <div className="flex w-full h-12 rounded-lg overflow-hidden mb-8 shadow-md">
        <div
          className="bg-gradient-to-r from-emerald-400 to-green-500 h-full relative group transition-all duration-500"
          style={{ width: `${animatedWidths.easy}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm">
            Easy
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap mt-2">
            {easyTotal} problems
          </div>
        </div>
        <div
          className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full relative group transition-all duration-500"
          style={{ width: `${animatedWidths.medium}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm">
            Medium
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap mt-2">
            {mediumTotal} problems
          </div>
        </div>
        <div
          className="bg-gradient-to-r from-rose-400 to-red-500 h-full relative group transition-all duration-500"
          style={{ width: `${animatedWidths.hard}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm">
            Hard
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap mt-2">
            {hardTotal} problems
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {difficulties.map((diff, index) => (
          <div
            key={diff.label}
            className={`rounded-lg p-4 shadow-md transition-all duration-300 transform hover:-translate-y-1 ${diff.gradient} ${diff.hoverGradient}`}
          >
            <div className="text-white">
              <div className="font-bold text-lg mb-1">{diff.label}</div>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{diff.completed} / {diff.total}</div>
                <div className="text-lg font-semibold">
                  {Math.round(diff.total > 0 ? (diff.completed / diff.total) * 100 : 0)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="space-y-6 mt-6">
        {difficulties.map((diff, index) => (
          <div key={diff.label} className="transform transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${diff.gradient}`}></div>
                <span className={`font-medium ${diff.textColor}`}>{diff.label}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                {diff.completed} / {diff.total}
              </div>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full ${diff.gradient} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${index === 0 ? animatedCompletions.easy : index === 1 ? animatedCompletions.medium : animatedCompletions.hard}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemDistribution;