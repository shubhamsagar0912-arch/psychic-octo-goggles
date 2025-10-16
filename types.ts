import React from 'react';

export enum Screen {
  HOME = 'HOME',
  LIBRARY = 'LIBRARY',
  SETTINGS = 'SETTINGS',
  HISTORY = 'HISTORY',
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  answers: Answer[];
}

export interface Quiz {
  id: string;
  title: string;
  timeLimit?: number; // Time limit in seconds
  questions: Question[];
}

export interface Subject {
  id:string;
  name: string;
  icon: React.FC<{ className?: string }>;
  quizzes: Quiz[];
}

export interface SavedQuizState {
  quizId: string;
  currentQuestionIndex: number;
  score: number;
  timeLeft: number;
}

export interface QuizAttempt {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: number; // Timestamp
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  year: string;
  college: string;
  country: string;
}