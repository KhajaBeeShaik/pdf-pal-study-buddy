import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Upload, PieChart } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { uploadDataset, getEdaPlan } from "@/lib/edaApi";
import QuickSummary from "@/components/QuickSummary";
import StepByStepEDA from "@/components/StepByStepEDA";

const EDAInsights = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [plan, setPlan] = useState<{ data_summary: any; step_plan: any[] } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [view, setView] = useState<"summary" | "univariate">("summary");

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadedFile(file);

    // 1️⃣ upload dataset
    try {
      const resp = await uploadDataset(file);
      if (!resp.success) {
        alert(resp.message ?? "Upload failed");
        setIsUploading(false);
        return;
      }
      const sid = resp.data.session_id as string;
      setSessionId(sid);

      // 2️⃣ fetch EDA plan
      const planResp = await getEdaPlan(sid);
      if (planResp.success) {
        setPlan(planResp.data);
      } else {
        alert("Failed to fetch EDA plan");
      }
    } catch (err: any) {
      console.error(err);
      alert("Unexpected error – see console for details");
    } finally {
      setIsUploading(false);
    }
  };

  // view handlers
  const proceedToUnivariate = () => setView("univariate");

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
                    {isUploading && <p className="text-sm text-gray-500">Uploading &amp; analyzing…</p>}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-[#26A69A]" />
                  <span>Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!plan ? (
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Upload a CSV file to see summary statistics and visualizations.
                    </p>
                  </div>
                ) : view === "summary" ? (
                  <QuickSummary summary={plan.data_summary} onProceed={proceedToUnivariate} />
                ) : (
                  sessionId && (
                    <StepByStepEDA
                      sessionId={sessionId}
                      stepPlan={plan.step_plan}
                      onBack={() => setView("summary")}
                    />
                  )
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
