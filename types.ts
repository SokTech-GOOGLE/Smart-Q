
export interface Question {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  createdAt: number;
  aiAnswer?: string;
  aiHelpfulCount: number;
  likes: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  questionsCount: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum Category {
  EDUCATION = 'Education',
  TECHNOLOGY = 'Technology',
  RELATIONSHIPS = 'Relationships',
  BUSINESS = 'Business',
  FAITH = 'Faith',
  GENERAL = 'General Knowledge'
}
