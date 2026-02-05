import React, { useState } from 'react';
import axios from '../utils/axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  StarIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      return setError('Please enter your name.');
    }
    if (!email.trim()) {
      return setError('Please enter your email.');
    }
    if (!rating) {
      return setError('Please select a rating.');
    }
    if (!comment.trim()) {
      return setError('Please enter your feedback.');
    }

    setIsSubmitting(true);
    try {
      await axios.post('/feedback', {
        name,
        email,
        rating,
        message: comment
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setRating(0);
      setComment('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setRating(0);
    setHoverRating(0);
    setComment('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Decorative header */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600"
        />

        <div className="p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-indigo-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Experience</h2>
            <p className="text-gray-600">We value your feedback to improve our services.</p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <CheckCircleIcon className="w-16 h-16 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  Your feedback has been submitted successfully.
                </p>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ArrowPathIcon className="w-5 h-5 mr-2" />
                  Submit Another Feedback
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                    How would you rate your experience?
                  </label>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <StarIcon
                          className={`w-10 h-10 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1 px-2">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    placeholder="What did you like or what could we improve?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  ></textarea>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-md ${
                      isSubmitting
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    } text-white font-semibold transition-all duration-300`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Feedback <PaperAirplaneIcon className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Feedback;
