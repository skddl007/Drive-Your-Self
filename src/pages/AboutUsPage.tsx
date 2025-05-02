import { motion } from 'framer-motion';
import { Award, BookOpen, Code, Heart, Lightbulb, Target, Users, Zap } from 'lucide-react';
import React from 'react';

const AboutUsPage: React.FC = () => {
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

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-20"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            About <span className="text-blue-600 dark:text-blue-400">Drive Your Self</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            We're on a mission to make learning Data Structures and Algorithms accessible,
            engaging, and effective for everyone.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 animate-gradient-x"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-8 opacity-80">
              <BookOpen size={64} className="text-white" />
              <Code size={64} className="text-white" />
              <Award size={64} className="text-white" />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Story
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Drive Your Self was born from a simple observation: learning Data Structures and Algorithms
              can be overwhelming, especially when preparing for technical interviews.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our founders, who experienced this challenge firsthand during their job searches,
              decided to create a platform that would make the learning process more structured,
              engaging, and effective.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Today, we're proud to help thousands of developers master DSA concepts, track their
              progress, and succeed in their technical interviews through our carefully curated
              problem sheets and intuitive learning tools.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl"
          >
            <div className="relative h-full min-h-[300px] flex items-center justify-center">
              <motion.div
                className="absolute"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Lightbulb size={120} className="text-blue-500 dark:text-blue-400 opacity-80" />
              </motion.div>
              <motion.div
                className="absolute top-1/4 left-1/4"
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Code size={40} className="text-purple-500 dark:text-purple-400 opacity-60" />
              </motion.div>
              <motion.div
                className="absolute bottom-1/4 right-1/4"
                animate={{
                  y: [0, 15, 0],
                  x: [0, -10, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <Target size={50} className="text-green-500 dark:text-green-400 opacity-70" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Our Values
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          These core principles guide everything we do
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg inline-block mb-4">
              <Users className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Accessibility
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe quality education should be accessible to everyone, regardless of background or experience level.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg inline-block mb-4">
              <Zap className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Innovation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We continuously improve our platform with innovative features that enhance the learning experience.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg inline-block mb-4">
              <Heart className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We foster a supportive community where learners can grow together and help each other succeed.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Join Our Community
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Be part of our growing community of learners and take your DSA skills to the next level.
        </p>
        <a
          href="/register"
          className="inline-block px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
        >
          Get Started Today
        </a>
      </motion.section>
    </div>
  );
};

export default AboutUsPage;
