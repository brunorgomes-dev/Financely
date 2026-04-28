import { useEffect, useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { formatAmount } from '../utils/currency';

const ConfirmDeleteModal = ({ category, darkMode, expense, onCancel, onConfirm }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  const closeWithAnimation = (callback) => {
    setIsVisible(false);
    window.setTimeout(callback, 180);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`w-full max-w-sm rounded-[2.5rem] p-7 shadow-2xl transition-all duration-200 ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-95 opacity-0'
        } ${darkMode ? 'border border-slate-800 bg-slate-900' : 'border border-slate-100 bg-white'}`}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-500/20">
              <Trash2 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Excluir lançamento?</h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-rose-500">
                Esta ação remove o gasto
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => closeWithAnimation(onCancel)}
            className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Cancelar exclusão"
          >
            <X size={18} />
          </button>
        </div>

        <div className={`mb-6 rounded-[2rem] p-5 ${darkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black">{category?.name || 'Sem categoria'}</p>
              <p className="mt-1 text-[10px] font-bold uppercase opacity-40">Gasto registrado</p>
            </div>
            <span className="text-lg font-black text-rose-500">{formatAmount(expense.amount)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => closeWithAnimation(onCancel)}
            className={`flex-1 rounded-[1.5rem] py-4 text-sm font-black transition-all active:scale-95 ${
              darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'
            }`}
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={() => closeWithAnimation(onConfirm)}
            className="flex-1 rounded-[1.5rem] bg-rose-500 py-4 text-sm font-black text-white shadow-xl shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
