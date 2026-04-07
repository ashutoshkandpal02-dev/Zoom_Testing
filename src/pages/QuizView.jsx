import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
  GraduationCap,
  Loader2,
  Award,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BackButton } from "@/components/navigation/BackButton";
import {
  fetchQuizzesByLesson,
  getRemainingAttempts,
  getLatestAttemptScore,
} from "@/services/quizServices";
import { toast } from "sonner";

const quizQuestions = [
  {
    id: "q1",
    question: "What problem does the Context API solve?",
    options: [
      { id: "q1-a", text: "Making API requests more efficient" },
      {
        id: "q1-b",
        text: "Avoiding prop drilling through intermediate components",
      },
      { id: "q1-c", text: "Styling React components" },
      { id: "q1-d", text: "Managing side effects in components" },
    ],
    correctAnswer: "q1-b",
  },
  {
    id: "q2",
    question: "Which function is used to create a context?",
    options: [
      { id: "q2-a", text: "makeContext()" },
      { id: "q2-b", text: "newContext()" },
      { id: "q2-c", text: "createContext()" },
      { id: "q2-d", text: "generateContext()" },
    ],
    correctAnswer: "q2-c",
  },
  {
    id: "q3",
    question:
      "Which component is provided by the Context object to make values available to nested components?",
    options: [
      { id: "q3-a", text: "Context.Consumer" },
      { id: "q3-b", text: "Context.Provider" },
      { id: "q3-c", text: "Context.Supplier" },
      { id: "q3-d", text: "Context.Distributor" },
    ],
    correctAnswer: "q3-b",
  },
];

