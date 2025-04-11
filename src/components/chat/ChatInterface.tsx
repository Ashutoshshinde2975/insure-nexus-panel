
import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "welcome",
    text: "Hello! I'm your InsureNexus assistant. How can I help you with your insurance needs today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

// Initial quick suggestions
const quickSuggestions = [
  "How do I add a new policy?",
  "How to process a claim?",
  "Where can I find my company documents?",
  "What types of policies can I manage?",
];

// Simple responses for predefined questions
const botResponses: Record<string, string> = {
  "how do i add a new policy?": "To add a new policy, go to the Policy Management section and click on the 'Add New Policy' button. Fill in the required details and save.",
  "how to process a claim?": "To process a claim, navigate to the Claim Processing section, review the claim details, and click either 'Approve' or 'Reject' based on your decision.",
  "where can i find my company documents?": "All your company documents can be found in the Documents section. You can filter them by category.",
  "what types of policies can i manage?": "Currently, you can manage Health, Auto, and Home insurance policies through our platform.",
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Process response (simple logic for now)
    setTimeout(() => {
      const lowerCaseInput = inputValue.toLowerCase();
      let responseText = "I'm not sure how to help with that yet. Please contact support for more assistance.";
      
      // Check for predefined responses
      for (const key in botResponses) {
        if (lowerCaseInput.includes(key)) {
          responseText = botResponses[key];
          break;
        }
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);

    // Process response
    setTimeout(() => {
      const lowerCaseInput = suggestion.toLowerCase();
      let responseText = botResponses[lowerCaseInput] || "I'm not sure how to help with that yet. Please contact support for more assistance.";
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsMinimized(false);
    }
    setIsOpen(!isOpen);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full h-14 w-14 shadow-lg"
          size="icon"
        >
          <Bot size={24} />
        </Button>
      )}

      {isOpen && (
        <div className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 border border-border" 
             style={{ width: '350px', height: isMinimized ? '60px' : '500px' }}>
          <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-medium">InsureNexus Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground" onClick={toggleChat}>
                <X size={16} />
              </Button>
            </div>
          </div>

          <Collapsible open={!isMinimized} className="flex-1 flex flex-col">
            <CollapsibleContent className="flex-1 flex flex-col">
              <div className="p-4 flex-1 overflow-y-auto bg-background">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />

                {messages.length === 1 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          className="text-xs bg-accent hover:bg-accent/80 text-accent-foreground px-3 py-1 rounded-full transition-colors"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSend}>
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
}
