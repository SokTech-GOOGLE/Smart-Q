
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { GoogleGenAI } from "@google/genai";

const AIDialog: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am SmartQ AI. How can I help you learn today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: "You are SmartQ AI, a versatile tutor and life coach. You give helpful advice, explain tech concepts, answer school questions, and discuss faith with sensitivity. Be concise and conversational.",
        }
      });

      const modelMessage: ChatMessage = { role: 'model', text: response.text || "I didn't quite catch that.", timestamp: Date.now() };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Oops! My brain is a bit fuzzy right now. Let's try again in a second.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <i className="fa-solid fa-sparkles"></i>
          </div>
          <div>
            <h2 className="font-bold text-slate-900 leading-tight">SmartQ Assistant</h2>
            <p className="text-xs text-emerald-500 font-semibold flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span> Online
            </p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 md:p-8 space-y-6"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
            }`}>
              <div className="prose prose-sm max-w-none">
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-2 last:mb-0 leading-relaxed">{line}</p>
                ))}
              </div>
              <div className={`text-[10px] mt-2 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center">
            <button type="button" className="absolute left-4 text-slate-400 hover:text-blue-600 transition-colors">
              <i className="fa-solid fa-paperclip text-lg"></i>
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              className="w-full pl-12 pr-16 py-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50 transition-all text-sm md:text-base"
            />
            <button 
              type="submit" 
              className="absolute right-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
          <div className="flex justify-center space-x-4 mt-3">
             <button onClick={() => setInput("Tell me a Bible story")} className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full hover:bg-slate-200">🙏 Faith</button>
             <button onClick={() => setInput("Explain React hooks")} className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full hover:bg-slate-200">💻 Tech</button>
             <button onClick={() => setInput("Help me with math homework")} className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full hover:bg-slate-200">🎓 School</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDialog;
