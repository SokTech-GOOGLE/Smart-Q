
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Question } from '../types';

interface ProfilePageProps {
  user: User;
  questions: Question[];
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, questions, onLogout }) => {
  const userQuestions = questions.filter(q => q.author === user.username && !q.isAnonymous);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img 
              src={user.avatar} 
              className="w-32 h-32 rounded-3xl border-4 border-slate-50 shadow-lg object-cover" 
              alt={user.username} 
            />
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl font-black text-slate-900 mb-2">{user.username}</h1>
              <p className="text-slate-500 mb-6 font-medium">{user.email}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-blue-50 px-4 py-2 rounded-xl text-center min-w-[80px]">
                  <span className="block text-2xl font-black text-blue-600">{userQuestions.length}</span>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Questions</span>
                </div>
                <div className="bg-indigo-50 px-4 py-2 rounded-xl text-center min-w-[80px]">
                  <span className="block text-2xl font-black text-indigo-600">0</span>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Answers</span>
                </div>
                <div className="bg-emerald-50 px-4 py-2 rounded-xl text-center min-w-[80px]">
                   <span className="block text-2xl font-black text-emerald-600">12</span>
                   <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Credits</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="px-6 py-2 bg-slate-100 text-slate-500 rounded-full font-bold text-sm hover:bg-rose-50 hover:text-rose-500 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-black text-slate-900">Your Asked Questions</h3>
            <Link to="/ask" className="text-sm font-bold text-blue-600 hover:underline">+ Ask New</Link>
          </div>
          
          {userQuestions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {userQuestions.map(q => (
                <Link 
                  key={q.id} 
                  to={`/question/${q.id}`}
                  className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all flex justify-between items-center group"
                >
                  <div className="flex-grow mr-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-[10px] font-bold uppercase text-blue-500 px-2 py-0.5 bg-blue-50 rounded-full">{q.category}</span>
                      <span className="text-[10px] text-slate-400">{new Date(q.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{q.title}</h4>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-300">
                    <div className="text-center">
                      <span className="block text-xs font-bold text-slate-600">{q.likes}</span>
                      <span className="text-[8px] uppercase font-bold">Likes</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-slate-200 group-hover:text-blue-400 transition-colors"></i>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-100 text-slate-400 shadow-sm">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <i className="fa-solid fa-history text-2xl text-slate-300"></i>
               </div>
               <p className="font-bold text-slate-600">No questions yet</p>
               <p className="text-sm mb-6">Your history will appear here once you start asking.</p>
               <Link to="/ask" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 inline-block">
                  Ask Your First Question
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
