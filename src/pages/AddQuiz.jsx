import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// import { allowedScormUserIds } from "@/data/allowedScormUsers";
import { currentUserId } from '@/data/currentUser';
import { fetchAllCourses, fetchCourseModules } from '@/services/courseService';
import { CreateModuleDialog } from '@/components/courses/CreateModuleDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Clock,
  ChevronLeft,
  Play,
  Eye,
  Plus,
  Trash2,
  Trophy,
  Edit,
  Users,
  Brain,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import QuizModal from '@/components/courses/QuizModal';
import QuizScoresModal from '@/components/courses/QuizScoresModal';
import EditQuestionModal from '@/components/courses/EditQuestionModal';
import SceanrioScoreCard from '@/pages/SceanrioScoreCard';
import {
  fetchQuizzesByLesson,
  getQuizById,
  deleteQuiz,
  updateQuiz,
} from '@/services/quizServices';
import { getQuizQuestions } from '@/services/quizService';
import {
  getModuleScenarios,
  deleteScenario,
  getSpecificScenario,
} from '@/services/scenarioService';
import { getAuthHeader } from '@/services/authHeader';
import { toast } from 'sonner';

const COURSES_PER_PAGE = 5;

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [courseModules, setCourseModules] = useState({});
  const [showCreateModuleDialog, setShowCreateModuleDialog] = useState(false);
  const [selectedCourseForModule, setSelectedCourseForModule] = useState(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [previewModule, setPreviewModule] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedModuleForQuiz, setSelectedModuleForQuiz] = useState(null);
  // Module-level quiz functionality removed - only lesson-specific quizzes are supported
  const [quizzesByLesson, setQuizzesByLesson] = useState({}); // { [lessonId]: [quiz, ...] }
  const [loadingQuizzesByLesson, setLoadingQuizzesByLesson] = useState({}); // { [lessonId]: boolean }
  const [loadingQuizzes, setLoadingQuizzes] = useState(false); // Global loading state (legacy)
  const [previewQuizData, setPreviewQuizData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [showScoresModal, setShowScoresModal] = useState(false);
  const [selectedQuizForScores, setSelectedQuizForScores] = useState(null);
  // Scenario Scores
  const [showScenarioScoresModal, setShowScenarioScoresModal] = useState(false);
  const [selectedScenarioForScores, setSelectedScenarioForScores] =
    useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [selectedQuestionForEdit, setSelectedQuestionForEdit] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(true);
  // Scenario delete confirmation
  const [showScenarioDeleteConfirm, setShowScenarioDeleteConfirm] =
    useState(false);
  const [scenarioToDelete, setScenarioToDelete] = useState(null);

  // Scenario-related state
  const [assessmentType, setAssessmentType] = useState('quiz'); // 'quiz' or 'scenario'
  const [moduleScenarios, setModuleScenarios] = useState({}); // { [moduleId]: [scenario, ...] }
  const [loadingScenarios, setLoadingScenarios] = useState({}); // { [moduleId]: boolean }

  // Lesson-related state
  const [moduleLessons, setModuleLessons] = useState({}); // { [moduleId]: [lesson, ...] }
  const [loadingLessons, setLoadingLessons] = useState({}); // { [moduleId]: boolean }
  const [selectedLessonForQuiz, setSelectedLessonForQuiz] = useState(null);

  const isAllowed = true; // TODO: Replace with proper permission check

  // Fetch quizzes for a specific lesson
  const fetchAndSetLessonQuizzes = async (lessonId, forceRefresh = false) => {
    if (!lessonId) return;

    // Prevent duplicate API calls unless force refresh is requested
    if (!forceRefresh && (quizzesByLesson[lessonId] || loadingQuizzesByLesson[lessonId])) {
      return;
    }

    setLoadingQuizzesByLesson(prev => ({ ...prev, [lessonId]: true }));

    try {
      const quizzes = await fetchQuizzesByLesson(lessonId);
      setQuizzesByLesson(prev => ({ ...prev, [lessonId]: quizzes }));
    } catch (err) {
      console.error(`Error fetching quizzes for lesson ${lessonId}:`, err);
      setQuizzesByLesson(prev => ({ ...prev, [lessonId]: [] }));
    } finally {
      setLoadingQuizzesByLesson(prev => ({ ...prev, [lessonId]: false }));
    }
  };

  // Fetch all quizzes and organize by lesson_id (for module-level quizzes) - REMOVED
  // Using lesson-specific fetching instead

  // fetchAndSetModuleQuizzes function removed - module-level quizzes are not supported
  // Only lesson-specific quizzes are fetched via fetchAndSetLessonQuizzes

  const fetchAndSetModuleScenarios = async moduleId => {
    // Set loading state
    setLoadingScenarios(prev => ({ ...prev, [moduleId]: true }));

    try {
      // TODO: Replace with actual scenario API call
      const scenarios = await getModuleScenarios(moduleId);
      setModuleScenarios(prev => ({ ...prev, [moduleId]: scenarios }));
    } catch (err) {
      console.error(`Error fetching scenarios for module ${moduleId}:`, err);
      setModuleScenarios(prev => ({ ...prev, [moduleId]: [] }));
    } finally {
      // Clear loading state
      setLoadingScenarios(prev => ({ ...prev, [moduleId]: false }));
    }
  };

  const fetchAndSetModuleLessons = async (courseId, moduleId) => {
    // Set loading state
    setLoadingLessons(prev => ({ ...prev, [moduleId]: true }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/course/${courseId}/modules/${moduleId}/lesson/all-lessons`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch lessons: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(`Lessons API Response for module ${moduleId}:`, responseData);

      // Handle different response formats - same as ModuleLessonsView
      let lessonsData = [];
      if (Array.isArray(responseData)) {
        lessonsData = responseData;
      } else if (responseData?.data && Array.isArray(responseData.data)) {
        lessonsData = responseData.data;
      } else if (responseData.lessons) {
        lessonsData = Array.isArray(responseData.lessons)
          ? responseData.lessons
          : [responseData.lessons];
      }

      console.log(`Extracted lessons data for module ${moduleId}:`, lessonsData);

      // Normalize lesson data
      const normalizedLessons = lessonsData.map(lesson => ({
        id: lesson.id || lesson.lesson_id,
        title: lesson.title || lesson.lesson_title || 'Untitled Lesson',
        description: lesson.description || lesson.lesson_description || '',
        order: lesson.order || lesson.lesson_order || 0,
        status: lesson.status || lesson.lesson_status || 'DRAFT',
        course_id: courseId,
        module_id: moduleId,
      }));

      setModuleLessons(prev => ({ ...prev, [moduleId]: normalizedLessons }));

      // Fetch quizzes for each lesson in parallel - ONLY when assessmentType is 'quiz'
      if (assessmentType === 'quiz') {
        await Promise.all(
          normalizedLessons.map(async lesson => {
            const lessonId = lesson.id;
            if (lessonId) {
              await fetchAndSetLessonQuizzes(lessonId);
            }
          })
        );
      }
    } catch (err) {
      console.error(`Error fetching lessons for module ${moduleId}:`, err);
      console.error('Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
      });
      
      // Show user-friendly error message
      if (err.response?.status === 401) {
        console.warn('Authentication error - user may need to log in again');
      } else if (err.response?.status === 403) {
        console.warn('Authorization error - user may not have permission to view lessons');
      } else if (err.response?.status === 404) {
        console.warn('Module or lessons not found');
      }
      
      setModuleLessons(prev => ({ ...prev, [moduleId]: [] }));
    } finally {
      // Clear loading state
      setLoadingLessons(prev => ({ ...prev, [moduleId]: false }));
    }
  };

  useEffect(() => {
    if (!isAllowed) {
      setLoadingCourses(false);
      return;
    }
    const fetchCoursesData = async () => {
      setLoadingCourses(true);
      try {
        const coursesData = await fetchAllCourses();

        // Don't fetch modules here
        const coursesWithEmptyModules = coursesData.map(course => ({
          ...course,
          modules: course.modules || [],
        }));

        setCourses(coursesWithEmptyModules);

      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCoursesData();
  }, [isAllowed]);

  // Remove bulk quiz fetching - now using lazy loading

  // Note: No global fetchAllQuizzes call since endpoint is not available; rely on per-module fetch

  // Filtered and paginated courses
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    const lower = searchTerm.toLowerCase();
    return courses.filter(
      course =>
        course.title.toLowerCase().includes(lower) ||
        course.modules.some(mod => mod.title.toLowerCase().includes(lower))
    );
  }, [courses, searchTerm]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  // Reset to page 1 if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleExpandCourse = async courseId => {
    const newExpandedId = expandedCourseId === courseId ? null : courseId;
    setExpandedCourseId(newExpandedId);

    if (!newExpandedId) return;

    const course = courses.find(c => c.id === courseId);

    let modulesToProcess = [];
    
    // Fetch modules only if not already loaded
    if (course && course.modules.length === 0) {
      try {
        const modules = await fetchCourseModules(courseId);
        modulesToProcess = modules;

        setCourses(prev =>
          prev.map(c =>
            c.id === courseId ? { ...c, modules } : c
          )
        );
      } catch (err) {
        console.error("Error fetching modules:", err);
        return;
      }
    } else if (course && course.modules.length > 0) {
      modulesToProcess = course.modules;
    }

    // Process modules for lessons and scenarios
    if (modulesToProcess.length > 0) {
      await Promise.all(
        modulesToProcess.map(async module => {
          const promises = [];

          if (!moduleLessons[module.id]) {
            promises.push(fetchAndSetModuleLessons(courseId, module.id));
          }

          if (!moduleScenarios[module.id]) {
            promises.push(fetchAndSetModuleScenarios(module.id));
          }

          await Promise.all(promises);
        })
      );
    }
  };


  const handleCreateModule = courseId => {
    setSelectedCourseForModule(courseId);
    setShowCreateModuleDialog(true);
  };

  const handleModuleCreated = async newModule => {
    if (selectedCourseForModule) {
      try {
        const updatedModules = await fetchCourseModules(
          selectedCourseForModule
        );
        setCourses(prev =>
          prev.map(course =>
            course.id === selectedCourseForModule
              ? { ...course, modules: updatedModules }
              : course
          )
        );
      } catch (err) {
        console.error('Error refreshing modules:', err);
      }
    }
  };

  const handleCreateQuiz = (lessonId, moduleId) => {
    setSelectedLessonForQuiz(lessonId);
    setSelectedModuleForQuiz(moduleId);
    setShowQuizModal(true);
  };

  const handleCreateScenario = moduleId => {
    navigate('/create-scenario', { state: { moduleId } });
  };

  const handleEditScenario = scenario => {
    navigate('/create-scenario', {
      state: { moduleId: scenario.module_id, editingScenario: scenario },
    });
  };

  const handleDeleteScenario = scenario => {
    setScenarioToDelete(scenario);
    setShowScenarioDeleteConfirm(true);
  };

  const confirmDeleteScenario = async () => {
    if (!scenarioToDelete) return;
    try {
      await deleteScenario(scenarioToDelete.id);
      setModuleScenarios(prev => {
        const moduleId = scenarioToDelete.module_id;
        return {
          ...prev,
          [moduleId]:
            prev[moduleId]?.filter(s => s.id !== scenarioToDelete.id) || [],
        };
      });
      toast.success('Scenario deleted successfully!');
    } catch (err) {
      console.error('Error deleting scenario:', err);
      toast.error('Failed to delete scenario.');
    } finally {
      setShowScenarioDeleteConfirm(false);
      setScenarioToDelete(null);
    }
  };

  const cancelDeleteScenario = () => {
    setShowScenarioDeleteConfirm(false);
    setScenarioToDelete(null);
  };

  const handlePreviewScenario = scenario => {
    navigate('/preview-scenario', { state: { scenarioId: scenario.id } });
  };

  const handleViewScenarioScores = scenario => {
    setSelectedScenarioForScores(scenario);
    setShowScenarioScoresModal(true);
  };

  const handlePreviewQuiz = async quiz => {
    setPreviewLoading(true);
    setPreviewError(null);
    setShowPreviewDialog(true);
    try {
      const quizId = quiz.id || quiz.quizId;
      try {
        const questions = await getQuizQuestions(quizId);
        const normalized = Array.isArray(questions)
          ? questions
          : questions?.data || [];
        setPreviewQuizData({
          id: quizId,
          title: quiz.title,
          description: quiz.description,
          questions: normalized,
        });
      } catch (innerErr) {
        // Fallback to legacy endpoint that returns full quiz with questions
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/quiz/${quizId}/getQuizById`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...getAuthHeader(),
            },
            credentials: 'include',
          }
        );
        if (!res.ok) {
          throw new Error('Failed to load quiz details');
        }
        const data = await res.json();
        const quizData = data?.data || data;
        setPreviewQuizData(quizData);
      }
    } catch (err) {
      setPreviewError('Failed to load quiz details.');
      setPreviewQuizData(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleDeleteQuiz = async quiz => {
    setQuizToDelete(quiz);
    setShowDeleteConfirmation(true);
    setIsDeleting(false);
  };

  const handleEditQuiz = quiz => {
    setEditingQuiz(quiz);
    setSelectedModuleForQuiz(quiz.module_id);
    setSelectedLessonForQuiz(quiz.lesson_id || null);
    setIsAddingQuestions(false);
    setShowQuizModal(true);
  };

  const handleAddQuestions = quiz => {
    setEditingQuiz(quiz);
    setSelectedModuleForQuiz(quiz.module_id);
    setSelectedLessonForQuiz(quiz.lesson_id || null);
    setIsAddingQuestions(true);
    setShowQuizModal(true);
  };

  const handleEditQuestion = question => {
    setSelectedQuestionForEdit(question);
    setShowEditQuestionModal(true);
  };

  const handleQuestionUpdated = () => {
    // Refresh the preview data if it's currently open
    if (previewQuizData) {
      handlePreviewQuiz(previewQuizData);
    }
  };

  const handleViewScores = (quiz, courseId) => {
    setSelectedQuizForScores(quiz);
    setShowScoresModal(true);
  };

  const handleQuizCreatedOrUpdated = async () => {
    // Refresh quizzes after creation or update
    if (isAllowed) {
      try {
        console.log('Refreshing quiz data after creation/update...');
        // Add a small delay to ensure backend has processed the update
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Only refresh quizzes for the specific lesson that was affected
        if (selectedLessonForQuiz) {
          await fetchAndSetLessonQuizzes(selectedLessonForQuiz, true);
        }
        
        // Don't refresh all lessons - this was causing excessive API calls
        console.log('Quiz data refresh completed');
      } catch (error) {
        console.error('Error refreshing quiz data:', error);
      }
    }
  };

  if (!isAllowed) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You do not have permission to access Quiz Management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Assessment Management
            </h1>
            <p className="text-gray-600">
              Create and manage quizzes and scenarios for your course modules
            </p>
          </div>

          {/* Assessment Type Toggle - Right Side */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              Assessment Type:
            </span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setAssessmentType('quiz')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${assessmentType === 'quiz'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <Trophy className="w-4 h-4" />
                Quizzes
              </button>
              <button
                onClick={() => setAssessmentType('scenario')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${assessmentType === 'scenario'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <Brain className="w-4 h-4" />
                Scenarios
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search input */}
      <div className="mb-6 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search by course or module title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {/* Quick Stats */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Quizzes</p>
                <p className="text-2xl font-bold">
                  {Object.values(quizzesByLesson).reduce(
                    (sum, list) =>
                      sum + (Array.isArray(list) ? list.length : 0),
                    0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Scenarios</p>
                <p className="text-2xl font-bold">
                  {Object.keys(moduleScenarios).length > 0
                    ? Object.values(moduleScenarios).reduce(
                      (sum, list) =>
                        sum + (Array.isArray(list) ? list.length : 0),
                      0
                    )
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Plus className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {loadingCourses ? (
        <div className="text-center py-12">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Loading courses...
          </h3>
          <p className="text-gray-500">
            Please wait while we fetch your course data.
          </p>
        </div>
      ) : paginatedCourses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-500">Try a different search term.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExpandCourse(course.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {expandedCourseId === course.id
                        ? 'Hide Modules'
                        : 'View Modules'}
                    </button>
                  </div>
                </div>
              </div>

              {expandedCourseId === course.id && (
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="space-y-4">
                    {course.modules.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          No modules found for this course
                        </p>
                      </div>
                    ) : (
                      course.modules.map(mod => {
                        return (
                          <div
                            key={mod.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {mod.title}
                                  </h3>
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${mod.module_status === 'PUBLISHED'
                                      ? 'bg-green-100 text-green-800'
                                      : mod.module_status === 'DRAFT'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                      }`}
                                  >
                                    {mod.module_status}
                                  </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                  {mod.description}
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                      Module ID
                                    </span>
                                    <span className="text-sm font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded border truncate">
                                      {mod.id}
                                    </span>
                                  </div>

                                  <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                      Order
                                    </span>
                                    <span className="text-sm text-gray-700">
                                      {mod.order || 'N/A'}
                                    </span>
                                  </div>

                                  <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                      Duration
                                    </span>
                                    <span className="text-sm text-gray-700">
                                      {mod.estimated_duration || 0} min
                                    </span>
                                  </div>
                                </div>
                              </div>

                            </div>

                            {/* Lessons Section */}
                            <div className="mt-6 border-t border-gray-200 pt-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                Lessons
                              </h4>
                              {/* Debug info */}
                              {console.log(`🔍 Module ${mod.id} - Loading: ${loadingLessons[mod.id]}, Lessons count: ${(moduleLessons[mod.id] || []).length}`)}
                              {loadingLessons[mod.id] ? (
                                <div className="flex items-center justify-center py-4">
                                  <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                    <span className="text-sm text-gray-600">
                                      Loading lessons...
                                    </span>
                                  </div>
                                </div>
                              ) : (moduleLessons[mod.id] || []).length > 0 ? (
                                <div className="space-y-3">
                                  {(moduleLessons[mod.id] || []).map(lesson => (
                                    <div
                                      key={lesson.id}
                                      className="bg-gray-50 rounded-lg border border-gray-200 p-4"
                                    >
                                      <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-2">
                                            <h5 className="text-base font-medium text-gray-900">
                                              {lesson.title}
                                            </h5>
                                            <span
                                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${lesson.status === 'PUBLISHED'
                                                ? 'bg-green-100 text-green-800'
                                                : lesson.status === 'DRAFT'
                                                  ? 'bg-yellow-100 text-yellow-800'
                                                  : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                              {lesson.status}
                                            </span>
                                          </div>
                                          {lesson.description && (
                                            <p className="text-sm text-gray-600 mb-2">
                                              {lesson.description}
                                            </p>
                                          )}
                                          <div className="text-xs text-gray-500">
                                            Order: {lesson.order || 0}
                                          </div>
                                        </div>
                                        <div className="ml-4">
                                          {assessmentType === 'quiz' ? (
                                            <Button
                                              onClick={() => handleCreateQuiz(lesson.id, mod.id)}
                                              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                                            >
                                              <Plus size={14} className="mr-2" /> Create Quiz
                                            </Button>
                                          ) : (
                                            <Button
                                              onClick={() => handleCreateScenario(mod.id)}
                                              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                                            >
                                              <Plus size={14} className="mr-2" /> Create Scenario
                                            </Button>
                                          )}
                                        </div>
                                      </div>

                                      {/* List quizzes for this lesson */}
                                      {assessmentType === 'quiz' && (
                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                          {loadingQuizzesByLesson[lesson.id] ? (
                                            <div className="text-xs text-gray-500">
                                              Loading quizzes...
                                            </div>
                                          ) : (quizzesByLesson[lesson.id] || []).length > 0 ? (
                                            <div className="space-y-2">
                                              {(quizzesByLesson[lesson.id] || []).map(quiz => (
                                                <div
                                                  key={quiz.id}
                                                  className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between bg-white"
                                                >
                                                  <div>
                                                    <div className="font-semibold text-sm text-gray-900">
                                                      {quiz.title || 'Untitled Quiz'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                      {quiz.type && `Type: ${quiz.type}`}
                                                      {quiz.type && quiz.maxAttempts && ' | '}
                                                      {quiz.maxAttempts && `Max Attempts: ${quiz.maxAttempts}`}
                                                      {quiz.time_estimate && ` | Time: ${quiz.time_estimate} min`}
                                                      {!quiz.type && !quiz.maxAttempts && !quiz.time_estimate && (
                                                        <span className="text-gray-400">Quiz details</span>
                                                      )}
                                                    </div>
                                                  </div>
                                                  <div className="flex gap-2 mt-2 md:mt-0">
                                                    <Button
                                                      onClick={() => handleViewScores(quiz, course.id)}
                                                      className="group relative overflow-hidden bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm transition-all duration-300 hover:pr-12 text-xs px-2 py-1"
                                                    >
                                                      <Trophy className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                      onClick={() => handleEditQuiz(quiz)}
                                                      className="group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-all duration-300 hover:pr-12 text-xs px-2 py-1"
                                                    >
                                                      <Edit className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                      onClick={() => handleDeleteQuiz(quiz)}
                                                      className="group relative overflow-hidden bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition-all duration-300 hover:pr-12 text-xs px-2 py-1"
                                                    >
                                                      <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <div className="text-xs text-gray-500">
                                              No quizzes for this lesson
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <p className="text-sm text-gray-500">
                                    No lessons found for this module
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* List all assessments for this module (only quizzes without lesson_id) */}
                            {assessmentType === 'quiz' ? (
                              loadingQuizzes ? (
                                <div className="mt-4 flex items-center justify-center py-8">
                                  <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                    <span className="text-sm text-gray-600">
                                      Loading quizzes...
                                    </span>
                                  </div>
                                </div>
                              ) : (moduleLessons[mod.id] || []).length > 0 ? (
                                <div className="mt-4 text-center py-4">
                                  <p className="text-sm text-gray-500">
                                    No quizzes found. Create quizzes within lessons above.
                                  </p>
                                </div>
                              ) : (
                                <div className="mt-4 text-center py-4">
                                  <p className="text-sm text-gray-500">
                                    No quizzes found for this module
                                  </p>
                                </div>
                              )
                            ) : loadingScenarios[mod.id] ? (
                              <div className="mt-4 flex items-center justify-center py-8">
                                <div className="flex items-center space-x-2">
                                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                                  <span className="text-sm text-gray-600">
                                    Loading scenarios...
                                  </span>
                                </div>
                              </div>
                            ) : (moduleScenarios[mod.id] || []).length > 0 ? (
                              <div className="mt-4 space-y-4">
                                {(moduleScenarios[mod.id] || []).map(
                                  scenario => (
                                    <div
                                      key={scenario.id}
                                      className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-purple-50"
                                    >
                                      <div>
                                        <div className="font-semibold text-gray-900">
                                          {scenario.title}
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">
                                          Type: {scenario.type} | Decisions:{' '}
                                          {scenario.decisions?.length || 0}
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">
                                          Avatar: {scenario.avatar || 'Default'}{' '}
                                          | Background:{' '}
                                          {scenario.background || 'Default'}
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">
                                          Duration:{' '}
                                          {scenario.time_estimate || 0} min
                                        </div>
                                      </div>
                                      <div className="flex gap-2 mt-2 md:mt-0">
                                        <Button
                                          onClick={() =>
                                            handleViewScenarioScores(scenario)
                                          }
                                          className="group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-all duration-300 hover:pr-16"
                                        >
                                          <div className="flex items-center justify-center w-full h-full">
                                            <Trophy className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[-4px]" />
                                            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium whitespace-nowrap">
                                              Scores
                                            </span>
                                          </div>
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handlePreviewScenario(scenario)
                                          }
                                          className="group relative overflow-hidden bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm transition-all duration-300 hover:pr-16"
                                        >
                                          <div className="flex items-center justify-center w-full h-full">
                                            <Eye className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[-4px]" />
                                            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium whitespace-nowrap">
                                              Preview
                                            </span>
                                          </div>
                                        </Button>
                                        {/* Edit removed for scenarios as requested */}
                                        <Button
                                          onClick={() =>
                                            handleDeleteScenario(scenario)
                                          }
                                          className="group relative overflow-hidden bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition-all duration-300 hover:pr-16"
                                        >
                                          <div className="flex items-center justify-center w-full h-full">
                                            <Trash2 className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[-4px]" />
                                            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium whitespace-nowrap">
                                              Delete
                                            </span>
                                          </div>
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <div className="mt-4 text-center py-4">
                                <p className="text-sm text-gray-500">
                                  No scenarios found for this module
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}

      {/* Create Module Dialog */}
      <CreateModuleDialog
        isOpen={showCreateModuleDialog}
        onClose={() => setShowCreateModuleDialog(false)}
        courseId={selectedCourseForModule}
        onModuleCreated={handleModuleCreated}
        existingModules={
          courses.find(c => c.id === selectedCourseForModule)?.modules || []
        }
      />

      {/* Preview Dialog */}
      {showPreviewDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-5/6 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold">
                  {previewQuizData?.title || 'Quiz Preview'}
                </h2>
                <p className="text-sm text-gray-600">
                  {previewQuizData?.description}
                </p>
              </div>
              <Button
                onClick={() => {
                  setShowPreviewDialog(false);
                  setPreviewQuizData(null);
                  setPreviewError(null);
                }}
                variant="outline"
              >
                Close
              </Button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              {previewLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md border border-gray-300">
                  <p className="text-lg text-gray-500">Loading quiz...</p>
                </div>
              ) : previewError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md border border-gray-300">
                  <p className="text-lg text-red-500">{previewError}</p>
                </div>
              ) : previewQuizData &&
                previewQuizData.questions &&
                previewQuizData.questions.length > 0 ? (
                <div className="space-y-8">
                  {previewQuizData.questions.map((q, idx) => {
                    const options =
                      q.question_options && q.question_options.length > 0
                        ? q.question_options
                        : q.options || [];
                    return (
                      <div key={q.id} className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-900">
                            {idx + 1}. {q.question}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditQuestion(q)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                        {options.length > 0 ? (
                          <div className="space-y-2 ml-4">
                            {options.map(opt => (
                              <div
                                key={opt.id || opt.text}
                                className="flex items-center"
                              >
                                <input
                                  type="radio"
                                  disabled
                                  className="mr-2"
                                  name={`preview-q-${q.id}`}
                                  checked={opt.isCorrect || false}
                                  readOnly
                                />
                                <span className="text-gray-800">
                                  {opt.text || opt}
                                </span>
                                {opt.isCorrect && (
                                  <span className="ml-2 text-green-600 text-xs font-semibold">
                                    (Correct)
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="ml-4 text-sm text-gray-700">
                            {q.type === 'FILL_UPS' || q.type === 'ONE_WORD' ? (
                              <div>
                                <span className="font-medium">
                                  Answer{q.type === 'FILL_UPS' ? 's' : ''}:
                                </span>{' '}
                                <span>
                                  {Array.isArray(q.correctAnswer)
                                    ? q.correctAnswer.join(', ')
                                    : q.correctAnswer ||
                                    q.correct_answers ||
                                    q.answer ||
                                    '—'}
                                </span>
                              </div>
                            ) : q.type === 'CATEGORIZATION' ? (
                              <div>
                                <div className="font-medium mb-2">
                                  Categories and Items:
                                </div>
                                <div className="space-y-2">
                                  {options.map(opt => (
                                    <div
                                      key={opt.id || opt.text}
                                      className="flex items-center"
                                    >
                                      <span
                                        className={`px-2 py-1 rounded text-xs ${opt.isCategory
                                          ? 'bg-blue-100 text-blue-800'
                                          : 'bg-green-100 text-green-800'
                                          }`}
                                      >
                                        {opt.isCategory ? 'Category' : 'Item'}
                                      </span>
                                      <span className="ml-2 text-gray-800">
                                        {opt.text || opt}
                                      </span>
                                      {!opt.isCategory && opt.category && (
                                        <span className="ml-2 text-xs text-gray-500">
                                          → {opt.category}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md border border-gray-300">
                  <p className="text-lg text-gray-500">
                    No questions found for this quiz.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <QuizModal
        isOpen={showQuizModal}
        onClose={() => {
          setShowQuizModal(false);
          setEditingQuiz(null);
          setIsAddingQuestions(false);
          // Don't refresh here - handleQuizCreatedOrUpdated already handles quiz refresh
        }}
        moduleId={selectedModuleForQuiz}
        lessonId={selectedLessonForQuiz}
        onQuizCreated={handleQuizCreatedOrUpdated}
        editingQuiz={editingQuiz}
        onQuizUpdated={handleQuizCreatedOrUpdated}
        isAddingQuestions={isAddingQuestions}
      />

      <QuizScoresModal
        isOpen={showScoresModal}
        onClose={() => {
          setShowScoresModal(false);
          setSelectedQuizForScores(null);
        }}
        quiz={selectedQuizForScores}
        courseId={
          courses.find(c =>
            c.modules?.some(m => m.id === selectedQuizForScores?.module_id)
          )?.id
        }
      />

      {/* Scenario Scores Modal */}
      {showScenarioScoresModal && selectedScenarioForScores && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-5/6 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold">Scenario Scores</h2>
                <p className="text-sm text-gray-600">
                  {selectedScenarioForScores?.title}
                </p>
              </div>
              <Button
                onClick={() => {
                  setShowScenarioScoresModal(false);
                  setSelectedScenarioForScores(null);
                }}
                variant="outline"
              >
                Close
              </Button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              {/** Lazy import to avoid circular issues */}
              <SceanrioScoreCard
                scenarioId={selectedScenarioForScores?.id}
                scenarioTitle={selectedScenarioForScores?.title}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && quizToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete the quiz "{quizToDelete.title}"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setQuizToDelete(null);
                  setIsDeleting(false);
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    const quizId = quizToDelete.id || quizToDelete.quizId;
                    await deleteQuiz(quizId);
                    // Refresh quizzes for the lesson after deletion
                    const lessonId = quizToDelete.lesson_id;
                    if (lessonId) {
                      await fetchAndSetLessonQuizzes(lessonId, true);
                    } else {
                      // Module-level quizzes are not supported
                      console.log('Module-level quiz deletion detected, but module-level quizzes are not supported');
                    }
                    setShowDeleteConfirmation(false);
                    setQuizToDelete(null);
                    setIsDeleting(false);
                    toast.success('Quiz deleted successfully!');
                  } catch (err) {
                    console.error('Error deleting quiz:', err);
                    toast.error('Failed to delete quiz.');
                    setIsDeleting(false);
                  }
                }}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </div>
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <EditQuestionModal
        isOpen={showEditQuestionModal}
        onClose={() => {
          setShowEditQuestionModal(false);
          setSelectedQuestionForEdit(null);
        }}
        question={selectedQuestionForEdit}
        quizId={previewQuizData?.id}
        onQuestionUpdated={handleQuestionUpdated}
      />

      {/* Scenario Delete Confirmation Modal */}
      {showScenarioDeleteConfirm && scenarioToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Scenario
            </h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete the scenario "
              {scenarioToDelete.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={cancelDeleteScenario}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteScenario}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizPage;
