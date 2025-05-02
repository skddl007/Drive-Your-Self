import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useProblems } from '../contexts/ProblemContext';
import { getAdvancedSheetData, getSdeSheetData } from '../data/sheetData';

const CompletedProblemsPage: React.FC = () => {
  const { completedProblems } = useProblems();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get all problems from both sheets
  const sdeSheetProblems = getSdeSheetData();
  const advancedSheetProblems = getAdvancedSheetData();
  
  // Combine and deduplicate problems based on problem ID
  const problemMap = new Map();
  
  // Add SDE sheet problems to the map
  sdeSheetProblems.forEach(problem => {
    problemMap.set(problem.id, problem);
  });
  
  // Add Advanced sheet problems to the map (will overwrite duplicates)
  advancedSheetProblems.forEach(problem => {
    problemMap.set(problem.id, problem);
  });
  
  // Convert map back to array for our unique problems
  const allProblems = Array.from(problemMap.values());

  // Filter completed problems
  const safeCompletedProblems = completedProblems || [];
  const completed = allProblems.filter(p => {
    return safeCompletedProblems.includes(p.id) || safeCompletedProblems.includes(p.title);
  });

  // Get unique topics for filter
  const topics = Array.from(new Set(completed.map(p => p.topic))).sort();

  // Apply filters and search
  const filteredProblems = completed.filter(problem => {
    // Apply difficulty filter
    if (filterDifficulty !== 'all' && problem.difficulty !== filterDifficulty) {
      return false;
    }
    
    // Apply topic filter
    if (filterTopic !== 'all' && problem.topic !== filterTopic) {
      return false;
    }
    
    // Apply search query
    if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <Link to="/dashboard" className="text-blue-600 dark:text-blue-400 flex items-center gap-2 hover:underline mb-4">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Completed Problems
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View and filter all the problems you've completed
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by Difficulty
            </label>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by Topic
            </label>
            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Topics</option>
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search Problems
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by problem name..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {filteredProblems.length} {filteredProblems.length === 1 ? 'Problem' : 'Problems'} Found
          </h2>
        </div>
        
        <RecentActivity completedProblems={filteredProblems} />
      </div>
    </div>
  );
};

export default CompletedProblemsPage;
