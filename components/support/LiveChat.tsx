import { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../../services/chatService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

export function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Soni, your SONIVALE support assistant. How can I help you today?",
      sender: 'system',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ role: string, content: string }>>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setError(null);
    console.log('Sending message:', inputMessage);

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Update chat history
    const updatedHistory = [...chatHistory, { role: 'user', content: inputMessage }];
    setChatHistory(updatedHistory);

    try {
      // Get chatbot response
      const response = await getChatbotResponse(inputMessage, updatedHistory);
      
      // Add assistant message
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setChatHistory([...updatedHistory, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error in chat interaction:', error);
      const errorMessage = error instanceof Error 
        ? error.message
        : 'An unknown error occurred';
      
      setError(errorMessage);
      
      const systemMessage: Message = {
        id: messages.length + 2,
        text: "I apologize, but I'm having trouble connecting to our AI service. Please try again in a moment.",
        sender: 'system',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, systemMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white/95 backdrop-blur-lg rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">SONIVALE Support</h2>
        <p className="text-sm opacity-75">Chat with Soni, our AI assistant</p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                  : message.sender === 'system'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-white border border-orange-200 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}