function QuizView() {
  const { moduleId, unitId, quizId, lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") || "start";
  const lessonIdFromParams = lessonId || searchParams.get("lesson");

  // Quiz list state (for lesson quizzes)
  const [quizzes, setQuizzes] = useState([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState({}); // { quizId: { remainingAttempts, maxAttempts, attempted } }
  const [latestAttempts, setLatestAttempts] = useState({}); // { quizId: { score, percentage, attempt_date, ... } }
  const [loadingAttempts, setLoadingAttempts] = useState({}); // { quizId: boolean }

  // Quiz taking state (existing functionality)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Removed mock quiz data - data now comes from API

  // Fetch quizzes by lesson if lessonId is provided
  useEffect(() => {
    if (lessonIdFromParams && !quizId) {
      const fetchLessonQuizzes = async () => {
        setIsLoadingQuizzes(true);
        try {
          const lessonQuizzes = await fetchQuizzesByLesson(lessonIdFromParams);
          setQuizzes(lessonQuizzes);
          console.log("Fetched quizzes for lesson:", lessonQuizzes);

          // Fetch remaining attempts and latest attempts for each quiz
          if (lessonQuizzes.length > 0) {
            fetchQuizAttemptsData(lessonQuizzes);
          }
        } catch (error) {
          console.error("Error fetching quizzes by lesson:", error);
          toast.error("Failed to load quizzes. Please try again.");
          setQuizzes([]);
        } finally {
          setIsLoadingQuizzes(false);
        }
      };
      fetchLessonQuizzes();
    }
  }, [lessonIdFromParams, quizId]);

  // Fetch remaining attempts and latest attempt for each quiz
  const fetchQuizAttemptsData = async (quizzesList) => {
    const attemptsPromises = quizzesList.map(async (quiz) => {
      const qid = quiz.id || quiz.quizId;
      if (!qid) return null;

      setLoadingAttempts((prev) => ({ ...prev, [qid]: true }));

      try {
        // Fetch remaining attempts and latest attempt in parallel
        const [remainingData, latestData] = await Promise.allSettled([
          getRemainingAttempts(qid),
          getLatestAttemptScore(qid).catch(() => null), // Latest attempt might not exist
        ]);

        // Handle remaining attempts
        if (remainingData.status === "fulfilled") {
          // Backend returns: { code: 200, data: { quizId, maxAttempts, attempted, remainingAttempts }, success: true }
          // The data is already extracted in getRemainingAttempts service function
          console.log(
            `Remaining attempts for quiz ${qid}:`,
            remainingData.value,
          );
          setRemainingAttempts((prev) => ({
            ...prev,
            [qid]: remainingData.value,
          }));
        } else {
          // If remaining attempts fetch fails, set default values
          console.warn(
            `Failed to fetch remaining attempts for quiz ${qid}:`,
            remainingData.reason,
          );
          setRemainingAttempts((prev) => ({
            ...prev,
            [qid]: {
              remainingAttempts: quiz.maxAttempts || 0,
              maxAttempts: quiz.maxAttempts || 0,
              attempted: 0,
            },
          }));
        }

        // Handle latest attempt
        // latestData.value will be null if no attempt found (404), which is valid
        if (latestData.status === "fulfilled") {
          // Backend returns direct JSON: { quizId, attemptId, quizTitle, quizType, userScored, attempt_date, percentage, quizScore, questionCount, totalCorrectAnswers }
          // Or null if no attempt exists
          console.log(`Latest attempt for quiz ${qid}:`, latestData.value);
          setLatestAttempts((prev) => ({
            ...prev,
            [qid]: latestData.value, // Can be null if no attempt exists
          }));
        } else {
          console.warn(
            `Failed to fetch latest attempt for quiz ${qid}:`,
            latestData.reason,
          );
        }
      } catch (error) {
        console.error(`Error fetching attempts data for quiz ${qid}:`, error);
        // Set default values on error
        setRemainingAttempts((prev) => ({
          ...prev,
          [qid]: {
            remainingAttempts: quiz.maxAttempts || 0,
            maxAttempts: quiz.maxAttempts || 0,
            attempted: 0,
          },
        }));
      } finally {
        setLoadingAttempts((prev) => ({ ...prev, [qid]: false }));
      }
    });

    await Promise.all(attemptsPromises);
  };

  useEffect(() => {
    if (mode === "continue") {
      setCurrentQuestion(1);
      setSelectedAnswers({ q1: "q1-b" });
    } else if (mode === "review") {
      setQuizCompleted(true);
      setScore(mockQuizData.lastScore);
      setSelectedAnswers({
        q1: "q1-b",
        q2: "q2-c",
        q3: "q3-a",
      });
    }
  }, [mode]);

  const totalQuestions = quizQuestions.length;
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitting(true);

    const correctAnswers = quizQuestions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer,
    ).length;

    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100);

    setTimeout(() => {
      setScore(calculatedScore);
      setQuizCompleted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const allQuestionsAnswered = quizQuestions.every(
    (q) => selectedAnswers[q.id],
  );

  const currentQuestionData = quizQuestions[currentQuestion];

  // If lessonId is provided and no quizId, show quiz list
  if (lessonIdFromParams && !quizId) {
    return (
      <div className="container py-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Back
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lesson Assessments
          </h1>
          <p className="text-gray-600">
            Select a quiz to begin your assessment
          </p>
        </div>

        {isLoadingQuizzes ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto" />
              <p className="text-gray-600">Loading quizzes...</p>
            </div>
          </div>
        ) : quizzes.length === 0 ? (
          <Card className="p-8 text-center">
            <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Assessments Available
            </h3>
            <p className="text-gray-600 mb-6">
              There are no quizzes available for this lesson yet.
            </p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id || quiz.quizId}
                className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-300"
              >
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-xl font-bold flex items-center gap-2 text-gray-900">
                      <GraduationCap className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                      <span className="line-clamp-2">
                        {quiz.title || "Untitled Quiz"}
                      </span>
                    </CardTitle>
                    <Badge variant="outline" className="ml-2 flex-shrink-0">
                      {quiz.type || "GENERAL"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col pt-6">
                  <div className="space-y-4 flex-1">
                    {/* Quiz Details Grid */}
                    <div className="grid grid-cols-1 gap-3">
                      {quiz.time_estimate && (
                        <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                          <Clock className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                          <span className="font-medium">
                            Estimated time:{" "}
                            <span className="text-gray-900">
                              {quiz.time_estimate} minutes
                            </span>
                          </span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        {(() => {
                          const qid = quiz.id || quiz.quizId;
                          const attemptsData = remainingAttempts[qid];
                          // Use maxAttempts from API response if available, otherwise use quiz data
                          const maxAttempts =
                            attemptsData?.maxAttempts ?? quiz.maxAttempts;
                          return (
                            maxAttempts !== undefined &&
                            maxAttempts !== null && (
                              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                                <CheckCircle className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                                <span className="font-medium">
                                  Max attempts:{" "}
                                  <span className="text-gray-900">
                                    {maxAttempts}
                                  </span>
                                </span>
                              </div>
                            )
                          );
                        })()}
                        {quiz.max_score !== undefined && (
                          <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                            <Award className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                            <span className="font-medium">
                              Max score:{" "}
                              <span className="text-gray-900">
                                {quiz.max_score}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                      {quiz.min_score !== undefined && (
                        <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                          <span className="font-medium">
                            Passing score:{" "}
                            <span className="text-gray-900">
                              {quiz.min_score}%
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Remaining Attempts */}
                    {(() => {
                      const qid = quiz.id || quiz.quizId;
                      const attemptsData = remainingAttempts[qid];
                      const latestAttempt = latestAttempts[qid];
                      const isLoading = loadingAttempts[qid];

                      if (isLoading) {
                        return (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading attempts...</span>
                          </div>
                        );
                      }

                      if (attemptsData) {
                        const remaining = attemptsData.remainingAttempts || 0;
                        const attempted = attemptsData.attempted || 0;
                        const maxAttempts =
                          attemptsData.maxAttempts || quiz.maxAttempts || 0;
                        const hasAttempted = attempted > 0;

                        return (
                          <div className="space-y-3 pt-4 mt-auto border-t border-gray-200">
                            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">
                                Remaining Attempts:
                              </span>
                              <Badge
                                variant={
                                  remaining > 0 ? "default" : "destructive"
                                }
                                className="font-bold text-sm px-3 py-1"
                              >
                                {remaining} / {maxAttempts}
                              </Badge>
                            </div>

                            {/* Latest Attempt Score */}
                            {latestAttempt && (
                              <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-700">
                                    Last Score:
                                  </span>
                                  <Badge
                                    variant={
                                      (latestAttempt.percentage || 0) >=
                                      (quiz.min_score || 40)
                                        ? "default"
                                        : "destructive"
                                    }
                                    className="font-bold text-sm px-3 py-1"
                                  >
                                    {latestAttempt.percentage?.toFixed(1) ||
                                      (latestAttempt.userScored &&
                                      latestAttempt.quizScore
                                        ? (
                                            (latestAttempt.userScored /
                                              latestAttempt.quizScore) *
                                            100
                                          ).toFixed(1)
                                        : "0")}
                                    %
                                  </Badge>
                                </div>
                                {latestAttempt.attempt_date && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      Attempted:{" "}
                                      {new Date(
                                        latestAttempt.attempt_date,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                            {remaining === 0 && (
                              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                                <span className="font-medium">
                                  No attempts remaining
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      }

                      return null;
                    })()}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 pt-4 mt-auto border-t border-gray-200">
                  {(() => {
                    const qid = quiz.id || quiz.quizId;
                    const attemptsData = remainingAttempts[qid];
                    const latestAttempt = latestAttempts[qid];
                    const remaining = attemptsData?.remainingAttempts ?? 0;
                    const attempted = attemptsData?.attempted ?? 0;
                    const hasAttempted =
                      (latestAttempt !== null && latestAttempt !== undefined) ||
                      attempted > 0;

                    // If user has attempted and has remaining attempts, show retake button
                    if (hasAttempted && remaining > 0) {
                      return (
                        <>
                          <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/dashboard/quiz/instruction/${qid}?module=${moduleId}&lesson=${lessonIdFromParams}`,
                                {
                                  state: { quiz },
                                },
                              );
                            }}
                          >
                            <GraduationCap className="h-4 w-4 mr-2" />
                            Retake Quiz ({remaining} left)
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-2 py-6 font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/dashboard/quiz/results/${qid}?module=${moduleId}&lesson=${lessonIdFromParams}`,
                                {
                                  state: {
                                    quiz,
                                    latestAttempt: latestAttempt,
                                  },
                                },
                              );
                            }}
                          >
                            View Previous Results
                          </Button>
                        </>
                      );
                    }

                    // If no attempts remaining
                    if (attemptsData && remaining === 0) {
                      return (
                        <>
                          <Button
                            className="w-full bg-gray-400 hover:bg-gray-500 cursor-not-allowed text-white font-semibold py-6"
                            disabled
                          >
                            <GraduationCap className="h-4 w-4 mr-2" />
                            No Attempts Remaining
                          </Button>
                          {hasAttempted && (
                            <Button
                              variant="outline"
                              className="w-full border-2 py-6 font-semibold"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                  `/dashboard/quiz/results/${qid}?module=${moduleId}&lesson=${lessonIdFromParams}`,
                                  {
                                    state: {
                                      quiz,
                                      latestAttempt: latestAttempt,
                                    },
                                  },
                                );
                              }}
                            >
                              View Results
                            </Button>
                          )}
                        </>
                      );
                    }

                    // First time taking quiz
                    return (
                      <Button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/dashboard/quiz/instruction/${qid}?module=${moduleId}&lesson=${lessonIdFromParams}`,
                            {
                              state: { quiz },
                            },
                          );
                        }}
                      >
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Take Quiz
                      </Button>
                    );
                  })()}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (mode === "review" && !quizCompleted) {
    return (
      <div className="container py-6 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <Link to={`/courses/module/${moduleId}#assessment`}>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Back to Assessment
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Quiz Review: {mockQuizData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{mockQuizData.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Total Questions:</span>
                  <span>{mockQuizData.totalQuestions}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Duration:</span>
                  <span>{mockQuizData.duration}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Passing Score:</span>
                  <span>{mockQuizData.passingScore}%</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Due Date:</span>
                  <span>{mockQuizData.dueDate}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Your Last Score:</span>
                  <Badge
                    variant={
                      mockQuizData.lastScore >= mockQuizData.passingScore
                        ? "default"
                        : "destructive"
                    }
                  >
                    {mockQuizData.lastScore}%
                  </Badge>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Attempts:</span>
                  <span>
                    {mockQuizData.attempts}/{mockQuizData.maxAttempts}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Status:</span>
                  <Badge
                    variant={
                      mockQuizData.lastScore >= mockQuizData.passingScore
                        ? "default"
                        : "outline"
                    }
                  >
                    {mockQuizData.lastScore >= mockQuizData.passingScore
                      ? "Passed"
                      : "Needs Improvement"}
                  </Badge>
                </div>
              </div>
            </div>

            {mockQuizData.lastScore < mockQuizData.passingScore && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">
                    Retake Recommended
                  </p>
                  <p className="text-sm text-amber-700">
                    You scored {mockQuizData.lastScore}% but need{" "}
                    {mockQuizData.passingScore}% to pass. You have{" "}
                    {mockQuizData.maxAttempts - mockQuizData.attempts} attempts
                    remaining.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button asChild className="flex-1">
              <Link
                to={`/courses/module/${moduleId}/unit/${unitId}/quiz/${quizId}?mode=start`}
              >
                Retake Quiz
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/courses/module/${moduleId}#assessment`}>
                Back to Assessment
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Link to={`/courses/module/${moduleId}#assessment`}>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Assessment
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span className="text-sm">
            Time remaining: {mockQuizData.timeRemaining}
          </span>
        </div>
      </div>

      {!quizCompleted ? (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{mockQuizData.title}</h1>
              {mode === "continue" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle size={14} />
                  Continuing
                </Badge>
              )}
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span className="font-medium">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <Card className="mb-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQuestionData.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestionData.id]}
                onValueChange={(value) =>
                  handleAnswerSelect(currentQuestionData.id, value)
                }
              >
                {currentQuestionData.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 py-2"
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label
                      htmlFor={option.id}
                      className="cursor-pointer w-full"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft size={16} className="mr-2" />
                Previous
              </Button>

              {currentQuestion < totalQuestions - 1 ? (
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswers[currentQuestionData.id]}
                >
                  Next
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={!allQuestionsAnswered || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              )}
            </CardFooter>
          </Card>

          {!allQuestionsAnswered && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">
                  Some questions are unanswered
                </p>
                <p className="text-sm text-amber-700">
                  Please answer all questions before submitting the quiz.
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <Card className="overflow-hidden shadow-sm">
          <div
            className={`h-2 ${score >= mockQuizData.passingScore ? "bg-green-500" : "bg-red-500"}`}
          ></div>
          <CardHeader>
            <CardTitle className="text-2xl flex justify-between items-center">
              <span>Quiz Results</span>
              <Badge
                variant={
                  score >= mockQuizData.passingScore ? "default" : "destructive"
                }
              >
                {score}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="py-6 px-4 rounded-lg bg-muted text-center">
              <h3 className="text-xl font-bold mb-2">
                {score >= mockQuizData.passingScore
                  ? "Congratulations! 🎉"
                  : "Keep Learning! 📚"}
              </h3>
              <p className="text-muted-foreground">
                {score >= mockQuizData.passingScore
                  ? "You have passed this quiz and demonstrated your understanding of Context API."
                  : "You did not pass this time. Review the material and try again."}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Quiz Summary</h4>
              <div className="flex items-center justify-between text-sm border-b pb-2">
                <span>Total Questions</span>
                <span>{totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-b pb-2">
                <span>Correct Answers</span>
                <span>{Math.round((score / 100) * totalQuestions)}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-b pb-2">
                <span>Score</span>
                <span>{score}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Pass Threshold</span>
                <span>{mockQuizData.passingScore}%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link to={`/courses/module/${moduleId}#assessment`}>
                Back to Assessment
              </Link>
            </Button>
            {score < mockQuizData.passingScore && (
              <Button asChild className="w-full sm:w-auto">
                <Link
                  to={`/courses/module/${moduleId}/unit/${unitId}/quiz/${quizId}?mode=start`}
                >
                  Retake Quiz
                </Link>
              </Button>
            )}
            {score >= mockQuizData.passingScore && (
              <Button asChild className="w-full sm:w-auto">
                <Link to={`/courses/module/${moduleId}`}>
                  Continue to Next Unit
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default QuizView;
