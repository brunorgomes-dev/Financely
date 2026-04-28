import { Plus, Tag, Trash2, X } from 'lucide-react';
import { MONTHS } from '../constants/finance';
import { formatAmount } from '../utils/currency';
import { isSameDate } from '../utils/date';

const ExpenseModal = ({
  categories,
  darkMode,
  expenses,
  isAddingExpense,
  newExpense,
  onAddExpense,
  onAmountChange,
  onCategorySelect,
  onClose,
  onDeleteExpense,
  onStartAddingExpense,
  selectedDate,
}) => {
  if (!selectedDate) {
    return null;
  }

  const dayExpenses = expenses.filter((expense) => isSameDate(expense.date, selectedDate));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md">
      <div
        className={`w-full max-w-lg overflow-hidden rounded-[3rem] shadow-2xl ${
          darkMode ? 'border border-slate-800 bg-slate-900' : 'border border-slate-100 bg-white'
        }`}
      >
        <div className="flex items-center justify-between p-8 pb-4">
          <div>
            <h2 className="text-2xl font-black tracking-tighter">
              {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]}
            </h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-indigo-500">
              Lançamentos do dia
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Fechar lançamentos"
          >
            <X size={20} />
          </button>
        </div>

        <div className="custom-scrollbar max-h-[70vh] overflow-y-auto p-8 pt-0">
          {isAddingExpense ? (
            <form onSubmit={onAddExpense} className="space-y-6 pt-4">
              <div className="rounded-[2rem] bg-slate-50 p-6 dark:bg-slate-800">
                <label className="mb-2 block text-[10px] font-black uppercase tracking-widest opacity-40">
                  Valor do Gasto
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-indigo-500">CVE</span>
                  <input
                    autoFocus
                    type="text"
                    inputMode="decimal"
                    placeholder="0,00"
                    value={newExpense.amount}
                    onChange={(event) => onAmountChange(event.target.value)}
                    className="w-full bg-transparent text-4xl font-black outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => onCategorySelect(category.id)}
                    className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-sm font-bold transition-all ${
                      newExpense.categoryId === category.id
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : darkMode
                          ? 'border-slate-800 bg-slate-800/50'
                          : 'border-slate-50 bg-slate-50'
                    }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full ${
                        newExpense.categoryId === category.id ? 'bg-white' : category.color
                      }`}
                    />
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-[2rem] bg-indigo-600 py-5 font-black text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  CONFIRMAR GASTO
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 pt-4">
              <button
                type="button"
                onClick={onStartAddingExpense}
                className="flex w-full items-center justify-center gap-2 rounded-[2rem] border-2 border-dashed border-indigo-500/30 py-5 text-sm font-black uppercase tracking-widest text-indigo-500 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
              >
                <Plus size={20} /> Adicionar Novo
              </button>

              <div className="space-y-3">
                {dayExpenses.map((expense) => {
                  const category = categories.find((currentCategory) => currentCategory.id === expense.categoryId);

                  return (
                    <div
                      key={expense.id}
                      className={`flex items-center justify-between rounded-[2rem] p-5 ${
                        darkMode ? 'bg-slate-800/50' : 'bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category?.color} text-white shadow-lg`}
                        >
                          <Tag size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black">{category?.name}</h4>
                          <p className="text-[10px] font-bold uppercase opacity-40">Gasto Registrado</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-black">{formatAmount(expense.amount)}</span>
                        <button
                          type="button"
                          onClick={() => onDeleteExpense(expense.id)}
                          className="rounded-full p-2 text-rose-500 transition-all hover:bg-rose-50 dark:hover:bg-rose-500/10"
                          aria-label="Excluir gasto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
