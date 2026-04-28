import { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import CalendarView from './components/CalendarView';
import ExpenseModal from './components/ExpenseModal';
import ProfileScreen from './components/ProfileScreen';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import { useFinance } from './hooks/useFinance';

const App = () => {
  const finance = useFinance();
  const [screen, setScreen] = useState('login');
  const [authMode, setAuthMode] = useState('login');
  const [profile, setProfile] = useState({
    name: 'Bruno',
    monthlyIncome: '',
    currency: 'BRL',
  });

  const isDashboard = screen === 'dashboard';

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    setScreen('welcome');
  };

  const handleGoogleAuth = () => {
    setScreen('welcome');
  };

  const handleProfileChange = (partialProfile) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      ...partialProfile,
    }));
  };

  const handleSignOut = () => {
    setAuthMode('login');
    setScreen('login');
  };

  return (
    <div
      className={`min-h-screen w-full p-4 font-sans transition-colors duration-500 md:p-6 ${
        isDashboard ? 'lg:h-screen lg:overflow-hidden lg:p-4 xl:p-6' : ''
      } ${finance.darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}
    >
      {screen === 'login' && (
        <AuthScreen
          darkMode={finance.darkMode}
          mode={authMode}
          onGoogleAuth={handleGoogleAuth}
          onSubmit={handleAuthSubmit}
          onSwitchMode={() => setAuthMode((currentMode) => (currentMode === 'login' ? 'register' : 'login'))}
        />
      )}

      {screen === 'welcome' && (
        <WelcomeScreen
          income={profile.monthlyIncome}
          onContinue={() => setScreen('dashboard')}
          onIncomeChange={(monthlyIncome) => handleProfileChange({ monthlyIncome })}
        />
      )}

      {screen === 'profile' && (
        <ProfileScreen
          darkMode={finance.darkMode}
          profile={profile}
          onBack={() => setScreen('dashboard')}
          onProfileChange={handleProfileChange}
        />
      )}

      {isDashboard && (
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:h-full lg:min-h-0 lg:flex-row lg:gap-5 xl:gap-7">
          <Sidebar
            categories={finance.categories}
            categoryTotals={finance.categoryTotals}
            darkMode={finance.darkMode}
            newCategoryName={finance.newCategoryName}
            onAddCategory={finance.handleAddCategory}
            onCategoryNameChange={finance.setNewCategoryName}
            onToggleDarkMode={() => finance.setDarkMode((currentValue) => !currentValue)}
            totalMonth={finance.totalMonth}
          />

          <CalendarView
            calendarDays={finance.calendarDays}
            currentDate={finance.currentDate}
            darkMode={finance.darkMode}
            onDateChange={finance.setCurrentDate}
            onOpenProfile={() => setScreen('profile')}
            onSelectDate={finance.handleSelectDate}
            onSignOut={handleSignOut}
            selectedDate={finance.selectedDate}
            userName={profile.name || 'Bruno'}
          />

          <ExpenseModal
            categories={finance.categories}
            darkMode={finance.darkMode}
            expenses={finance.expenses}
            isAddingExpense={finance.isAddingExpense}
            newExpense={finance.newExpense}
            onAddExpense={finance.handleAddExpense}
            onAmountChange={finance.handleAmountChange}
            onCategorySelect={finance.handleCategorySelect}
            onClose={finance.handleCloseModal}
            onDeleteExpense={finance.handleDeleteExpense}
            onStartAddingExpense={() => finance.setIsAddingExpense(true)}
            selectedDate={finance.selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default App;
