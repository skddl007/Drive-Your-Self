import { motion } from 'framer-motion';
import { CheckCircle, Mail, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

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
        className="text-center mb-16"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear from you!
          </p>
        </motion.div>
      </motion.section>

      {/* Contact Info Cards */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mb-16"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full inline-flex items-center justify-center mb-4 w-16 h-16">
              <Mail className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Email Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Get in touch with any questions or feedback.
            </p>
            <a href="mailto:ddlsandeep7@gmail.com" className="text-blue-600 dark:text-blue-400 font-medium">
              ddlsandeep7@gmail.com
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full inline-flex items-center justify-center mb-4 w-16 h-16">
              <Phone className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Phone
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Call us for immediate assistance.
            </p>
            <a href="tel:+919982385483" className="text-green-600 dark:text-green-400 font-medium">
              +91 9982 385 483
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full inline-flex items-center justify-center mb-4 w-16 h-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Online Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Get help through our support channels.
            </p>
            <a href="#" className="text-purple-600 dark:text-purple-400 font-medium">
              Submit a Ticket
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mb-20"
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 flex items-center gap-4"
              >
                <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Message Sent!</h3>
                  <p className="text-green-700 dark:text-green-400">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 md:order-2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl h-full">
              <div className="relative h-full min-h-[400px]">
                {/* Decorative elements */}
                <motion.div
                  className="absolute top-10 left-10"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="#3B82F6" fillOpacity="0.2"/>
                    <circle cx="40" cy="40" r="25" fill="#3B82F6" fillOpacity="0.4"/>
                    <circle cx="40" cy="40" r="10" fill="#3B82F6"/>
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute bottom-20 right-10"
                  animate={{
                    y: [0, 20, 0],
                    x: [0, -10, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" rx="10" fill="#8B5CF6" fillOpacity="0.2"/>
                    <rect x="15" y="15" width="30" height="30" rx="5" fill="#8B5CF6" fillOpacity="0.4"/>
                    <rect x="25" y="25" width="10" height="10" rx="2" fill="#8B5CF6"/>
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute top-40 right-20"
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 15, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0L37.3205 10V30L20 40L2.67949 30V10L20 0Z" fill="#10B981" fillOpacity="0.2"/>
                    <path d="M20 10L28.6603 15V25L20 30L11.3397 25V15L20 10Z" fill="#10B981" fillOpacity="0.4"/>
                    <path d="M20 15L23.3301 17.5V22.5L20 25L16.6699 22.5V17.5L20 15Z" fill="#10B981"/>
                  </svg>
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      We're Here to Help!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                      Our support team is just a message away. We typically respond within 24 hours.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>



      {/* FAQ Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Find quick answers to common questions
        </motion.p>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "How can I get started with Drive Your Self?",
              answer: "Getting started is easy! Simply create a free account, choose a problem sheet that matches your goals, and start solving problems. You can track your progress and see your improvement over time."
            },
            {
              question: "Do you offer any discounts for students?",
              answer: "Yes, we offer special discounts for students with a valid student ID. Please contact our support team with your student credentials to receive your discount code."
            },
            {
              question: "How often do you add new problems?",
              answer: "We regularly update our problem sheets with new questions and improve existing ones. We typically add new problems every month to keep the content fresh and relevant."
            },
            {
              question: "Can I suggest a feature or report a bug?",
              answer: "Absolutely! We welcome feedback from our users. You can use the feedback button on any page to suggest features or report bugs. Our team reviews all feedback and works to implement valuable suggestions."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
