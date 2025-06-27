
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Upload, MessageSquare, Brain, ChartBar, BookOpen, Zap, Code, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Upload className="h-8 w-8 text-[#1976D2]" />,
      title: "📄 Smart PDF Upload",
      subtitle: "Upload your course materials and let our AI organize them into chapters.",
      route: "/upload",
      interactive: true
    },
    {
      icon: <Brain className="h-8 w-8 text-[#26A69A]" />,
      title: "🧠 AI Tutor Assistant",
      subtitle: "Ask doubts, explore topics, and get Socratic tutoring from your uploaded content.",
      route: "/chat",
      interactive: true
    },
    {
      icon: <Code className="h-8 w-8 text-[#1976D2]" />,
      title: "🔧 Code Analyzer",
      subtitle: "Analyze your code and receive suggestions and optimized alternatives.",
      route: "/code-analyzer",
      interactive: true
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-[#26A69A]" />,
      title: "📊 EDA Insights",
      subtitle: "Upload a dataset and get summary statistics and visualizations instantly.",
      route: "/eda-insights",
      interactive: true
    },
    {
      icon: <BookOpen className="h-8 w-8 text-[#1976D2]" />,
      title: "Auto Quiz Generation",
      subtitle: "Automatically generate quizzes from each chapter with multiple choice and short answer questions.",
      route: "/quiz",
      interactive: true
    },
    {
      icon: <ChartBar className="h-8 w-8 text-[#26A69A]" />,
      title: "Progress Tracking",
      subtitle: "Monitor your learning progress with detailed analytics and performance insights.",
      route: "/dashboard",
      interactive: true
    }
  ];

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-[#1976D2]" />
              <span className="text-xl font-bold text-gray-900">PDF Pal</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button onClick={() => navigate('/upload')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Your AI-Powered 
            <span className="text-[#1976D2]"> Study Companion</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Upload your PDFs, analyze code, explore datasets, and chat with an AI tutor. 
            Transform your study materials into an interactive learning experience.
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in">
            <Button 
              size="lg" 
              onClick={() => navigate('/upload')}
              className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-8 py-3 text-lg"
            >
              Upload Your First PDF
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="border-[#1976D2] text-[#1976D2] hover:bg-[#1976D2] hover:text-white px-8 py-3 text-lg"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Study Smarter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform transforms your study materials into an interactive learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all duration-300 border-0 shadow-md hover-scale ${
                  feature.interactive ? 'cursor-pointer hover:bg-gray-50' : ''
                }`}
                onClick={() => feature.interactive && handleFeatureClick(feature.route)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {feature.subtitle}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#1976D2] to-[#26A69A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Study Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who are already studying smarter with PDF Pal
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/upload')}
            className="bg-white text-[#1976D2] hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-[#26A69A]" />
                <span className="text-lg font-bold">PDF Pal</span>
              </div>
              <p className="text-gray-400">
                Your AI-powered study companion for smarter learning.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>PDF Upload & Parsing</li>
                <li>AI Tutor Chat</li>
                <li>Code Analysis</li>
                <li>EDA Insights</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PDF Pal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
