import CalendarView from './components/CalendarView';
import ExpenseModal from './components/ExpenseModal';
import Sidebar from './components/Sidebar';
import { useFinance } from './hooks/useFinance';

const App = () => {
  const finance = useFinance();

  return (
    <div
      className={`min-h-screen w-full p-4 font-sans transition-colors duration-500 md:p-6 lg:h-screen lg:overflow-hidden lg:p-4 xl:p-6 ${
        finance.darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
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
          onSelectDate={finance.handleSelectDate}
          selectedDate={finance.selectedDate}
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
    </div>
  );
};

export default App;
