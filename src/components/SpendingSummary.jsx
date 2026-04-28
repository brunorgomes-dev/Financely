import { PieChart } from 'lucide-react';

const SpendingSummary = ({ categories, categoryTotals, darkMode, totalMonth }) => {
  const hasExpenses = Object.values(categoryTotals).some((total) => total > 0);

  return (
    <div
      className={`rounded-[2rem] p-4 xl:rounded-[2.5rem] xl:p-5 ${
        darkMode ? 'border border-slate-800 bg-slate-900' : 'bg-slate-900 text-white'
      }`}
    >
      <div className="mb-4 flex items-center gap-2 xl:mb-5">
        <PieChart size={16} className="text-indigo-400" />
        <h2 className="text-xs font-bold uppercase tracking-wider opacity-60">Resumo Visual</h2>
      </div>

      {!hasExpenses ? (
        <p className="text-[11px] italic opacity-40 xl:text-xs">Lance um gasto para ver o gráfico.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const percent = totalMonth > 0 ? (categoryTotals[category.id] || 0) / totalMonth : 0;

            if (percent === 0) {
              return null;
            }

            return (
              <div
                key={category.id}
                className={`h-2 rounded-full ${category.color} transition-all duration-700`}
                style={{ width: `calc(${percent * 100}% - 8px)`, minWidth: '12px' }}
                title={`${category.name}: ${Math.round(percent * 100)}%`}
              />
            );
          })}
        </div>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase opacity-40 xl:text-[10px]">Eficiência de Gastos</span>
        <span className="text-lg font-black text-indigo-400 xl:text-base">{totalMonth > 5000 ? 'Alta' : 'Baixa'}</span>
      </div>
    </div>
  );
};

export default SpendingSummary;
