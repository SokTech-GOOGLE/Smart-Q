
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category, Question, User } from '../types';
import { getInstantAnswer } from '../services/geminiService';

interface AskPageProps {
  onAdd: (q: Question) => void;
  user: User | null;
}

const AskPage: React.FC<AskPageProps> = ({ onAdd, user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(Category.GENERAL);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewAI, setPreviewAI] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setIsSubmitting(true);
    
    // Get AI answer preview first
    const answer = await getInstantAnswer(title + " " + content, category);
    setPreviewAI(answer);

    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      category,
      isAnonymous,
      author: isAnonymous ? 'Anonymous' : (user?.username || 'Guest'),
      createdAt: Date.now(),
      likes: 0,
      aiAnswer: answer
    };

    onAdd(newQuestion);
    setIsSubmitting(false);
    
    // Auto navigate after a brief delay so they see the result
    setTimeout(() => {
        navigate(`/question/${newQuestion.id}`);
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Ask a Question</h1>
          <p className="text-slate-500">The community and AI are here to help you.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Be specific and clear..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                {Object.values(Category).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Details</label>
              <textarea 
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Explain what you need help with..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              ></textarea>
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="anon"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="anon" className="ml-2 text-sm text-slate-600">Post anonymously</label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg ${
                isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Generating Instant Answer...
                </span>
              ) : 'Submit Question'}
            </button>
          </form>

          {previewAI && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl animate-pulse">
              <div className="flex items-center space-x-2 mb-3">
                <i className="fa-solid fa-sparkles text-blue-600"></i>
                <span className="font-bold text-blue-900 text-sm">SmartQ AI Answer:</span>
              </div>
              <p className="text-blue-800 text-sm italic">
                {previewAI.substring(0, 100)}...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AskPage;
