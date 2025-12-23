
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Question } from '../types';

interface QuestionDetailProps {
  questions: Question[];
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ questions }) => {
  const { id } = useParams<{ id: string }>();
  const question = questions.find(q => q.id === id);

  if (!question) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Question not found.</h2>
        <Link to="/" className="text-blue-600 underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-400 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-blue-600">{question.category}</Link>
          <span>/</span>
          <span className="text-slate-600 truncate max-w-[200px]">{question.title}</span>
        </div>

        {/* The Question Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <img src={`https://picsum.photos/seed/${question.author}/64/64`} className="w-10 h-10 rounded-full bg-slate-100" alt="" />
            <div>
              <p className="font-bold text-slate-900 leading-none">{question.author}</p>
              <p className="text-xs text-slate-400 mt-1">Asked on {new Date(question.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
            {question.title}
          </h1>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-8">
            {question.content}
          </div>
          <div className="flex items-center justify-between border-t border-slate-50 pt-6">
            <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-slate-500 hover:text-rose-500 transition-colors">
                <i className="fa-regular fa-heart text-lg"></i>
                <span className="font-semibold text-sm">{question.likes} helpful</span>
              </button>
              <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors">
                <i className="fa-regular fa-share-from-square text-lg"></i>
                <span className="font-semibold text-sm">Share</span>
              </button>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wider">
              {question.category}
            </span>
          </div>
        </div>

        {/* AI Answer Section */}
        {question.aiAnswer && (
          <div className="bg-blue-600 rounded-3xl p-8 shadow-xl shadow-blue-200 relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <i className="fa-solid fa-sparkles text-7xl text-white"></i>
            </div>
            <div className="flex items-center space-x-3 mb-6 relative z-10">
              <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center text-white backdrop-blur-md">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3 className="text-xl font-bold text-white">SmartQ AI Instant Expert</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-blue-50 relative z-10 border border-white/10 leading-relaxed">
              {question.aiAnswer.split('\n').map((para, i) => (
                <p key={i} className="mb-4 last:mb-0">{para}</p>
              ))}
            </div>
            <div className="mt-6 flex items-center space-x-4 relative z-10">
               <button className="text-xs font-bold text-blue-100 hover:text-white flex items-center">
                 <i className="fa-solid fa-thumbs-up mr-2"></i> Good Answer
               </button>
               <button className="text-xs font-bold text-blue-100 hover:text-white flex items-center">
                 <i className="fa-solid fa-thumbs-down mr-2"></i> Needs improvement
               </button>
            </div>
          </div>
        )}

        {/* Community Answers (Mock) */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-slate-900 flex items-center">
            Community Answers <span className="ml-2 text-sm bg-slate-200 px-2 py-0.5 rounded-full text-slate-600">0</span>
          </h4>
          <div className="bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400">
             <i className="fa-solid fa-comments text-4xl mb-4"></i>
             <p className="font-medium">No community answers yet. Be the first!</p>
             <button className="mt-4 px-6 py-2 bg-white text-slate-600 rounded-full font-bold shadow-sm hover:shadow-md transition-all">
                Write Answer
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
