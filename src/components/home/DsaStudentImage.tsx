import { motion } from 'framer-motion';
import React from 'react';

const DsaStudentImage: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        {/* Background elements */}
        <rect x="0" y="0" width="800" height="600" fill="#f8fafc" opacity="0.1"/>

        {/* Desk */}
        <rect x="150" y="350" width="500" height="20" rx="2" fill="#8b5cf6" opacity="0.8"/>
        <rect x="180" y="370" width="20" height="150" fill="#8b5cf6" opacity="0.8"/>
        <rect x="600" y="370" width="20" height="150" fill="#8b5cf6" opacity="0.8"/>

        {/* Chair */}
        <rect x="300" y="400" width="200" height="20" rx="5" fill="#4f46e5" opacity="0.7"/>
        <rect x="320" y="420" width="20" height="100" fill="#4f46e5" opacity="0.7"/>
        <rect x="460" y="420" width="20" height="100" fill="#4f46e5" opacity="0.7"/>
        <rect x="280" y="380" width="240" height="20" rx="5" fill="#4f46e5" opacity="0.7"/>

        {/* Laptop */}
        <g transform="translate(300, 300) rotate(-10)">
          <rect x="0" y="0" width="200" height="120" rx="5" fill="#1e40af"/>
          <rect x="10" y="10" width="180" height="100" rx="2" fill="#60a5fa"/>

          {/* Code on screen */}
          <rect x="30" y="30" width="140" height="10" rx="2" fill="#ffffff" opacity="0.7"/>
          <rect x="30" y="50" width="100" height="10" rx="2" fill="#ffffff" opacity="0.7"/>
          <rect x="30" y="70" width="120" height="10" rx="2" fill="#ffffff" opacity="0.7"/>
          <rect x="30" y="90" width="80" height="10" rx="2" fill="#ffffff" opacity="0.7"/>

          {/* Laptop base */}
          <rect x="-20" y="120" width="240" height="15" rx="2" fill="#1e40af"/>
        </g>

        {/* Person */}
        {/* Head */}
        <circle cx="400" cy="200" r="50" fill="#fcd34d"/>

        {/* Face */}
        <circle cx="385" cy="190" r="5" fill="#1e3a8a"/>
        <circle cx="415" cy="190" r="5" fill="#1e3a8a"/>
        <path d="M390 220 Q400 230 410 220" stroke="#1e3a8a" strokeWidth="3" fill="none"/>

        {/* Hair */}
        <path d="M350 180 Q400 120 450 180" fill="#1e3a8a"/>

        {/* Body */}
        <path d="M400 250 L380 350 L420 350 Z" fill="#3b82f6"/>

        {/* Arms */}
        <path d="M380 270 L300 320" stroke="#fcd34d" strokeWidth="15" strokeLinecap="round"/>
        <path d="M420 270 L500 320" stroke="#fcd34d" strokeWidth="15" strokeLinecap="round"/>

        {/* Hands on keyboard */}
        <circle cx="300" cy="320" r="10" fill="#fcd34d"/>
        <circle cx="500" cy="320" r="10" fill="#fcd34d"/>

        {/* Data structure visualization */}
        <g transform="translate(500, 200)">
          {/* Tree structure */}
          <circle cx="0" cy="0" r="15" fill="#10b981" stroke="#064e3b" strokeWidth="2"/>
          <circle cx="-30" cy="30" r="15" fill="#10b981" stroke="#064e3b" strokeWidth="2"/>
          <circle cx="30" cy="30" r="15" fill="#10b981" stroke="#064e3b" strokeWidth="2"/>
          <circle cx="-50" cy="60" r="15" fill="#10b981" stroke="#064e3b" strokeWidth="2"/>
          <circle cx="-10" cy="60" r="15" fill="#10b981" stroke="#064e3b" strokeWidth="2"/>

          {/* Connecting lines */}
          <line x1="0" y1="0" x2="-30" y2="30" stroke="#064e3b" strokeWidth="2"/>
          <line x1="0" y1="0" x2="30" y2="30" stroke="#064e3b" strokeWidth="2"/>
          <line x1="-30" y1="30" x2="-50" y2="60" stroke="#064e3b" strokeWidth="2"/>
          <line x1="-30" y1="30" x2="-10" y2="60" stroke="#064e3b" strokeWidth="2"/>
        </g>

        {/* Array visualization */}
        <g transform="translate(250, 180)">
          <rect x="0" y="0" width="30" height="30" fill="#f472b6" stroke="#831843" strokeWidth="2"/>
          <rect x="30" y="0" width="30" height="30" fill="#f472b6" stroke="#831843" strokeWidth="2"/>
          <rect x="60" y="0" width="30" height="30" fill="#f472b6" stroke="#831843" strokeWidth="2"/>
          <rect x="90" y="0" width="30" height="30" fill="#f472b6" stroke="#831843" strokeWidth="2"/>

          {/* Array indices */}
          <text x="15" y="20" fontFamily="Arial" fontSize="12" fill="#831843">1</text>
          <text x="45" y="20" fontFamily="Arial" fontSize="12" fill="#831843">2</text>
          <text x="75" y="20" fontFamily="Arial" fontSize="12" fill="#831843">3</text>
          <text x="105" y="20" fontFamily="Arial" fontSize="12" fill="#831843">4</text>
        </g>

        {/* Thought bubble with algorithm */}
        <g transform="translate(150, 100)">
          <ellipse cx="0" cy="0" rx="70" ry="40" fill="#ffffff" stroke="#6366f1" strokeWidth="2"/>
          <ellipse cx="80" cy="50" rx="20" ry="15" fill="#ffffff" stroke="#6366f1" strokeWidth="2"/>
          <ellipse cx="100" cy="70" rx="10" ry="8" fill="#ffffff" stroke="#6366f1" strokeWidth="2"/>

          {/* Algorithm text */}
          <text x="-50" y="-10" fontFamily="Courier New" fontSize="10" fill="#1e3a8a">function search(arr, x) {'{'}</text>
          <text x="-50" y="5" fontFamily="Courier New" fontSize="10" fill="#1e3a8a">  for(let i = 0; i {'<'} arr.length; i++) {'{'}</text>
          <text x="-50" y="20" fontFamily="Courier New" fontSize="10" fill="#1e3a8a">    if(arr[i] === x) return i;</text>
          <text x="-50" y="35" fontFamily="Courier New" fontSize="10" fill="#1e3a8a">  {'}'}</text>
          <text x="-50" y="50" fontFamily="Courier New" fontSize="10" fill="#1e3a8a">  return -1;</text>
          <text x="-50" y="65" fontFamily="Courier New" fontSize="10" fill="#1e3a8a">{'}'}</text>
        </g>
      </svg>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 bg-blue-500 rounded-full w-8 h-8 opacity-70"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 bg-purple-500 rounded-full w-6 h-6 opacity-70"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/3 left-1/3 bg-green-500 rounded-full w-4 h-4 opacity-70"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
};

export default DsaStudentImage;
