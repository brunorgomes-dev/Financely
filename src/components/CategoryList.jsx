import { Plus, Tag } from 'lucide-react';
import { formatAmount } from '../utils/currency';

const CategoryList = ({
  categories,
  categoryTotals,
  darkMode,
  newCategoryName,
  onAddCategory,
  onCategoryNameChange,
}) => {
  return (
    <div
      className={`rounded-[2rem] p-5 xl:rounded-[2.5rem] xl:p-6 ${
        darkMode ? 'bg-slate-900' : 'bg-white shadow-xl shadow-slate-200/50'
      }`}
    >
      <div className="mb-4 flex items-center justify-between xl:mb-5">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-indigo-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider opacity-60">Categorias</h2>
        </div>
      </div>

      <div className="max-h-[96px] space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent">
        {categories.map((category) => (
          <div key={category.id} className="group flex h-6 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-6 w-2 rounded-full ${category.color} opacity-80`} />
              <span className="cursor-default text-[13px] font-semibold transition-transform group-hover:translate-x-1 xl:text-sm">
                {category.name}
              </span>
            </div>
            <span
              className={`text-[13px] font-bold xl:text-sm ${
                categoryTotals[category.id] > 0 ? 'text-indigo-500' : 'opacity-30'
              }`}
            >
              {formatAmount(categoryTotals[category.id] || 0)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800 xl:mt-6 xl:pt-5">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nova categoria..."
            value={newCategoryName}
            onChange={(event) => onCategoryNameChange(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && onAddCategory()}
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:opacity-50 xl:text-sm"
          />
          <button
            type="button"
            onClick={onAddCategory}
            className="rounded-lg p-2 text-indigo-600 transition-colors hover:bg-indigo-50 dark:hover:bg-slate-800"
            aria-label="Adicionar categoria"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
