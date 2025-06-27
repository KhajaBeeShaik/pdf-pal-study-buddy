
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import ChatInterface from "./pages/ChatInterface";
import QuizInterface from "./pages/QuizInterface";
import Profile from "./pages/Profile";
import CodeAnalyzer from "./pages/CodeAnalyzer";
import EDAInsights from "./pages/EDAInsights";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/quiz" element={<QuizInterface />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/code-analyzer" element={<CodeAnalyzer />} />
          <Route path="/eda-insights" element={<EDAInsights />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
