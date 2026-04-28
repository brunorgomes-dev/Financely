import { LogOut, UserRound } from 'lucide-react';

const UserMenu = ({ userName, onOpenProfile, onSignOut }) => {
  return (
    <div className="group relative inline-flex self-start">
      <button
        type="button"
        className="text-left text-xs font-black uppercase tracking-[0.2em] text-indigo-500"
      >
        Bem vindo de volta,{' '}
        <span className="text-slate-500 transition-colors group-hover:text-indigo-500 dark:text-slate-400">
          {userName}
        </span>
      </button>

      <div className="invisible absolute left-0 top-full z-30 mt-3 w-44 translate-y-2 rounded-2xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl shadow-slate-200/70 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <button
          type="button"
          onClick={onOpenProfile}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-black uppercase tracking-widest transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <UserRound size={15} className="text-indigo-500" />
          Perfil
        </button>
        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-black uppercase tracking-widest text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
        >
          <LogOut size={15} />
          Sair
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
