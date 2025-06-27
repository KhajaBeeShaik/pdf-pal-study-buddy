
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, BarChart3, Upload, TrendingUp, PieChart } from "lucide-react";
import { useState } from "react";

const EDAInsights = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [insights, setInsights] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
      setInsights(null);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setInsights({
        summary: {
          rows: 1250,
          columns: 8,
          missing_values: 23,
          data_types: { numeric: 5, categorical: 3 }
        },
        statistics: {
          mean_age: 34.5,
          median_salary: 65000,
          std_revenue: 15000,
          correlation_score: 0.78
        },
        visualizations: [
          { type: 'histogram', title: 'Age Distribution', description: 'Shows the distribution of ages in the dataset' },
          { type: 'scatter', title: 'Salary vs Experience', description: 'Correlation between salary and years of experience' },
          { type: 'bar', title: 'Department Breakdown', description: 'Count of employees by department' }
        ],
        insights: [
          "Strong positive correlation between experience and salary",
          "Most employees are in the 25-40 age range",
          "Engineering department has the highest average salary",
          "23 records have missing values that may need attention"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
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
            {/* Upload Section */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-[#26A69A]" />
                  <span>📊 Dataset Upload</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#26A69A] transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Upload your CSV file to get instant insights
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="cursor-pointer bg-[#26A69A] text-white px-4 py-2 rounded-lg hover:bg-[#00897B] transition-colors"
                  >
                    Choose CSV File
                  </label>
                </div>
                
                {uploadedFile && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">File uploaded:</p>
                    <p className="text-green-600 text-sm">{uploadedFile.name}</p>
                    <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full mt-3 bg-[#26A69A] hover:bg-[#00897B]"
                    >
                      {isAnalyzing ? (
                        <>
                          <BarChart3 className="h-4 w-4 mr-2 animate-pulse" />
                          Analyzing Dataset...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Generate Insights
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-[#26A69A]" />
                  <span>Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!insights ? (
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Upload a CSV file to see summary statistics and visualizations.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Dataset Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-[#1976D2]">{insights.summary.rows}</p>
                        <p className="text-sm text-gray-600">Rows</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-[#26A69A]">{insights.summary.columns}</p>
                        <p className="text-sm text-gray-600">Columns</p>
                      </div>
                    </div>

                    {/* Key Statistics */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Statistics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Mean Age:</span>
                          <span className="font-medium">{insights.statistics.mean_age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Median Salary:</span>
                          <span className="font-medium">${insights.statistics.median_salary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Correlation Score:</span>
                          <span className="font-medium">{insights.statistics.correlation_score}</span>
                        </div>
                      </div>
                    </div>

                    {/* Visualizations */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Available Visualizations</h4>
                      <div className="space-y-3">
                        {insights.visualizations.map((viz: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <h5 className="font-medium text-gray-800">{viz.title}</h5>
                            <p className="text-sm text-gray-600">{viz.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Insights</h4>
                      <ul className="space-y-2">
                        {insights.insights.map((insight: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <TrendingUp className="h-4 w-4 text-[#26A69A] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{insight}</span>
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

export default EDAInsights;
