
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, CheckCircle, ArrowLeft, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      handleFileUpload(pdfFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    setUploadedFile(file);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          toast({
            title: "Upload successful!",
            description: "Your PDF has been parsed and is ready for study",
          });
        }, 500);
      }
      setUploadProgress(progress);
    }, 200);
  };

  const processToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Navigation */}
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

      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Upload Your Study Material
            </h1>
            <p className="text-lg text-gray-600">
              Upload a PDF and let our AI create a personalized study experience for you
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-[#1976D2]" />
                <span>PDF Upload</span>
              </CardTitle>
              <CardDescription>
                Drag and drop your PDF file or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploadedFile || uploadProgress < 100 ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    isDragging
                      ? 'border-[#1976D2] bg-blue-50'
                      : 'border-gray-300 hover:border-[#1976D2] hover:bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {isUploading ? (
                    <div className="space-y-4">
                      <FileText className="h-12 w-12 text-[#1976D2] mx-auto animate-pulse" />
                      <div>
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          Processing {uploadedFile?.name}
                        </p>
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-sm text-gray-500 mt-2">
                          {Math.round(uploadProgress)}% complete
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Drop your PDF here
                        </p>
                        <p className="text-gray-600 mb-4">
                          or click to browse files
                        </p>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button asChild>
                          <label htmlFor="file-upload" className="cursor-pointer">
                            Browse Files
                          </label>
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Supported format: PDF (Max 50MB)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Upload Complete!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {uploadedFile.name} has been successfully processed
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-gray-700">Chapters detected</span>
                        <span className="font-semibold text-green-600">8</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm text-gray-700">Study plan created</span>
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm text-gray-700">AI tutor ready</span>
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <Button 
                      onClick={processToDashboard}
                      className="w-full mt-6 bg-[#1976D2] hover:bg-[#1565C0]"
                      size="lg"
                    >
                      Start Studying
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload Tips */}
          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-teal-50 border-[#1976D2]/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Tips for better results:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#1976D2] rounded-full mt-2"></div>
                  <span>Use clear, text-based PDFs for best parsing results</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#26A69A] rounded-full mt-2"></div>
                  <span>Structured documents with chapters work best</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#1976D2] rounded-full mt-2"></div>
                  <span>Academic textbooks and course notes are ideal</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
