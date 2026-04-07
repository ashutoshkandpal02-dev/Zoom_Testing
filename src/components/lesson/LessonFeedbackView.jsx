import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Star, Calendar, User, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { getAuthHeader } from '@/services/authHeader';

// Map rating (1-5) to emoji display
const RATING_TO_EMOJI = {
  5: {
    emoji: '😄',
    label: 'Great!',
    color: 'text-green-600',
    value: 'very_happy',
  },
  4: { emoji: '🙂', label: 'Good', color: 'text-blue-600', value: 'happy' },
  3: { emoji: '😐', label: 'Okay', color: 'text-yellow-600', value: 'neutral' },
  2: {
    emoji: '😕',
    label: 'Not great',
    color: 'text-orange-600',
    value: 'sad',
  },
  1: { emoji: '😞', label: 'Poor', color: 'text-red-600', value: 'very_sad' },
};

const EMOJI_MAP = {
  very_happy: RATING_TO_EMOJI[5],
  happy: RATING_TO_EMOJI[4],
  neutral: RATING_TO_EMOJI[3],
  sad: RATING_TO_EMOJI[2],
  very_sad: RATING_TO_EMOJI[1],
};

const LessonFeedbackView = ({ lessonId, lessonTitle, open, onOpenChange }) => {
  const [feedback, setFeedback] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState(null);
  const isInitialMount = useRef(true);

  // Fetch feedback when dialog opens or lessonId changes
  useEffect(() => {
    if (open && lessonId) {
      // Reset to page 1 when dialog opens or lesson changes
      setCurrentPage(1);
      setSelectedRating(null);
      fetchFeedback(1, null);
      isInitialMount.current = true;
    } else {
      // Reset state when dialog closes
      setFeedback([]);
      setStatistics(null);
      setPagination(null);
      setError(null);
      setCurrentPage(1);
      setSelectedRating(null);
      isInitialMount.current = true;
    }
  }, [open, lessonId]);

  // Refetch when rating filter changes (only if dialog is already open)
  useEffect(() => {
    // Skip on initial mount to prevent duplicate call
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only refetch if dialog is open and we're changing the filter (not on initial mount)
    if (open && lessonId) {
      // Reset to page 1 when filter changes
      setCurrentPage(1);
      fetchFeedback(1, selectedRating);
    }
  }, [selectedRating]);

  const fetchFeedback = async (page = 1, ratingFilter = null) => {
    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
      });

      if (ratingFilter) {
        params.append('rating', ratingFilter.toString());
      }

      const response = await axios.get(
        `${apiBaseUrl}/api/lesson-feedback/lessons/${lessonId}/feedback?${params.toString()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
          },
          withCredentials: true,
        }
      );

      // Backend returns: { success: true, data: { feedback: [], pagination: {}, statistics: {} }, message: '...' }
      // Handle both wrapped response (response.data.data) and direct response (response.data)
      const responseData = response.data?.data || response.data;

      if (responseData) {
        // Transform backend data to frontend format
        const feedbackList = (responseData.feedback || []).map(item => ({
          id: item.id,
          rating: item.rating,
          emoji: RATING_TO_EMOJI[item.rating]?.value || 'neutral',
          text: item.feedback_text || item.feedbackText || '',
          createdAt: item.created_at || item.createdAt || item.created_at,
          user: {
            id: item.user?.id,
            name:
              item.user?.first_name && item.user?.last_name
                ? `${item.user.first_name} ${item.user.last_name}`.trim()
                : item.user?.first_name ||
                  item.user?.last_name ||
                  item.user?.name ||
                  'Anonymous User',
            email: item.user?.email || '',
            image: item.user?.image || null,
          },
        }));

        setFeedback(feedbackList);

        // Set statistics with proper defaults
        setStatistics({
          averageRating: responseData.statistics?.averageRating || 0,
          totalRatings:
            responseData.statistics?.totalRatings || feedbackList.length,
          ratingDistribution: responseData.statistics?.ratingDistribution || {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
        });

        // Set pagination with proper defaults
        setPagination({
          page: responseData.pagination?.page || page,
          limit: responseData.pagination?.limit || 20,
          total: responseData.pagination?.total || feedbackList.length,
          totalPages: responseData.pagination?.totalPages || 1,
        });

        setCurrentPage(responseData.pagination?.page || page);
      } else {
        // No data returned
        setFeedback([]);
        setStatistics({
          averageRating: 0,
          totalRatings: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        });
        setPagination({
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 1,
        });
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);

      let errorMessage = 'Failed to load feedback. Please try again.';
      if (err.response?.data?.errorMessage) {
        errorMessage = err.response.data.errorMessage;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setFeedback([]);
      setStatistics(null);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = dateString => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEmojiData = ratingOrEmojiValue => {
    // Handle both rating (1-5) and emoji value (very_happy, etc.)
    if (typeof ratingOrEmojiValue === 'number') {
      return RATING_TO_EMOJI[ratingOrEmojiValue] || RATING_TO_EMOJI[3];
    }
    return EMOJI_MAP[ratingOrEmojiValue] || RATING_TO_EMOJI[3];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-left">Lesson Feedback</DialogTitle>
              <DialogDescription className="text-left mt-1">
                {lessonTitle || 'View feedback for this lesson'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Loading feedback...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-sm text-red-600 mb-4">{error}</p>
              <button
                onClick={() => fetchFeedback(currentPage, selectedRating)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium px-4 py-2 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : !feedback || feedback.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No feedback yet
              </h3>
              <p className="text-sm text-gray-600">
                Students haven't submitted feedback for this lesson yet.
              </p>
            </div>
          ) : (
            <>
              {/* Feedback Statistics */}
              {statistics && (
                <Card className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">
                          Feedback Summary
                        </h3>
                        <p className="text-xs text-gray-600">
                          {statistics.totalRatings || 0} total feedback
                          {statistics.averageRating > 0 && (
                            <> • Avg: {statistics.averageRating.toFixed(1)}/5</>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {[5, 4, 3, 2, 1].map(rating => {
                        const emojiData = RATING_TO_EMOJI[rating];
                        const count =
                          statistics.ratingDistribution?.[rating] || 0;
                        return (
                          <button
                            key={rating}
                            onClick={() =>
                              setSelectedRating(
                                selectedRating === rating ? null : rating
                              )
                            }
                            className={`text-center p-2 rounded-lg border transition-all ${
                              selectedRating === rating
                                ? 'bg-blue-100 border-blue-400 shadow-sm'
                                : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-2xl mb-1">
                              {emojiData.emoji}
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {count}
                            </div>
                            <div className="text-xs text-gray-600">
                              {emojiData.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {selectedRating && (
                      <div className="text-center">
                        <button
                          onClick={() => setSelectedRating(null)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Clear filter
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Feedback List */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  All Feedback ({feedback.length})
                </h3>
                <AnimatePresence>
                  {feedback.map((item, index) => {
                    const emojiData = getEmojiData(item.rating || item.emoji);
                    return (
                      <motion.div
                        key={item.id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              {/* Emoji */}
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-2xl">
                                  {emojiData.emoji}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <User className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-900">
                                        {item.user?.name || 'Anonymous User'}
                                      </span>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${emojiData.color} border-current`}
                                      >
                                        {emojiData.label} (
                                        {item.rating || 'N/A'}/5)
                                      </Badge>
                                    </div>
                                    {item.user?.email && (
                                      <p className="text-xs text-gray-500">
                                        {item.user.email}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatDate(item.createdAt)}</span>
                                  </div>
                                </div>

                                {item.text && item.text.trim() && (
                                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                      {item.text}
                                    </p>
                                  </div>
                                )}

                                {(!item.text || !item.text.trim()) && (
                                  <p className="text-xs text-gray-400 italic mt-2">
                                    No comment provided
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages} (
                    {pagination.total} total)
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        fetchFeedback(currentPage - 1, selectedRating)
                      }
                      disabled={currentPage <= 1 || loading}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        fetchFeedback(currentPage + 1, selectedRating)
                      }
                      disabled={currentPage >= pagination.totalPages || loading}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonFeedbackView;
