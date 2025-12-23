
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';

interface RegisterPageProps {
  onLogin: (u: User) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      password
    };

    // Save to mock users list
    const users = JSON.parse(localStorage.getItem('smartq_mock_users') || '[]');
    users.push(newUser);
    localStorage.setItem('smartq_mock_users', JSON.stringify(users));

    const authUser: User = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      avatar: `https://picsum.photos/seed/${newUser.username}/200`,
      questionsCount: 0
    };

    onLogin(authUser);
    navigate('/profile');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl mb-4 shadow-lg shadow-blue-200">
            <i className="fa-solid fa-user-plus"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Join SmartQ</h2>
          <p className="mt-2 text-sm text-slate-500">Create an account to start your journey</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                placeholder="TheScholar99"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all transform active:scale-95 shadow-lg shadow-blue-100"
            >
              Register Now
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-black text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
