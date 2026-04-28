import { ArrowRight, Lock, Mail, User, Wallet } from 'lucide-react';

const AuthScreen = ({ darkMode, mode, onGoogleAuth, onSubmit, onSwitchMode }) => {
  const isRegistering = mode === 'register';

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 md:p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-slate-200/70 dark:bg-slate-900 dark:shadow-black/20 lg:grid-cols-[1fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-indigo-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="relative z-10">
            <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Wallet size={24} />
            </div>
            <h1 className="max-w-sm text-4xl font-black tracking-tight">Financely</h1>
            <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-indigo-100">
              Organize seus lançamentos, acompanhe seu mês e mantenha o controle sem complicação.
            </p>
          </div>
          <div className="relative z-10 rounded-[2rem] bg-white/10 p-6 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-100">Seu mês em foco</p>
            <p className="mt-3 text-2xl font-black">Calendário financeiro simples e direto.</p>
          </div>
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        </section>

        <section className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
              <Wallet size={20} />
            </div>
            <span className="text-xl font-black">Financely</span>
          </div>

          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">
              {isRegistering ? 'Criar conta' : 'Acessar conta'}
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              {isRegistering ? 'Comece sua organização' : 'Bem vindo de volta'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onGoogleAuth}
            className={`mb-5 flex w-full items-center justify-center gap-3 rounded-[1.5rem] border px-5 py-4 text-sm font-black transition-all hover:scale-[1.01] active:scale-95 ${
              darkMode
                ? 'border-slate-800 bg-slate-950 hover:bg-slate-800'
                : 'border-slate-100 bg-slate-50 hover:bg-white'
            }`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-black text-slate-900">
              G
            </span>
            Continuar com Google
          </button>

          <div className="mb-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">ou</span>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {isRegistering && (
              <label className="flex items-center gap-3 rounded-[1.5rem] bg-slate-50 px-5 py-4 dark:bg-slate-800/50">
                <User size={18} className="text-indigo-500" />
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full bg-transparent text-sm font-semibold outline-none placeholder:font-medium placeholder:opacity-40"
                />
              </label>
            )}
            <label className="flex items-center gap-3 rounded-[1.5rem] bg-slate-50 px-5 py-4 dark:bg-slate-800/50">
              <Mail size={18} className="text-indigo-500" />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:font-medium placeholder:opacity-40"
              />
            </label>
            <label className="flex items-center gap-3 rounded-[1.5rem] bg-slate-50 px-5 py-4 dark:bg-slate-800/50">
              <Lock size={18} className="text-indigo-500" />
              <input
                type="password"
                placeholder="Senha"
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:font-medium placeholder:opacity-40"
              />
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-[1.75rem] bg-indigo-600 py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.01] active:scale-95"
            >
              {isRegistering ? 'Cadastrar' : 'Entrar'} <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-7 text-center text-sm font-semibold opacity-60">
            {isRegistering ? 'Já tem uma conta?' : 'Ainda não tem conta?'}{' '}
            <button type="button" onClick={onSwitchMode} className="font-black text-indigo-500">
              {isRegistering ? 'Entrar' : 'Cadastrar'}
            </button>
          </p>
        </section>
      </div>
    </main>
  );
};

export default AuthScreen;
