
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Ask', path: '/ask' },
    { name: 'Categories', path: '/categories' },
    { name: 'AI Assistant', path: '/ai' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl">
              <i className="fa-solid fa-brain-circuit"></i>
              <span className="font-black">Q</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-blue-900">SmartQ</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Log in</Link>
            <Link to="/ask" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-blue-200">
              Ask Smart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
