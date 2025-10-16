import React, { useState, useEffect } from 'react';
import { Screen, Quiz, SavedQuizState, QuizAttempt, UserProfile } from './types';
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import SettingsScreen from './screens/SettingsScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';
import HistoryScreen from './screens/HistoryScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import PinScreen from './screens/PinScreen';
import BottomNavBar from './components/BottomNavBar';
import { SUBJECTS } from './constants';

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
  year: '',
  college: '',
  country: '',
};

type AuthState = 'LOGGED_OUT' | 'LOCKED' | 'LOGGED_IN';
type AuthScreen = 'login' | 'signup';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('LOGGED_OUT');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [authUserEmail, setAuthUserEmail] = useState('');
  
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.HOME);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizResults, setQuizResults] = useState<{ score: number; total: number; quizId: string } | null>(null);
  const [savedQuizState, setSavedQuizState] = useState<SavedQuizState | null>(null);
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        setAuthUserEmail(userToken);
        setAuthState('LOCKED');
    } else {
        setAuthState('LOGGED_OUT');
    }

    const savedProgressJSON = localStorage.getItem('savedQuizProgress');
    if (savedProgressJSON) {
      try {
        const savedProgress = JSON.parse(savedProgressJSON) as SavedQuizState;
        setSavedQuizState(savedProgress);
      } catch (error) {
        console.error("Failed to parse saved quiz progress:", error);
        localStorage.removeItem('savedQuizProgress');
      }
    }
    
    const savedHistoryJSON = localStorage.getItem('quizHistory');
    if (savedHistoryJSON) {
      try {
        const savedHistory = JSON.parse(savedHistoryJSON) as QuizAttempt[];
        setQuizHistory(savedHistory);
      } catch (error) {
        console.error("Failed to parse quiz history:", error);
        localStorage.removeItem('quizHistory');
      }
    }

    const savedProfileJSON = localStorage.getItem('userProfile');
    if (savedProfileJSON) {
        try {
            const savedProfile = JSON.parse(savedProfileJSON) as UserProfile;
            setUserProfile(savedProfile);
        } catch (error) {
            console.error("Failed to parse user profile:", error);
            localStorage.removeItem('userProfile');
        }
    }
  }, []);

  const clearSavedProgress = () => {
    localStorage.removeItem('savedQuizProgress');
    setSavedQuizState(null);
  };

  const handleQuizSelect = (quiz: Quiz) => {
    clearSavedProgress();
    setActiveQuiz(quiz);
    setQuizResults(null);
  };
  
  const addAttemptToHistory = (attempt: QuizAttempt) => {
    const newHistory = [attempt, ...quizHistory];
    setQuizHistory(newHistory);
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));
  };
  
  const clearQuizHistory = () => {
    setQuizHistory([]);
    localStorage.removeItem('quizHistory');
  };
  
  const handleUpdateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  const handleQuizComplete = (score: number) => {
    if (activeQuiz) {
      const attempt: QuizAttempt = {
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        score,
        totalQuestions: activeQuiz.questions.length,
        date: Date.now(),
      };
      addAttemptToHistory(attempt);
      setQuizResults({ score, total: activeQuiz.questions.length, quizId: activeQuiz.id });
    }
    setActiveQuiz(null);
    clearSavedProgress();
  };

  const handleRestartQuiz = () => {
      const quizId = quizResults?.quizId;
      if (quizId) {
          const quizToRestart = SUBJECTS.flatMap(s => s.quizzes).find(q => q.id === quizId);
          if(quizToRestart) {
              clearSavedProgress();
              setActiveQuiz(quizToRestart);
              setQuizResults(null);
          }
      }
  };

  const handleGoToLibrary = () => {
      setActiveQuiz(null);
      setQuizResults(null);
      setActiveScreen(Screen.LIBRARY);
  }

  const handleLogin = () => {
    const fakeEmail = 'user@example.com'; // Simulate login
    localStorage.setItem('userToken', fakeEmail);
    setAuthUserEmail(fakeEmail);
    setAuthState('LOGGED_IN');
    setAuthScreen('login');
  };

  const handleSignUp = () => {
    const fakeEmail = 'newuser@example.com'; // Simulate signup
    localStorage.setItem('userToken', fakeEmail);
    setAuthUserEmail(fakeEmail);
    setAuthState('LOGGED_IN');
    setAuthScreen('login');
  };

  const handlePinSuccess = () => {
    setAuthState('LOGGED_IN');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setAuthState('LOGGED_OUT');
    setAuthUserEmail('');
  };

  const renderContent = () => {
    if (quizResults) {
      return (
        <ResultsScreen
          score={quizResults.score}
          totalQuestions={quizResults.total}
          onRestart={handleRestartQuiz}
          onGoToSubjects={handleGoToLibrary}
        />
      );
    }
    if (activeQuiz) {
      return <QuizScreen quiz={activeQuiz} onComplete={handleQuizComplete} savedState={savedQuizState} />;
    }
    switch (activeScreen) {
      case Screen.HOME:
        return <HomeScreen 
                    setActiveScreen={setActiveScreen} 
                    history={quizHistory}
                    onQuizSelect={handleQuizSelect}
                />;
      case Screen.LIBRARY:
        return <LibraryScreen onQuizSelect={handleQuizSelect} />;
      case Screen.SETTINGS:
        return <SettingsScreen 
                    history={quizHistory} 
                    onClearHistory={clearQuizHistory} 
                    onViewHistory={() => setActiveScreen(Screen.HISTORY)}
                    profile={userProfile}
                    onUpdateProfile={handleUpdateProfile}
                />;
      case Screen.HISTORY:
        return <HistoryScreen 
                    history={quizHistory} 
                    onBack={() => setActiveScreen(Screen.SETTINGS)}
                />;
      default:
        return <HomeScreen 
                    setActiveScreen={setActiveScreen} 
                    history={quizHistory}
                    onQuizSelect={handleQuizSelect}
                />;
    }
  };
  
  const showNavBar = !activeQuiz && !quizResults && activeScreen !== Screen.HISTORY;

  const renderAuthFlow = () => {
    if (authScreen === 'login') {
      return <LoginScreen onLogin={handleLogin} onGoToSignUp={() => setAuthScreen('signup')} />;
    }
    return <SignUpScreen onSignUp={handleSignUp} onGoToLogin={() => setAuthScreen('login')} />;
  };

  const renderMainApp = () => (
    <>
      <main className="flex-grow overflow-y-auto pb-16">
        {renderContent()}
      </main>
      {showNavBar && <BottomNavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />}
    </>
  );

  const renderBasedOnAuthState = () => {
    switch (authState) {
      case 'LOGGED_IN':
        return renderMainApp();
      case 'LOCKED':
        return <PinScreen onPinSuccess={handlePinSuccess} onLogout={handleLogout} userEmail={authUserEmail} />;
      case 'LOGGED_OUT':
      default:
        return renderAuthFlow();
    }
  };

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-white dark:bg-black flex flex-col shadow-2xl overflow-hidden">
      {renderBasedOnAuthState()}
    </div>
  );
};

export default App;