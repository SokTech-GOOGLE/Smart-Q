
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm">
                <span className="font-black">Q</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-blue-900">SmartQ</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering learners with intelligent answers. Ask smart, learn faster with our AI-powered community.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600">Browse Questions</a></li>
              <li><a href="#" className="hover:text-blue-600">Categories</a></li>
              <li><a href="#" className="hover:text-blue-600">Smart AI</a></li>
              <li><a href="#" className="hover:text-blue-600">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600">Guidelines</a></li>
              <li><a href="#" className="hover:text-blue-600">API Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
          <p>© 2024 SmartQ. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-600"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-600"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="hover:text-blue-600"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
