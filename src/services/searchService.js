// Search Service - Search for courses and users using the unified search API
import api from './apiClient';

// Simple in-memory cache to avoid redundant API calls
const searchCache = new Map();
const CACHE_EXPIRY = 2 * 60 * 1000; // 2 minutes

/**
 * Perform a unified search for courses and users
 * @param {string} query - The search term
 * @param {AbortSignal} [signal] - Optional AbortSignal for request cancellation
 * @returns {Promise<{results: {courses: Array, users: Array}}>}
 */
export async function search(query, signal) {
  const searchQuery = query?.trim().toLowerCase() || '';

  if (!searchQuery || searchQuery.length < 2) {
    return {
      results: { courses: [], users: [] },
    };
  }

  // Check cache first
  const cached = searchCache.get(searchQuery);
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
    return cached.data;
  }

  try {
    const response = await api.get('/api/search', {
      params: { q: searchQuery },
      signal, // Pass the abort signal to axios
    });

    const data = response?.data?.data || response?.data;

    // Normalize results
    const results = {
      results: {
        courses: data?.results?.courses || data?.courses || [],
        users: data?.results?.users || data?.users || [],
      }
    };

    // Store in cache
    searchCache.set(searchQuery, {
      data: results,
      timestamp: Date.now(),
    });

    // Cleanup old cache entries periodically
    if (searchCache.size > 50) {
      const oldestKey = searchCache.keys().next().value;
      searchCache.delete(oldestKey);
    }

    return results;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      // Return a special flag or just rethrow if we want the component to ignore it
      throw error;
    }

    console.error('Search API request failed:', error);
    return {
      results: { courses: [], users: [] },
    };
  }
}
