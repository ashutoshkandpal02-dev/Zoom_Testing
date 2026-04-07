import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { getAuthHeader } from '@/services/authHeader';
import { useToast } from '@/hooks/use-toast';

const EMOJI_OPTIONS = [
  { emoji: '😄', value: 'very_happy', label: 'Great!' },
  { emoji: '🙂', value: 'happy', label: 'Good' },
  { emoji: '😐', value: 'neutral', label: 'Okay' },
  { emoji: '😕', value: 'sad', label: 'Not great' },
  { emoji: '😞', value: 'very_sad', label: 'Poor' },
];

const CONTEXTUAL_PROMPTS = {
  very_happy: 'What did you enjoy the most?',
  happy: 'What did you find helpful?',
  neutral: 'What could be improved?',
  sad: 'What felt unclear?',
  very_sad: 'What went wrong?',
};

// Map emoji values to rating (1-5 scale)
const EMOJI_TO_RATING = {
  very_happy: 5,
  happy: 4,
  neutral: 3,
  sad: 2,
  very_sad: 1,
};

const LessonCompletionFeedback = ({ lessonId, open, onOpenChange }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSaved, setFeedbackSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const timeoutRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedEmoji(null);
      setFeedbackText('');
      setFeedbackSaved(false);
      setIsSubmitting(false);
      setSubmitError(null);
    }
  }, [open]);

  const handleEmojiSelect = value => {
    setSelectedEmoji(value);
    setSubmitError(null);
  };

  const handleTextChange = e => {
    setFeedbackText(e.target.value);
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    // Validate that emoji (rating) is selected
    if (!selectedEmoji) {
      setSubmitError('Please select a rating first');
      toast({
        title: 'Rating Required',
        description: 'Please select how you felt about this lesson.',
        variant: 'destructive',
      });
      return;
    }

    if (!lessonId) {
      setSubmitError('Lesson ID is missing');
      toast({
        title: 'Error',
        description: 'Unable to submit feedback. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const rating = EMOJI_TO_RATING[selectedEmoji];

      // Prepare feedback data according to backend requirements
      // feedback_text should be null if empty, not empty string
      const feedbackData = {
        rating: rating,
        feedback_text: feedbackText.trim() || null, // Send null if no text (backend expects null)
      };

      const response = await axios.post(
        `${apiBaseUrl}/api/lesson-feedback/lessons/${lessonId}/feedback`,
        feedbackData,
        {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
          },
          withCredentials: true,
        }
      );

      // Backend returns: { success: true, data: feedback, message: '...' }
      const responseData = response.data?.data || response.data;

      // Success
      setFeedbackSaved(true);
      setSelectedEmoji(null);
      setFeedbackText('');

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Auto-hide confirmation after 3 seconds, then close dialog
      timeoutRef.current = setTimeout(() => {
        setFeedbackSaved(false);
        onOpenChange(false);
      }, 3000);

      toast({
        title: 'Feedback Submitted',
        description:
          response.data?.message || 'Thank you for sharing your feedback!',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);

      let errorMessage = 'Failed to submit feedback. Please try again.';

      // Handle validation errors from backend
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        const validationErrors = error.response.data.errors
          .map(err => err.message || err.msg)
          .join(', ');
        errorMessage = validationErrors || errorMessage;
      } else if (error.response?.data?.errorMessage) {
        errorMessage = error.response.data.errorMessage;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSubmitError(errorMessage);

      toast({
        title: 'Submission Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPromptText = () => {
    if (!selectedEmoji) return null;
    return CONTEXTUAL_PROMPTS[selectedEmoji] || 'Share your thoughts';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-left">Lesson Completed</DialogTitle>
              <DialogDescription className="text-left mt-1">
                How was this lesson for you?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          {/* Emoji Selection */}
          <div className="mb-4">
            <div className="flex items-center justify-center gap-3">
              {EMOJI_OPTIONS.map(option => (
                <motion.button
                  key={option.value}
                  onClick={() => handleEmojiSelect(option.value)}
                  className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center
                    text-2xl transition-all duration-200
                    ${
                      selectedEmoji === option.value
                        ? 'bg-white shadow-md scale-110 ring-2 ring-green-400'
                        : 'bg-white/70 hover:bg-white hover:shadow-sm hover:scale-105'
                    }
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={option.label}
                >
                  {option.emoji}
                  {selectedEmoji === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contextual Prompt */}
          <AnimatePresence>
            {selectedEmoji && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-4"
              >
                <p className="text-sm font-medium text-gray-700 text-center mb-3">
                  {getPromptText()}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Input - Always Visible */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="h-4 w-4 inline mr-1" />
              Share your feedback{' '}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <textarea
              value={feedbackText}
              onChange={handleTextChange}
              placeholder="Write your feedback here... (optional)"
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none bg-white"
            />
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-sm text-red-600">{submitError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button - Show when emoji is selected */}
          <AnimatePresence>
            {selectedEmoji && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="mr-2"
                      >
                        <Send className="h-4 w-4" />
                      </motion.div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback Saved Confirmation */}
          <AnimatePresence>
            {feedbackSaved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium mt-4"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Thanks for sharing your feedback</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonCompletionFeedback;
