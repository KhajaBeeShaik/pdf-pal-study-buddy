import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, MessageSquare, Send, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define an interface for your message objects
interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
  isSystem?: boolean; // Optional property for system messages (true if it's a system message)
  isError?: boolean;  // Optional property for error messages (true if it's an error message)
}

const ChatInterface = () => {
  const navigate = useNavigate();
  // Use the ChatMessage interface for useState
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! What would you like to learn about today? ",
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
      isSystem: false // Default to false for the initial message
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState("Miles Morales");

  const messagesEndRef = useRef<HTMLDivElement>(null); // Explicitly type useRef

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const suggestionQuestions = [
    "What are the key formulas I should remember?",
    "Summarize the most important points",
    "What topics should I focus on for the exam?",
    "Help me understand this difficult concept"
  ];

  const personaOptions = [
    "Miles Morales",
    "Entrepreneur",
    "Sun Tzu"
  ];

  const handlePersonaChange = async (event: React.ChangeEvent<HTMLSelectElement>) => { // Explicit type for event
    const newPersona = event.target.value;
    setSelectedPersona(newPersona);
    console.log(`Attempting to set persona to: ${newPersona}`);

    try {
      const response = await fetch('http://localhost:9000/persona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ persona: newPersona }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // --- START OF CHANGE ---
      // Removed: const data = await response.json();
      // Removed: console.log("Backend persona update response:", data);
      console.log(`Successfully updated persona to: ${newPersona} on backend.`); // Log success without parsing response
      // --- END OF CHANGE ---

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + Math.random(),
          text: `Persona changed to: **${newPersona}**. I will now respond as an ${newPersona}.`,
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
          isSystem: true // This is the system message
        }
      ]);
    } catch (error: any) { // Explicit type for error
      console.error("Error updating persona on backend:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + Math.random(),
          text: `Failed to update persona to **${newPersona}**. Please try again. Error: ${error.message}`,
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
          isError: true // Mark as an error system message
        }
      ]);
    }
  };


  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessageText = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    const newUserMessage: ChatMessage = { // Explicitly type the new message
      id: Date.now() + Math.random(),
      text: userMessageText,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
      isSystem: false // User messages are not system messages
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    try {
      const response = await fetch('http://localhost:9000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessageText, persona: selectedPersona }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.response || "Sorry, I couldn't get a response from the AI.";

      const botResponse: ChatMessage = { // Explicitly type the bot message
        id: Date.now() + Math.random(),
        text: botResponseText,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
        isSystem: false // Bot responses are not system messages
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error: any) { // Explicit type for error
      console.error("Error sending message to backend:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + Math.random(),
          text: "Oops! Something went wrong. Please try again later.",
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
          isError: true // Mark as an error message
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isLoading) {
      setInputMessage(suggestion);
    }
  };

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
          <Card className="shadow-lg border-0 h-[700px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-[#1976D2]" />
                    <span>AI Tutor Chat</span>
                </div>

                <div className="flex items-center space-x-2 ml-auto">
                  <label htmlFor="persona-select" className="text-sm font-medium text-gray-700 sr-only">Select Persona</label>
                  <select
                    id="persona-select"
                    value={selectedPersona}
                    onChange={handlePersonaChange}
                    className="block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm transition duration-150 ease-in-out"
                    disabled={isLoading}
                  >
                    {personaOptions.map((persona) => (
                      <option key={persona} value={persona}>
                        {persona}
                      </option>
                    ))}
                  </select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-6">
              <div className="flex-1 overflow-y-auto overflow-x-hidden mb-4 space-y-4 bg-gray-50 rounded-lg p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`
                        px-4 py-2 rounded-lg relative break-words
                        ${message.isBot && !message.isSystem && !message.isError
                          ? 'bg-white text-gray-800 shadow-sm' // Standard bot message
                          : message.isError
                            ? '!bg-red-100 !text-red-800 !shadow-md' // Error message
                            : message.isSystem
                              ? '!bg-blue-100 !text-blue-800 !shadow-md' // System message
                              : 'bg-[#1976D2] text-white' // User message (default for non-bot)
                        }
                        max-w-[calc(100%-2rem)]
                        sm:max-w-[75%] lg:max-w-[65%]
                        prose prose-sm
                        ${!message.isSystem && !message.isError && message.isBot ? 'prose-gray' : ''}
                        ${!message.isSystem && !message.isError && !message.isBot ? 'prose-invert' : ''}
                      `}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.text}
                      </ReactMarkdown>
                      <p className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-lg bg-white text-gray-800 shadow-sm
                      max-w-[calc(100%-2rem)] sm:max-w-[75%] lg:max-w-[65%]
                      prose prose-sm prose-gray">
                      <p className="text-sm">AI is thinking...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Suggested questions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestionQuestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-left justify-start text-xs h-auto py-2 px-3"
                      disabled={isLoading}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about your uploaded materials..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;