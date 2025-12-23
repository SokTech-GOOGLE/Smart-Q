
import React from 'react';
import { User } from '../types';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-8">
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
                <div className="bg-blue-50 px-4 py-2 rounded-xl text-center">
                  <span className="block text-2xl font-black text-blue-600">{user.questionsCount}</span>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Questions</span>
                </div>
                <div className="bg-indigo-50 px-4 py-2 rounded-xl text-center">
                  <span className="block text-2xl font-black text-indigo-600">0</span>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Answers</span>
                </div>
                <div className="bg-emerald-50 px-4 py-2 rounded-xl text-center">
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
          <h3 className="text-2xl font-bold text-slate-900">Your Activity</h3>
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 text-slate-400">
             <i className="fa-solid fa-timeline text-4xl mb-4"></i>
             <p className="font-medium">You haven't posted any questions yet.</p>
             <p className="text-sm">Start your learning journey by asking something smart!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
