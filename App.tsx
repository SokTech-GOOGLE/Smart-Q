
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AskPage from './pages/AskPage';
import CategoriesPage from './pages/CategoriesPage';
import AIDialog from './pages/AIDialog';
import QuestionDetail from './pages/QuestionDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import { Question, User, Category } from './types';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('smartq_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const savedQs = localStorage.getItem('smartq_questions');
    if (savedQs) {
      setQuestions(JSON.parse(savedQs));
    } else {
      // Seed initial data
      const initial: Question[] = [
        {
          id: '1',
          title: 'How does quantum entanglement work in simple terms?',
          category: Category.TECHNOLOGY,
          content: 'I keep hearing about "spooky action at a distance". Can someone explain it simply?',
          author: 'Alex J.',
          isAnonymous: false,
          createdAt: Date.now() - 86400000,
          likes: 24,
          aiHelpfulCount: 15,
          aiAnswer: "Quantum entanglement is a physical phenomenon that occurs when a pair or group of particles is generated, interact, or share spatial proximity in a way such that the quantum state of each particle cannot be described independently of the state of the others, even when the particles are separated by a large distance."
        },
        {
          id: '2',
          title: 'What are the best habits for learning a new language?',
          category: Category.EDUCATION,
          content: 'I want to start learning French but I am struggling with consistency.',
          author: 'Marie S.',
          isAnonymous: false,
          createdAt: Date.now() - 43200000,
          likes: 12,
          aiHelpfulCount: 8,
          aiAnswer: "Consistency is key. 1. Practice 15 minutes daily. 2. Immersion through movies/music. 3. Use SRS apps like Anki or Duolingo. 4. Speak aloud from day one."
        }
      ];
      setQuestions(initial);
      localStorage.setItem('smartq_questions', JSON.stringify(initial));
    }
  }, []);

  const addQuestion = (newQ: Question) => {
    const updated = [newQ, ...questions];
    setQuestions(updated);
    localStorage.setItem('smartq_questions', JSON.stringify(updated));
    
    // Update user question count if logged in
    if (currentUser && !newQ.isAnonymous) {
      const updatedUser = { ...currentUser, questionsCount: currentUser.questionsCount + 1 };
      setCurrentUser(updatedUser);
      localStorage.setItem('smartq_user', JSON.stringify(updatedUser));
    }
  };

  const handleAIHelpfulVote = (questionId: string) => {
    const updated = questions.map(q => {
      if (q.id === questionId) {
        return { ...q, aiHelpfulCount: q.aiHelpfulCount + 1 };
      }
      return q;
    });
    setQuestions(updated);
    localStorage.setItem('smartq_questions', JSON.stringify(updated));
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('smartq_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('smartq_user');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage questions={questions} />} />
            <Route path="/ask" element={<AskPage onAdd={addQuestion} user={currentUser} />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/ai" element={<AIDialog />} />
            <Route path="/question/:id" element={<QuestionDetail questions={questions} onVoteAI={handleAIHelpfulVote} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
            <Route path="/profile" element={currentUser ? <ProfilePage user={currentUser} questions={questions} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
