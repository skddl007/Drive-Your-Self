import React from 'react';
import { motion } from 'framer-motion';

interface ContentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition-all duration-300 h-full`}
    >
      <div className={`h-2 ${color}`}></div>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${color.replace('from-', 'bg-').split(' ')[0].replace('-500', '-100')} dark:bg-opacity-20`}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;
