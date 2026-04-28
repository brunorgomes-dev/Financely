import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import UserMenu from './UserMenu';
import { DAYS_OF_WEEK, MONTHS } from '../constants/finance';
import { isSameDate } from '../utils/date';
import { formatAmount } from '../utils/currency';

const CalendarView = ({
  calendarDays,
  currentDate,
  darkMode,
  onDateChange,
  onOpenProfile,
  onSelectDate,
  onSignOut,
  selectedDate,
  userName,
}) => {
  const [monthAnimationKey, setMonthAnimationKey] = useState(0);

  const changeMonth = (date) => {
    setMonthAnimationKey((currentKey) => currentKey + 1);
    onDateChange(date);
  };

  const goToPreviousMonth = () => {
    changeMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    changeMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <main className="flex flex-1 flex-col gap-8 lg:min-h-0 lg:gap-4 xl:gap-5">
      <header className="flex shrink-0 items-center justify-between gap-4">
        <div className="flex flex-col">
          <UserMenu userName={userName} onOpenProfile={onOpenProfile} onSignOut={onSignOut} />
          <h2
            key={`month-title-${monthAnimationKey}`}
            className="animate-month-change text-3xl font-black tracking-tighter xl:text-4xl"
          >
            {MONTHS[currentDate.getMonth()]}{' '}
            <span className="font-light text-slate-300 dark:text-slate-700">{currentDate.getFullYear()}</span>
          </h2>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label="Mês anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => changeMonth(new Date())}
            className="px-4 py-1 text-xs font-black uppercase tracking-widest transition-colors hover:text-indigo-600"
          >
            Hoje
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            className="rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label="Próximo mês"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div
        className={`flex min-h-0 flex-1 flex-col rounded-[2.25rem] p-5 transition-all lg:p-5 xl:rounded-[3rem] xl:p-6 ${
          darkMode
            ? 'border border-slate-800 bg-slate-900/50'
            : 'border border-white bg-white shadow-2xl shadow-slate-200/60'
        }`}
      >
        <div className="mb-3 grid shrink-0 grid-cols-7 xl:mb-4">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-600"
            >
              {day}
            </div>
          ))}
        </div>

        <div
          key={`month-grid-${monthAnimationKey}`}
          className="animate-month-change grid grid-cols-7 gap-2 lg:min-h-0 lg:flex-1 lg:auto-rows-fr xl:gap-3"
        >
          {calendarDays.map((item) => {
            if (!item.day) {
              return <div key={item.key} className="aspect-square lg:aspect-auto lg:min-h-0" />;
            }

            const isSelected = isSameDate(selectedDate, item.date);
            const isToday = isSameDate(new Date(), item.date);

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelectDate(item.date)}
                className={`group relative flex aspect-square flex-col overflow-hidden rounded-2xl p-2 text-left transition-all lg:aspect-auto lg:min-h-0 xl:rounded-[1.75rem] xl:p-3 ${
                  isSelected
                    ? 'z-10 scale-105 bg-indigo-600 text-white shadow-xl shadow-indigo-500/40'
                    : darkMode
                      ? 'text-slate-400 hover:bg-slate-800'
                      : 'bg-slate-50/50 text-slate-400 hover:bg-white hover:shadow-md'
                }`}
              >
                <span
                  className={`ml-1 text-sm font-black lg:text-base ${
                    isSelected
                      ? 'text-white'
                      : isToday
                        ? 'text-indigo-600'
                        : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item.day}
                </span>

                <div className="mt-auto">
                  {item.total > 0 && (
                    <div
                      className={`truncate text-[10px] font-black lg:text-xs ${
                        isSelected ? 'text-indigo-100' : 'text-red-600'
                      }`}
                    >
                      {formatAmount(item.total)}
                    </div>
                  )}
                </div>

                {isToday && !isSelected && (
                  <div className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-indigo-600 xl:right-5 xl:top-4" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CalendarView;
