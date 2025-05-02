import { motion } from 'framer-motion';
import { ArrowRight, BarChart, BookOpen, Brain, CheckCircle, Clock, Code, Lightbulb, Star, Target, Trophy, Users, Zap } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentCard from '../components/home/ContentCard';
import DashboardPreview from '../components/home/DashboardPreview';
import DsaStudentImage from '../components/home/DsaStudentImage';
import SheetCard from '../components/home/SheetCard';

const HomePage: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section with DSA Student Image */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative rounded-3xl mb-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 animate-gradient-x"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIj48L3JlY3Q+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIj48L3JlY3Q+PC9zdmc+')]"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {/* Content Column */}
          <div className="p-12 md:p-16 flex flex-col justify-center">
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Master DSA with Confidence
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Drive Your <span className="text-yellow-300">Success</span> in DSA
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-white/90 mb-10 leading-relaxed">
              Master Data Structures & Algorithms with our curated problem sheets. Track your progress,
              build confidence, and ace your technical interviews.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="group px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/sheet/sde"
                className="px-8 py-4 bg-blue-700/30 backdrop-blur-sm border border-white/30 text-white font-medium rounded-lg hover:bg-blue-700/50 transition-all duration-300 text-lg"
              >
                Explore Sheets
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-300" />
                <span className="text-white/80 text-sm">600+ Problems</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-green-300" />
                <span className="text-white/80 text-sm">10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-green-300" />
                <span className="text-white/80 text-sm">Top Companies</span>
              </div>
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative w-full h-full"
            >
              <DsaStudentImage />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Benefits Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mb-16"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <ContentCard
              title="Structured Learning Path"
              description="Follow a carefully designed learning path that takes you from basics to advanced concepts."
              icon={<Target className="text-blue-600 dark:text-blue-400" size={24} />}
              color="from-blue-500 to-blue-600"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ContentCard
              title="Interactive Problem Solving"
              description="Practice with real-world problems that reinforce your understanding of DSA concepts."
              icon={<Lightbulb className="text-purple-600 dark:text-purple-400" size={24} />}
              color="from-purple-500 to-purple-600"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ContentCard
              title="Track Your Progress"
              description="Monitor your improvement with detailed statistics and visualizations."
              icon={<BarChart className="text-green-600 dark:text-green-400" size={24} />}
              color="from-green-500 to-green-600"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Dashboard Preview Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
        className="mb-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Track Your Progress
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our intuitive dashboard helps you visualize your journey and stay motivated with real-time statistics.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </motion.section>

      {/* Journey Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mb-24"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Choose Your DSA Journey
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Select the path that matches your goals and experience level
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <SheetCard
              title="SDE Sheet"
              description="A carefully curated list of 191 questions to ace your technical interviews. Cover all the essential data structure and algorithm concepts."
              problemCount={191}
              topics={["Arrays", "Linked Lists", "Trees", "Graphs", "DP"]}
              path="/sheet/sde"
              icon={<BookOpen size={28} />}
              color="from-blue-500 to-blue-700"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SheetCard
              title="Basic to Advanced"
              description="Comprehensive collection of 491 problems ranging from fundamental concepts to advanced algorithms, perfect for complete DSA mastery."
              problemCount={491}
              topics={["Arrays", "Strings", "Trees", "Graphs", "DP", "Advanced Algorithms"]}
              path="/sheet/advanced"
              icon={<Code size={28} />}
              color="from-purple-500 to-purple-700"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mb-24"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Powerful Features
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Everything you need to master Data Structures & Algorithms
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg border border-blue-100 dark:border-blue-900/30"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg inline-block mb-4">
              <Brain className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Topic-wise Problems
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Problems organized by topics and difficulty levels for structured learning and practice.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg border border-green-100 dark:border-green-900/30"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg inline-block mb-4">
              <BarChart className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Progress Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track your problem-solving journey with detailed statistics and completion rates.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30"
          >
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg inline-block mb-4">
              <Zap className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Daily Challenges
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stay consistent with daily problem challenges and build a streak to maintain momentum.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Additional Features */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mb-24"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mt-1">
                    <CheckCircle className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      Problem Notes
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Add personal notes to problems for future reference and revision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mt-1">
                    <Clock className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      Revision Reminders
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Get reminded to revisit problems at optimal intervals for better retention.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mt-1">
                    <Trophy className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      Achievement System
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Earn badges and achievements as you progress through your DSA journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Supercharge Your Learning
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our platform is designed to help you learn efficiently and effectively with features that enhance your study experience.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Take notes, set reminders, and track your achievements to stay motivated throughout your journey.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Start Learning Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Master Data Structures & Algorithms?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of developers who have accelerated their learning and career with our platform.
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
        >
          Create Free Account
        </Link>
      </motion.section>
    </div>
  );
};

export default HomePage;