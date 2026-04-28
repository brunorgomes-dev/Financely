import { ArrowRight, Sparkles, Wallet } from 'lucide-react';
import { sanitizeAmountInput } from '../utils/currency';

const WelcomeScreen = ({ income, onIncomeChange, onContinue }) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 md:p-6">
      <section className="w-full max-w-xl rounded-[3rem] border border-white bg-white p-8 shadow-2xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-10">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <Wallet size={22} />
          </div>
          <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-indigo-600 dark:bg-indigo-500/10">
            <Sparkles size={15} />
            <span className="text-[10px] font-black uppercase tracking-widest">Boas vindas</span>
          </div>
        </div>

        <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Primeiro passo</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Qual é sua renda mensal?</h1>
        <p className="mt-4 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">
          Vamos usar esse valor apenas para preparar a experiência visual por enquanto.
        </p>

        <label className="mt-8 block rounded-[2rem] bg-slate-50 p-6 dark:bg-slate-800/50">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-widest opacity-40">
            Renda mensal
          </span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-indigo-500">R$</span>
            <input
              autoFocus
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={income}
              onChange={(event) => onIncomeChange(sanitizeAmountInput(event.target.value))}
              className="w-full bg-transparent text-4xl font-black outline-none placeholder:opacity-20"
            />
          </div>
        </label>

        <button
          type="button"
          onClick={onContinue}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-[2rem] bg-indigo-600 py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.01] active:scale-95"
        >
          Continuar <ArrowRight size={18} />
        </button>
      </section>
    </main>
  );
};

export default WelcomeScreen;
