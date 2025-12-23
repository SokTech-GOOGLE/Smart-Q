
import React from 'react';
import { Link } from 'react-router-dom';
import { Question, Category } from '../types';

interface HomePageProps {
  questions: Question[];
}

const CategoryCard = ({ icon, label, color }: { icon: string, label: string, color: string }) => (
  <Link to={`/categories?selected=${label}`} className={`flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group cursor-pointer`}>
    <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-3 group-hover:scale-110 transition-transform`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <span className="font-semibold text-slate-700 text-sm">{label}</span>
  </Link>
);

const HomePage: React.FC<HomePageProps> = ({ questions }) => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-24 overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 -mr-20 mt-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-10 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
              Ask <span className="text-blue-600">Smart</span> Questions. <br />
              Get <span className="text-blue-600">Smart</span> Answers.
            </h1>
            <p className="text-xl text-slate-500 mb-10">
              The AI-powered platform for curiosity. Join thousands of learners getting instant expert answers to life's toughest questions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <div className="relative w-full sm:w-96">
                <input 
                  type="text" 
                  placeholder="Ask anything..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none shadow-lg shadow-blue-100/50 transition-all text-lg"
                />
                <i className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
              </div>
              <Link to="/ask" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                Ask Now
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
               <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">#AIpowered</span>
               <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100">#SmartLearning</span>
               <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">#CommunityKnowledge</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Explore Categories</h2>
            <p className="text-slate-500 mt-2">Find answers in every field imaginable.</p>
          </div>
          <Link to="/categories" className="text-blue-600 font-bold hover:underline">View All <i className="fa-solid fa-arrow-right ml-1"></i></Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <CategoryCard icon="fa-graduation-cap" label="Education" color="bg-blue-500" />
          <CategoryCard icon="fa-microchip" label="Technology" color="bg-slate-700" />
          <CategoryCard icon="fa-heart" label="Relationships" color="bg-rose-500" />
          <CategoryCard icon="fa-briefcase" label="Business" color="bg-amber-500" />
          <CategoryCard icon="fa-dove" label="Faith" color="bg-indigo-500" />
          <CategoryCard icon="fa-globe" label="General" color="bg-emerald-500" />
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Trending Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.slice(0, 4).map((q) => (
              <Link 
                key={q.id} 
                to={`/question/${q.id}`}
                className="p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all bg-white"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{q.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-400">{new Date(q.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {q.title}
                </h3>
                <p className="text-slate-500 line-clamp-2 text-sm mb-4">
                  {q.content}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center space-x-3">
                    <img src={`https://picsum.photos/seed/${q.author}/40/40`} className="w-8 h-8 rounded-full border border-slate-200" alt="" />
                    <span className="text-sm font-medium text-slate-600">{q.author}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-400">
                    <span className="flex items-center text-xs"><i className="fa-solid fa-heart mr-1.5 text-rose-400"></i> {q.likes}</span>
                    <span className="flex items-center text-xs"><i className="fa-solid fa-comment mr-1.5"></i> 3</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-blue-200">
            <div className="max-w-xl mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Meet Your Personal AI Assistant</h2>
              <p className="text-blue-100 text-lg opacity-90">
                Need deep answers instantly? Our SmartQ AI is trained across hundreds of disciplines to help you solve problems and learn faster.
              </p>
            </div>
            <Link to="/ai" className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
              Try SmartQ AI <i className="fa-solid fa-sparkles ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
