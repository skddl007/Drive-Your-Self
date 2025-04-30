import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Brain, Trophy } from 'lucide-react';
import SheetCard from '../components/home/SheetCard';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl mb-12 shadow-lg">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Drive Your Self
          </h1>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Master Data Structures & Algorithms with our curated problem sheets. Track your progress, 
            build confidence, and ace your technical interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/sheet/sde"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 text-lg"
            >
              Explore Sheets
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Choose Your DSA Journey
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <SheetCard 
            title="SDE Sheet"
            description="A carefully curated list of 191 questions to ace your technical interviews. Cover all the essential data structure and algorithm concepts."
            problemCount={191}
            topics={["Arrays", "Linked Lists", "Trees", "Graphs", "DP"]}
            path="/sheet/sde"
            icon={<BookOpen size={28} />}
            color="from-blue-500 to-blue-700"
          />
          <SheetCard 
            title="Basic to Advanced"
            description="Comprehensive collection of 491 problems ranging from fundamental concepts to advanced algorithms, perfect for complete DSA mastery."
            problemCount={491}
            topics={["Arrays", "Strings", "Trees", "Graphs", "DP", "Advanced Algorithms"]}
            path="/sheet/advanced"
            icon={<Code size={28} />}
            color="from-purple-500 to-purple-700"
          />
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg inline-block mb-4">
              <Brain className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Topic-wise Problems
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Problems organized by topics and difficulty levels for structured learning and practice.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg inline-block mb-4">
              <Trophy className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Progress Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track your problem-solving journey with detailed statistics and completion rates.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg inline-block mb-4">
              <Code className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Random Problem Picker
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover new challenges with our random problem picker, perfect for varied practice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;