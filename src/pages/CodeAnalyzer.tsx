
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Code, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const CodeAnalyzer = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysis({
        suggestions: [
          "Consider using const instead of let for variables that don't change",
          "Add error handling for potential null/undefined values",
          "Use more descriptive variable names for better readability"
        ],
        optimizations: [
          "Implement memoization for expensive calculations",
          "Use array methods like map/filter instead of loops where appropriate",
          "Consider breaking down large functions into smaller ones"
        ],
        issues: [
          { type: "warning", message: "Unused variable 'temp' on line 5" },
          { type: "info", message: "Consider adding JSDoc comments for better documentation" }
        ],
        complexity: "Medium",
        score: 7.5
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
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
                  <span>🔧 Code Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your code here for analysis..."
                  className="min-h-[400px] font-mono text-sm"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={!code.trim() || isAnalyzing}
                  className="w-full mt-4 bg-[#1976D2] hover:bg-[#1565C0]"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Analyze Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-[#26A69A]" />
                  <span>Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!analysis ? (
                  <div className="text-center py-12">
                    <Code className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Paste your code and click analyze to get suggestions and optimizations.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Score */}
                    <div className="text-center p-4 bg-gradient-to-r from-[#1976D2] to-[#26A69A] text-white rounded-lg">
                      <h3 className="text-lg font-semibold">Code Quality Score</h3>
                      <p className="text-3xl font-bold">{analysis.score}/10</p>
                      <p className="text-sm opacity-90">Complexity: {analysis.complexity}</p>
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        Suggestions
                      </h4>
                      <ul className="space-y-2">
                        {analysis.suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-[#26A69A] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Optimizations */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Code className="h-4 w-4 mr-1" />
                        Optimizations
                      </h4>
                      <ul className="space-y-2">
                        {analysis.optimizations.map((optimization: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-[#1976D2] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{optimization}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Issues */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Issues Found</h4>
                      <ul className="space-y-2">
                        {analysis.issues.map((issue: any, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                              issue.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                            }`} />
                            <span className="text-sm text-gray-700">{issue.message}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
