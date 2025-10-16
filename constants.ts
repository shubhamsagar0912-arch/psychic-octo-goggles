import React from 'react';
import { Subject } from './types';

// A medical-themed icon for all subjects
const HeartbeatIcon: React.FC<{ className?: string }> = ({ className }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" }),
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 10.5l-2.625 2.625-2.625-5.25-2.625 5.25L5.25 10.5" })
    )
);

export const SUBJECTS: Subject[] = [
  { 
    id: 'anatomy', 
    name: 'Anatomy', 
    icon: HeartbeatIcon, 
    quizzes: [
      {
        id: 'ana-q1',
        title: 'Bones of the Skull',
        timeLimit: 180, // 3 minutes
        questions: [
          {
            questionText: 'Which bone is also known as the jawbone?',
            answers: [
              { text: 'Maxilla', isCorrect: false },
              { text: 'Mandible', isCorrect: true },
              { text: 'Zygomatic bone', isCorrect: false },
              { text: 'Frontal bone', isCorrect: false },
            ],
          },
          {
            questionText: 'The sella turcica is part of which bone?',
            answers: [
              { text: 'Ethmoid bone', isCorrect: false },
              { text: 'Temporal bone', isCorrect: false },
              { text: 'Sphenoid bone', isCorrect: true },
              { text: 'Occipital bone', isCorrect: false },
            ],
          },
          {
            questionText: 'How many cranial bones are there in the human skull?',
            answers: [
              { text: '6', isCorrect: false },
              { text: '8', isCorrect: true },
              { text: '10', isCorrect: false },
              { text: '14', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'ana-q2',
        title: 'Upper Limb Muscles',
        questions: [
           {
            questionText: 'Which muscle is the primary abductor of the arm at the shoulder joint?',
            answers: [
              { text: 'Pectoralis major', isCorrect: false },
              { text: 'Latissimus dorsi', isCorrect: false },
              { text: 'Teres major', isCorrect: false },
              { text: 'Deltoid', isCorrect: true },
            ],
          },
          {
            questionText: 'The biceps brachii muscle has how many heads?',
            answers: [
              { text: 'One', isCorrect: false },
              { text: 'Two', isCorrect: true },
              { text: 'Three', isCorrect: false },
              { text: 'Four', isCorrect: false },
            ],
          },
        ],
      }
    ] 
  },
  { 
    id: 'physiology', 
    name: 'Physiology', 
    icon: HeartbeatIcon, 
    quizzes: [
       {
        id: 'phy-q1',
        title: 'Cardiac Cycle',
        timeLimit: 300, // 5 minutes
        questions: [
          {
            questionText: 'What is the "pacemaker" of the heart?',
            answers: [
              { text: 'AV node', isCorrect: false },
              { text: 'SA node', isCorrect: true },
              { text: 'Bundle of His', isCorrect: false },
              { text: 'Purkinje fibers', isCorrect: false },
            ],
          },
          {
            questionText: 'Systole refers to the phase of...',
            answers: [
              { text: 'Relaxation', isCorrect: false },
              { text: 'Contraction', isCorrect: true },
              { text: 'Filling', isCorrect: false },
              { text: 'Resting', isCorrect: false },
            ],
          },
        ],
      }
    ] 
  },
  { id: 'biochemistry', name: 'Biochemistry', icon: HeartbeatIcon, quizzes: [] },
  { id: 'pharmacology', name: 'Pharmacology', icon: HeartbeatIcon, quizzes: [] },
  { id: 'pathology', name: 'Pathology', icon: HeartbeatIcon, quizzes: [] },
  { id: 'microbiology', name: 'Microbiology', icon: HeartbeatIcon, quizzes: [] },
  { id: 'forensic_medicine', name: 'Forensic Medicine', icon: HeartbeatIcon, quizzes: [] },
  { id: 'community_medicine', name: 'Community Medicine', icon: HeartbeatIcon, quizzes: [] },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: HeartbeatIcon, quizzes: [] },
  { id: 'ent', name: 'ENT', icon: HeartbeatIcon, quizzes: [] },
  { id: 'general_medicine', name: 'General Medicine', icon: HeartbeatIcon, quizzes: [] },
  { id: 'general_surgery', name: 'General Surgery', icon: HeartbeatIcon, quizzes: [] },
  { id: 'obs_gynae', name: 'Obs & Gynae', icon: HeartbeatIcon, quizzes: [] },
  { id: 'paediatrics', name: 'Paediatrics', icon: HeartbeatIcon, quizzes: [] },
  { id: 'orthopaedics', name: 'Orthopaedics', icon: HeartbeatIcon, quizzes: [] },
  { id: 'psychiatry', name: 'Psychiatry', icon: HeartbeatIcon, quizzes: [] },
  { id: 'dermatology', name: 'Dermatology', icon: HeartbeatIcon, quizzes: [] },
  { id: 'radiology', name: 'Radiology', icon: HeartbeatIcon, quizzes: [] },
  { id: 'anesthesiology', name: 'Anesthesiology', icon: HeartbeatIcon, quizzes: [] },
];