import { ArrowLeft, Save, UserRound } from 'lucide-react';
import { CURRENCY_OPTIONS } from '../constants/profile';
import { sanitizeAmountInput } from '../utils/currency';

const ProfileScreen = ({ darkMode, profile, onBack, onProfileChange }) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 md:p-6">
      <section
        className={`w-full max-w-2xl rounded-[3rem] p-8 shadow-2xl sm:p-10 ${
          darkMode
            ? 'border border-slate-800 bg-slate-900 shadow-black/20'
            : 'border border-white bg-white shadow-slate-200/70'
        }`}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-2xl p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Voltar para dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <UserRound size={22} />
          </div>
        </div>

        <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Perfil</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Preferências da conta</h1>

        <div className="mt-8 grid gap-5">
          <label className="rounded-[2rem] bg-slate-50 p-6 dark:bg-slate-800/50">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest opacity-40">
              Nome
            </span>
            <input
              type="text"
              value={profile.name}
              onChange={(event) => onProfileChange({ name: event.target.value })}
              className="w-full bg-transparent text-2xl font-black outline-none"
            />
          </label>

          <label className="rounded-[2rem] bg-slate-50 p-6 dark:bg-slate-800/50">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest opacity-40">
              Valor mensal
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={profile.monthlyIncome}
              placeholder="0,00"
              onChange={(event) => onProfileChange({ monthlyIncome: sanitizeAmountInput(event.target.value) })}
              className="w-full bg-transparent text-3xl font-black outline-none placeholder:opacity-20"
            />
          </label>

          <label className="rounded-[2rem] bg-slate-50 p-6 dark:bg-slate-800/50">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest opacity-40">
              Tipo de dinheiro
            </span>
            <select
              value={profile.currency}
              onChange={(event) => onProfileChange({ currency: event.target.value })}
              className="w-full bg-transparent text-xl font-black outline-none"
            >
              {CURRENCY_OPTIONS.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-[2rem] bg-indigo-600 py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.01] active:scale-95"
        >
          <Save size={18} /> Concluir
        </button>
      </section>
    </main>
  );
};

export default ProfileScreen;
