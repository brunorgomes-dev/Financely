import { useMemo, useState } from 'react';
import { CATEGORY_COLORS, INITIAL_CATEGORIES } from '../constants/finance';
import { getDateKey, getDaysInMonth, getFirstDayOfMonth } from '../utils/date';
import { createId } from '../utils/id';
import { parseAmount, sanitizeAmountInput } from '../utils/currency';

export const useFinance = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({ amount: '', categoryId: '' });

  const monthExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      return (
        expense.date.getMonth() === currentDate.getMonth() &&
        expense.date.getFullYear() === currentDate.getFullYear()
      );
    });
  }, [expenses, currentDate]);

  const totalMonth = useMemo(() => {
    return monthExpenses.reduce((total, expense) => total + expense.amount, 0);
  }, [monthExpenses]);

  const categoryTotals = useMemo(() => {
    return monthExpenses.reduce((totals, expense) => {
      totals[expense.categoryId] = (totals[expense.categoryId] || 0) + expense.amount;
      return totals;
    }, {});
  }, [monthExpenses]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const dayTotals = expenses.reduce((totals, expense) => {
      const key = getDateKey(expense.date);
      totals[key] = (totals[key] || 0) + expense.amount;
      return totals;
    }, {});
    const days = [];

    for (let index = 0; index < firstDay; index += 1) {
      days.push({ day: null, key: `empty-${index}` });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      const key = getDateKey(date);

      days.push({
        day,
        date,
        key: `day-${day}`,
        total: dayTotals[key] || 0,
      });
    }

    return days;
  }, [currentDate, expenses]);

  const handleAddCategory = () => {
    const name = newCategoryName.trim();

    if (!name) {
      return;
    }

    setCategories((currentCategories) => [
      ...currentCategories,
      {
        id: createId(),
        name,
        color: CATEGORY_COLORS[currentCategories.length % CATEGORY_COLORS.length],
      },
    ]);
    setNewCategoryName('');
  };

  const handleAmountChange = (value) => {
    setNewExpense((currentExpense) => ({
      ...currentExpense,
      amount: sanitizeAmountInput(value),
    }));
  };

  const handleCategorySelect = (categoryId) => {
    setNewExpense((currentExpense) => ({
      ...currentExpense,
      categoryId,
    }));
  };

  const handleAddExpense = (event) => {
    event.preventDefault();

    const amount = parseAmount(newExpense.amount);

    if (!selectedDate || amount <= 0 || !newExpense.categoryId) {
      return;
    }

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        id: createId(),
        date: new Date(selectedDate),
        amount,
        categoryId: newExpense.categoryId,
      },
    ]);
    setNewExpense({ amount: '', categoryId: '' });
    setIsAddingExpense(false);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== expenseId));
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setIsAddingExpense(false);
    setNewExpense({ amount: '', categoryId: '' });
  };

  return {
    calendarDays,
    categories,
    categoryTotals,
    currentDate,
    darkMode,
    expenses,
    isAddingExpense,
    newCategoryName,
    newExpense,
    selectedDate,
    setCurrentDate,
    setDarkMode,
    setIsAddingExpense,
    setNewCategoryName,
    totalMonth,
    handleAddCategory,
    handleAddExpense,
    handleAmountChange,
    handleCategorySelect,
    handleCloseModal,
    handleDeleteExpense,
    handleSelectDate,
  };
};
