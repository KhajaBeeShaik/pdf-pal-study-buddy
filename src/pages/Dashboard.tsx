
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  MessageSquare, 
  BookOpen, 
  Trophy, 
  Clock, 
  FileText,
  ChevronRight,
  Upload,
  BarChart3
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const studyMaterials = [
    {
      title: "Introduction to Psychology",
      chapters: 12,
      progress: 75,
      lastStudied: "2 hours ago",
      quizzesTaken: 8
    },
    {
      title: "Calculus I Textbook",
      chapters: 15,
      progress: 45,
      lastStudied: "1 day ago", 
      quizzesTaken: 5
    },
    {
      title: "World History Notes",
      chapters: 8,
      progress: 90,
      lastStudied: "3 hours ago",
      quizzesTaken: 7
    }
  ];

  const recentActivity = [
    { activity: "Completed Chapter 8 Quiz", subject: "Psychology", time: "2 hours ago" },
    { activity: "Chat session about derivatives", subject: "Calculus", time: "5 hours ago" },
    { activity: "Reviewed Chapter 6", subject: "History", time: "1 day ago" },
    { activity: "Generated new quiz", subject: "Psychology", time: "2 days ago" }
  ];

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
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button onClick={() => navigate('/upload')}>
                <Upload className="h-4 w-4 mr-2" />
                Upload PDF
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Study Dashboard
            </h1>
            <p className="text-gray-600">
              Track your progress and continue learning
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Materials</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-[#26A69A] to-[#00897B] text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 text-sm">Quizzes Taken</p>
                    <p className="text-2xl font-bold">20</p>
                  </div>
                  <Trophy className="h-8 w-8 text-teal-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Study Hours</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Avg. Score</p>
                    <p className="text-2xl font-bold">87%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Study Materials */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-[#1976D2]" />
                    <span>Your Study Materials</span>
                  </CardTitle>
                  <CardDescription>
                    Continue where you left off
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {studyMaterials.map((material, index) => (
                    <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{material.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate('/chat')}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">{material.chapters}</span> chapters
                        </div>
                        <div>
                          <span className="font-medium">{material.quizzesTaken}</span> quizzes taken
                        </div>
                        <div>
                          Last studied <span className="font-medium">{material.lastStudied}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{material.progress}%</span>
                        </div>
                        <Progress value={material.progress} className="h-2" />
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button 
                          size="sm" 
                          onClick={() => navigate('/chat')}
                          className="bg-[#1976D2] hover:bg-[#1565C0]"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate('/quiz')}
                        >
                          <Trophy className="h-4 w-4 mr-1" />
                          Quiz
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-[#26A69A]" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#1976D2] rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item.activity}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.subject} • {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg border-0 mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-[#1976D2] hover:bg-[#1565C0]"
                    onClick={() => navigate('/upload')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/chat')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Chat Session
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/quiz')}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    Take Random Quiz
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
