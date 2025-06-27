
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Trophy, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  chapter: string;
}

const QuizInterface = () => {
  const navigate = useNavigate();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const sampleQuestions: Question[] = [
    {
      id: 1,
      question: "What is the primary purpose of machine learning?",
      options: [
        "To replace human intelligence completely",
        "To enable computers to learn and make decisions from data",
        "To create robots",
        "To increase computer processing speed"
      ],
      correct: 1,
      chapter: "Introduction to ML"
    },
    {
      id: 2,
      question: "Which of the following is a supervised learning algorithm?",
      options: [
        "K-means clustering",
        "Linear regression",
        "Principal Component Analysis",
        "DBSCAN"
      ],
      correct: 1,
      chapter: "Supervised Learning"
    },
    {
      id: 3,
      question: "What does 'overfitting' mean in machine learning?",
      options: [
        "The model is too simple",
        "The model performs poorly on training data",
        "The model memorizes training data but fails to generalize",
        "The model takes too long to train"
      ],
      correct: 2,
      chapter: "Model Evaluation"
    },
    {
      id: 4,
      question: "Which metric is commonly used for classification problems?",
      options: [
        "Mean Squared Error",
        "Accuracy",
        "R-squared",
        "Mean Absolute Error"
      ],
      correct: 1,
      chapter: "Classification Metrics"
    },
    {
      id: 5,
      question: "What is the purpose of cross-validation?",
      options: [
        "To increase model complexity",
        "To assess model performance and generalization",
        "To reduce training time",
        "To clean the dataset"
      ],
      correct: 1,
      chapter: "Model Validation"
    },
    {
      id: 6,
      question: "Which algorithm is best for finding patterns in unlabeled data?",
      options: [
        "Decision Trees",
        "Linear Regression",
        "K-means Clustering",
        "Support Vector Machines"
      ],
      correct: 2,
      chapter: "Unsupervised Learning"
    },
    {
      id: 7,
      question: "What is feature engineering?",
      options: [
        "Building hardware for ML models",
        "Creating and selecting relevant features from raw data",
        "Engineering new algorithms",
        "Optimizing model parameters"
      ],
      correct: 1,
      chapter: "Feature Engineering"
    },
    {
      id: 8,
      question: "Which activation function is commonly used in neural networks?",
      options: [
        "Linear",
        "ReLU",
        "Polynomial",
        "Logarithmic"
      ],
      correct: 1,
      chapter: "Neural Networks"
    },
    {
      id: 9,
      question: "What is the bias-variance tradeoff?",
      options: [
        "A method to clean data",
        "The balance between model simplicity and complexity",
        "A type of optimization algorithm",
        "A way to measure dataset quality"
      ],
      correct: 1,
      chapter: "Model Theory"
    },
    {
      id: 10,
      question: "Which technique helps prevent overfitting?",
      options: [
        "Adding more features",
        "Increasing model complexity",
        "Regularization",
        "Using smaller datasets"
      ],
      correct: 2,
      chapter: "Regularization"
    }
  ];

  const passingScore = 7; // 70%

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === sampleQuestions[index].correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setQuizCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setScore(0);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-[#1976D2]" />
                <span className="text-xl font-bold text-gray-900">PDF Pal</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-[#1976D2]" />
                  <span>Quiz Interface</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Trophy className="h-16 w-16 text-[#26A69A] mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Machine Learning Quiz
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Test your knowledge with 10 questions generated from your uploaded PDF content. 
                  You need to score 7/10 or higher to pass.
                </p>
                <Button 
                  onClick={handleStartQuiz}
                  className="bg-[#1976D2] hover:bg-[#1565C0] px-8 py-3 text-lg"
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const passed = score >= passingScore;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-[#1976D2]" />
                <span className="text-xl font-bold text-gray-900">PDF Pal</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-[#1976D2]" />
                  <span>Quiz Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                  passed ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {passed ? (
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  ) : (
                    <XCircle className="h-12 w-12 text-red-600" />
                  )}
                </div>
                
                <h3 className={`text-3xl font-bold mb-4 ${
                  passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {passed ? 'Congratulations!' : 'Keep Learning!'}
                </h3>
                
                <p className={`text-xl mb-6 ${
                  passed ? 'text-green-700' : 'text-red-700'
                }`}>
                  You {passed ? 'passed' : 'failed'} the quiz
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {score}/{sampleQuestions.length}
                  </div>
                  <div className="text-gray-600">
                    Score: {Math.round((score / sampleQuestions.length) * 100)}%
                  </div>
                  <div className="text-gray-600">
                    Passing Score: {Math.round((passingScore / sampleQuestions.length) * 100)}%
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={handleRetakeQuiz}
                    variant="outline"
                    className="px-6"
                  >
                    Retake Quiz
                  </Button>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-[#1976D2] hover:bg-[#1565C0] px-6"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-[#1976D2]" />
              <span className="text-xl font-bold text-gray-900">PDF Pal</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-[#1976D2]" />
                  <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
                </CardTitle>
                <div className="text-sm text-gray-600">
                  Chapter: {currentQ.chapter}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-[#1976D2] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </CardHeader>
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {currentQ.question}
              </h3>
              
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:bg-blue-50 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-[#1976D2] bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-[#1976D2] bg-[#1976D2]'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion] === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-[#1976D2] hover:bg-[#1565C0] px-6"
                >
                  {currentQuestion === sampleQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;
