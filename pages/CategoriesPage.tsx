
import React from 'react';
import { Category } from '../types';
import { Link } from 'react-router-dom';

const CategoryDetailedCard = ({ cat, desc, icon, color }: { cat: string, desc: string, icon: string, color: string }) => (
  <Link to={`/`} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
    <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-3">{cat}</h3>
    <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
    <span className="text-blue-600 font-bold flex items-center text-sm group-hover:translate-x-2 transition-transform">
      Explore topics <i className="fa-solid fa-arrow-right ml-2"></i>
    </span>
  </Link>
);

const CategoriesPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-6">Master Any Subject</h1>
          <p className="text-xl text-slate-500">From the smallest physics particle to the biggest business decisions, find expert answers here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CategoryDetailedCard 
            cat={Category.EDUCATION} 
            desc="School subjects, learning strategies, higher education, and vocational skills." 
            icon="fa-graduation-cap" 
            color="bg-blue-600"
          />
          <CategoryDetailedCard 
            cat={Category.TECHNOLOGY} 
            desc="Coding, hardware, software engineering, AI, and digital trends." 
            icon="fa-microchip" 
            color="bg-slate-800"
          />
          <CategoryDetailedCard 
            cat={Category.BUSINESS} 
            desc="Entrepreneurship, marketing, finance, management, and careers." 
            icon="fa-briefcase" 
            color="bg-amber-600"
          />
          <CategoryDetailedCard 
            cat={Category.RELATIONSHIPS} 
            desc="Friendship, family, dating, and mental well-being advice." 
            icon="fa-heart" 
            color="bg-rose-500"
          />
          <CategoryDetailedCard 
            cat={Category.FAITH} 
            desc="Spiritual growth, biblical wisdom, theology, and philosophy." 
            icon="fa-dove" 
            color="bg-indigo-600"
          />
          <CategoryDetailedCard 
            cat={Category.GENERAL} 
            desc="Anything else! Trivia, life hacks, travel, and curiosities." 
            icon="fa-globe" 
            color="bg-emerald-600"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
