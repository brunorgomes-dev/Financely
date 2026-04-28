import { Moon, Sun, Wallet } from 'lucide-react';

const AppHeader = ({ darkMode, onToggleDarkMode }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
          <Wallet size={20} />
        </div>
        <h1 className="text-xl font-black tracking-tight">Financely</h1>
      </div>
      <button
        type="button"
        onClick={onToggleDarkMode}
        className={`rounded-xl p-2 transition-all ${
          darkMode ? 'bg-slate-900 text-indigo-400' : 'bg-white text-slate-400 shadow-sm'
        }`}
        aria-label="Alternar tema"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default AppHeader;
