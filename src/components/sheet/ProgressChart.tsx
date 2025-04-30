import React, { useEffect, useState } from 'react';

interface ProgressChartProps {
  percentage: number;
  size: number;
  strokeWidth?: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  percentage,
  size,
  strokeWidth = 8
}) => {
  const [progress, setProgress] = useState(0);
  
  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [percentage]);
  
  const radius = size / 2 - strokeWidth;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  // Color based on progress
  const getColor = () => {
    if (progress < 30) return '#EF4444'; // red-500
    if (progress < 70) return '#F59E0B'; // amber-500
    return '#10B981'; // emerald-500
  };
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Foreground circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressChart;