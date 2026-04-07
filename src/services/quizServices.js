// Service to handle quiz-related API calls
import axios from "axios";
import { getAuthHeader } from "./authHeader";

const QUIZ_API_URL = "http://localhost:9000/api/quiz/Quiz";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
  };
  console.log("Auth headers being sent:", headers);
  return headers;
};

export async function createQuiz(quizData) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/Quiz`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(quizData),
      credentials: "include",
    },
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      errorData.message || `Failed to create quiz (${response.status})`,
    );
  }
  return await response.json();
}

export async function bulkUploadQuestions(quizId, questionsPayload) {
  console.log(
    "Sending request to:",
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/admin/quizzes/${quizId}/questions/bulk-upload`,
  );
  console.log("Payload:", JSON.stringify(questionsPayload, null, 2));

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/admin/quizzes/${quizId}/questions/bulk-upload`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(questionsPayload),
      credentials: "include",
    },
  );

  if (!response.ok) {
    let errorMessage = `Failed to bulk upload questions (${response.status})`;
    try {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.error("Could not parse error response:", e);
    }
    throw new Error(errorMessage);
  }

  const result = await response.json();
  console.log("API Success Response:", result);
  return result;
}

// fetchQuizzesByModule function removed - endpoint /api/quiz/modules/${moduleId}/quizzes does not exist
// Use fetchQuizzesByLesson instead for lesson-specific quizzes

/**
 * Fetches all quizzes for a specific lesson
 * @param {string} lessonId - The ID of the lesson to fetch quizzes for
 * @returns {Promise<Array>} Array of quiz objects
 * @throws {Error} If the request fails or returns an error
 */
export async function fetchQuizzesByLesson(lessonId) {
  if (!lessonId) {
    throw new Error("Lesson ID is required to fetch quizzes");
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/quiz/lessons/${lessonId}/quizzes`,
      {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      },
    );

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        responseData.message ||
        `Failed to fetch quizzes for lesson (${response.status})`;
      console.error("Error fetching quizzes by lesson:", {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
      });
      throw new Error(errorMessage);
    }

    // Handle response format: { code: 200, data: [], success: true, message: "..." }
    // Response data contains quizzes with quizId, title, time_estimate
    const quizzes = Array.isArray(responseData.data) ? responseData.data : [];

    // Normalize to consistent shape with id and lesson_id
    // The API returns quizId, so we map it to id for consistency
    return quizzes.map((q) => ({
      ...q,
      id: q.quizId || q.id, // Use quizId as id
      quizId: q.quizId || q.id,
      lesson_id: lessonId,
      // Ensure all expected fields exist (some may be null or undefined)
      title: q.title || "Untitled Quiz",
      time_estimate: q.time_estimate || null,
      type: q.type || "GENERAL",
      maxAttempts: q.maxAttempts || q.max_attempts || 3,
      max_score: q.max_score || 100,
      min_score: q.min_score || 40,
    }));
  } catch (error) {
    console.error("Error in fetchQuizzesByLesson:", error);
    throw error;
  }
}

// fetchAllQuizzes function removed - endpoint /api/quiz/quizzes does not exist
// Use fetchQuizzesByLesson or fetchQuizzesByModule instead

export async function getQuizById(quizId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/${quizId}/getQuizById`,
    {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      responseData.message || `Failed to fetch quiz by ID (${response.status})`;
    throw new Error(errorMessage);
  }

  // Handle response format: { code: 200, data: {...}, success: true, message: "..." }
  if (
    responseData.success === true &&
    responseData.code === 200 &&
    responseData.data
  ) {
    return responseData.data;
  }

  // Return responseData directly if it's already in the expected format
  return responseData.data || responseData;
}

// New functions for quiz scores and user attempts
export async function fetchQuizScores(quizId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/${quizId}/scores`,
    {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch quiz scores");
  }
  const data = await response.json();
  return data.data || data;
}

export async function fetchUserQuizAttempts(quizId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/${quizId}/attempts`,
    {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user quiz attempts");
  }
  const data = await response.json();
  return data.data || data;
}

export async function fetchQuizAnalytics(quizId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/${quizId}/analytics`,
    {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch quiz analytics");
  }
  const data = await response.json();
  return data.data || data;
}

export async function fetchQuizAdminAnalytics(quizId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/admin/quizzes/${quizId}/analytics`,
    {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch quiz admin analytics");
  }
  const data = await response.json();
  return data.data || data;
}

export async function fetchQuizAdminScores(quizId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/admin/quizzes/${quizId}/scores`,
    {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch quiz admin scores");
  }
  const data = await response.json();
  return data.data || data;
}

// Fetch all questions (with options/answers) for a quiz (admin endpoint)
export async function fetchQuizAdminQuestions(quizId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/admin/quizzes/${quizId}/questions`,
    {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );

  const responseData = await response.json().catch(() => ({}));

  // Handle response format: { code: 200, data: [], success: true, message: "..." }
  if (responseData.success === true && responseData.code === 200) {
    // Return the data array (could be empty)
    return Array.isArray(responseData.data) ? responseData.data : [];
  }

  // If not successful, throw error
  if (!response.ok) {
    const errorMessage =
      responseData.message ||
      `Failed to fetch quiz questions (${response.status})`;
    throw new Error(errorMessage);
  }

  // Fallback: try to get data from responseData.data or responseData itself
  return Array.isArray(responseData.data)
    ? responseData.data
    : Array.isArray(responseData)
      ? responseData
      : [];
}

export async function deleteQuiz(quizId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/admin/quizzes/${quizId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );

  const responseData = await response.json().catch(() => ({}));

  // Check if the response indicates success (code: 200, success: true)
  if (responseData.success === true && responseData.code === 200) {
    return responseData;
  }

  // If not successful, throw error
  if (!response.ok) {
    const errorData = responseData || { message: "Unknown error" };
    throw new Error(
      errorData.message || `Failed to delete quiz (${response.status})`,
    );
  }

  return responseData;
}

export async function updateQuiz(quizId, quizData) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/${quizId}/updateQuizz`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(quizData),
      credentials: "include",
    },
  );

  const responseData = await response.json();

  // Check if the response indicates success despite HTTP status
  if (responseData.success === true && responseData.code === 200) {
    return responseData;
  }

  // If not successful, throw error
  if (!response.ok) {
    const errorData = responseData || { message: "Unknown error" };
    throw new Error(
      errorData.message || `Failed to update quiz (${response.status})`,
    );
  }

  return responseData;
}

export async function updateQuestion(quizId, questionId, questionData) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/admin/quizzes/${quizId}/questions/${questionId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(questionData),
      credentials: "include",
    },
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      errorData.message || `Failed to update question (${response.status})`,
    );
  }

  return await response.json();
}

// Delete a question by ID (admin)
export async function deleteQuestion(quizId, questionId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/admin/quizzes/${quizId}/questions/${questionId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      errorData.message || `Failed to delete question (${response.status})`,
    );
  }
  return await response.json();
}

// Fetch correct answers for a quiz (admin endpoint)
export async function fetchQuizCorrectAnswers(quizId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quiz/admin/quizzes/${quizId}/questions`,
    {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    },
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      errorData.message ||
        `Failed to fetch quiz correct answers (${response.status})`,
    );
  }
  const data = await response.json();
  return data.data || data;
}

// ===== USER-SIDE QUIZ APIs =====

/**
 * Start or resume a quiz attempt for a user
 * POST /api/quiz/quizzes/:quizId/start
 * @param {string} quizId - The ID of the quiz to start
 * @returns {Promise<Object>} Quiz attempt data with questions
 */
export async function startQuizAttempt(quizId) {
  if (!quizId) {
    throw new Error("Quiz ID is required to start a quiz");
  }

  const url = `${import.meta.env.VITE_API_BASE_URL}/api/quiz/quizzes/${quizId}/start`;

  try {
    console.log("Starting quiz attempt - URL:", url);
    console.log("Quiz ID:", quizId);

    const response = await fetch(url, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        responseData.message ||
        responseData.errorMessage ||
        `Failed to start quiz (${response.status})`;
      console.error("Error starting quiz:", {
        url,
        quizId,
        status: response.status,
        statusText: response.statusText,
        error: responseData,
        fullResponse: responseData,
      });

      // If it's a 404, provide a more helpful error message
      if (response.status === 404) {
        throw new Error(
          `Quiz start endpoint not found. Please ensure the backend route is registered: POST /api/quiz/quizzes/:quizId/start`,
        );
      }

      throw new Error(errorMessage);
    }

    // Handle response format: { code: 200, data: {...}, success: true, message: "..." }
    if (
      responseData.success === true &&
      responseData.code === 200 &&
      responseData.data
    ) {
      console.log(
        "Quiz started successfully - Response data:",
        responseData.data,
      );
      return responseData.data;
    }

    // Return responseData directly if it's already in the expected format
    console.log("Quiz started - Returning response:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error in startQuizAttempt:", {
      url,
      quizId,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

/**
 * Submit quiz answers for a user
 * POST /api/quiz/quizzes/:quizId/submit
 * @param {string} quizId - The ID of the quiz to submit
 * @param {Object} payload - Object containing answers array: { answers: [...] }
 * @returns {Promise<Object>} Quiz results and score
 */
export async function submitQuiz(quizId, payload = {}) {
  if (!quizId) {
    throw new Error("Quiz ID is required to submit a quiz");
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/quiz/quizzes/${quizId}/submit`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
        credentials: "include",
      },
    );

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        responseData.message || `Failed to submit quiz (${response.status})`;
      console.error("Error submitting quiz:", {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
      });
      throw new Error(errorMessage);
    }

    // Handle response format: { code: 200, data: {...}, success: true, message: "..." }
    if (
      responseData.success === true &&
      responseData.code === 200 &&
      responseData.data
    ) {
      return responseData.data;
    }

    // Return responseData directly if it's already in the expected format
    return responseData;
  } catch (error) {
    console.error("Error in submitQuiz:", error);
    throw error;
  }
}

/**
 * Get latest attempt score for a user
 * GET /api/quiz/user/quiz/:quizId/latest-attempt
 * @param {string} quizId - The ID of the quiz
 * @returns {Promise<Object>} Latest attempt details with score
 */
export async function getLatestAttemptScore(quizId) {
  if (!quizId) {
    throw new Error("Quiz ID is required to fetch latest attempt");
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/quiz/user/quiz/${quizId}/latest-attempt`,
      {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      },
    );

    const responseData = await response.json().catch(() => ({}));

    // Handle 404 - no attempt found (this is not an error, just means user hasn't attempted yet)
    if (response.status === 404) {
      console.log(`No attempt found for quiz ${quizId}`);
      return null;
    }

    if (!response.ok) {
      const errorMessage =
        responseData.message ||
        `Failed to fetch latest attempt (${response.status})`;
      console.error("Error fetching latest attempt:", {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
      });
      throw new Error(errorMessage);
    }

    // Backend returns direct JSON (not wrapped):
    // { quizId, attemptId, quizTitle, quizType, userScored, attempt_date, percentage, quizScore, questionCount, totalCorrectAnswers }
    return responseData;
  } catch (error) {
    console.error("Error in getLatestAttemptScore:", error);
    // Return null instead of throwing for 404 cases
    if (error.message && error.message.includes("404")) {
      return null;
    }
    throw error;
  }
}

/**
 * Get remaining attempts for a quiz
 * GET /api/quiz/user/quizzes/:quizId/remaining-attempts
 * @param {string} quizId - The ID of the quiz
 * @returns {Promise<Object>} Remaining attempts data
 */
export async function getRemainingAttempts(quizId) {
  if (!quizId) {
    throw new Error("Quiz ID is required to fetch remaining attempts");
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/quiz/user/quizzes/${quizId}/remaining-attempts`,
      {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      },
    );

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        responseData.message ||
        `Failed to fetch remaining attempts (${response.status})`;
      console.error("Error fetching remaining attempts:", {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
      });
      throw new Error(errorMessage);
    }

    // Handle response format: { code: 200, data: {...}, success: true, message: "..." }
    if (
      responseData.success === true &&
      responseData.code === 200 &&
      responseData.data
    ) {
      return responseData.data;
    }

    // Return responseData directly if it's already in the expected format
    return responseData;
  } catch (error) {
    console.error("Error in getRemainingAttempts:", error);
    throw error;
  }
}

/**
 * Get attempted quizzes for a user
 * GET /api/quiz/user/:userId/attempted
 * @param {string} userId - The ID of the user
 * @returns {Promise<Array>} Array of attempted quizzes
 */
export async function getUserAttemptedQuizzes(userId) {
  if (!userId) {
    throw new Error("User ID is required to fetch attempted quizzes");
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/quiz/user/${userId}/attempted`,
      {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      },
    );

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        responseData.message ||
        `Failed to fetch attempted quizzes (${response.status})`;
      console.error("Error fetching attempted quizzes:", {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
      });
      throw new Error(errorMessage);
    }

    // Handle response format: { code: 200, data: [...], success: true, message: "..." }
    if (
      responseData.success === true &&
      responseData.code === 200 &&
      responseData.data
    ) {
      return responseData.data;
    }

    // Return responseData directly if it's already an array or wrapped
    return Array.isArray(responseData.data)
      ? responseData.data
      : Array.isArray(responseData)
        ? responseData
        : [];
  } catch (error) {
    console.error("Error in getUserAttemptedQuizzes:", error);
    throw error;
  }
}

/**
 * Get quiz meta information (overview)
 * @param {string} quizId - The ID of the quiz
 * @returns {Promise<Object>} Quiz meta data
 */
export async function getQuizMetaById(quizId) {
  if (!quizId) {
    throw new Error("Quiz ID is required to fetch quiz meta");
  }

  try {
    // Use getQuizById to get meta information
    const quizData = await getQuizById(quizId);

    // Extract and return meta fields
    return {
      quizId: quizData.id || quizData.quizId || quizId,
      title: quizData.title,
      description: quizData.description,
      maxAttempts: quizData.maxAttempts || quizData.max_attempts || 3,
      questionCount: quizData.questionCount || quizData.question_count || 0,
      totalScore: quizData.max_score || quizData.totalScore || 100,
      minScore: quizData.min_score || quizData.minScore || 70,
      passingScore: quizData.min_score || quizData.minScore || 70,
      type: quizData.type || "GENERAL",
      time_estimate: quizData.time_estimate || null,
    };
  } catch (error) {
    console.error("Error in getQuizMetaById:", error);
    throw error;
  }
}

/**
 * Get module quiz by ID (for compatibility with existing code)
 * @param {string} moduleId - The ID of the module (optional for lesson-based quizzes)
 * @param {string} quizId - The ID of the quiz
 * @returns {Promise<Object>} Quiz details
 */
export async function getModuleQuizById(moduleId, quizId) {
  if (!quizId) {
    throw new Error("Quiz ID is required");
  }

  try {
    // Use getQuizById - moduleId is not needed for fetching quiz data
    const quizData = await getQuizById(quizId);
    return quizData;
  } catch (error) {
    console.error("Error in getModuleQuizById:", error);
    throw error;
  }
}

// Backward compatibility: Export startQuiz as alias for startQuizAttempt
export const startQuiz = startQuizAttempt;
