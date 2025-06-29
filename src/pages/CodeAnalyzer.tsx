// Run API code on port 8010 and React front-end on port 8080

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, Brain, Code, Zap, CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CodeAnalyzer = () => {
  const navigate = useNavigate();

  // States
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [instructions, setInstructions] = useState("");
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hint, setHint] = useState("");
  const [isFetchingHint, setIsFetchingHint] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Sleep function
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8010/api/questions");
        const data = await res.json();
        const validQuestions = data.questions.filter((q: string) => q.trim().length > 0);
        setQuestions(validQuestions);
        setCurrentQuestion(validQuestions[0]);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
      setIsLoading(false);
    };

    fetchQuestions();
  }, []);

  // ℹGet instruction for the current question
  useEffect(() => {
    const fetchInstructions = async () => {
      if (!currentQuestion) return;
      try {
        const res = await fetch("http://localhost:8010/api/instructions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: currentQuestion })
        });
        const data = await res.json();
        setInstructions(data.instructions);
        setCode("");
        setFeedback("");
        setHint("");          
        setShowHint(false);  
      } catch (err) {
        console.error("Failed to fetch instructions", err);
      }
    };

    fetchInstructions();
  }, [currentQuestion]);

  // For toggling the Hint button
  const handleFetchHint = async () => {
    if (showHint) {
      setShowHint(false);
      return;
    }

    setShowHint(true);
  };

  // Submit code for checking
  const handleSubmitCode = async () => {
    if (!code.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:8010/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion, code })
      });

      const data = await res.json();
      setFeedback(data.feedback);

      if (data.correct) {
        // Move to next question if exists
        if (currentIndex + 1 < questions.length) {
          await sleep(7000);
          setCurrentIndex(currentIndex + 1);
          setCurrentQuestion(questions[currentIndex + 1]);
          setShowHint(false)
        } else {
          alert("You've completed all questions!");
        }
      }
    } catch (err) {
      console.error("Failed to check answer", err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-[#1976D2]" />
              <span className="text-xl font-bold text-gray-900">PDF Pal</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Input */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-[#1976D2]" />
                  <span>Code Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading question...</p>
                ) : (
                  <>
                    <p className="mb-4 font-medium text-gray-800">Q{currentQuestion}</p>
                    {/* Hint Button */}
                    <Button
                      onClick={handleFetchHint}
                      disabled={isFetchingHint}
                      className="mb-6 bg-yellow-400 hover:bg-yellow-500 text-black"
                    >
                      {isFetchingHint ? "Loading Hint..." : showHint ? "Hide Hint" : "💡 Show Hint"}
                    </Button>

                    {showHint && (
                      <div className="bg-yellow-100 text-yellow-800 p-3 rounded text-sm mb-4">
                        <pre className="whitespace-pre-wrap break-words">
                          <strong>Hint:</strong> {instructions}
                        </pre>
                      </div>
                    )}
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Paste your code here for analysis..."
                      className="min-h-[250px] font-mono text-sm"
                    />
                    <Button
                      onClick={handleSubmitCode}
                      disabled={isSubmitting || !code.trim()}
                      className="w-full mt-4 bg-[#1976D2] hover:bg-[#1565C0]"
                    >
                      {isSubmitting ? (
                        <>
                          <Zap className="h-4 w-4 mr-2 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Submit Code
                        </>
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Feedback Panel */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-[#26A69A]" />
                  <span>AI Feedback</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!feedback ? (
                  <div className="text-center py-12">
                    <Code className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Submit your code to receive AI feedback.</p>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap text-sm text-gray-800">{feedback}</pre>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAnalyzer;