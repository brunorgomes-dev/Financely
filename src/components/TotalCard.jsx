import { TrendingUp } from 'lucide-react';
import { formatAmount } from '../utils/currency';

const TotalCard = ({ totalMonth }) => {
  return (
    <div className="relative flex items-center min-h-[8rem] shrink-0 overflow-hidden rounded-[2rem] bg-indigo-600 p-5 text-white shadow-2xl xl:min-h-[7rem] xl:rounded-[2.5rem] xl:p-6">
      <div className="relative z-10">
        <div className="mb-1 flex items-center gap-2 opacity-80">
          <TrendingUp size={15} />
          <span className="text-[10px] font-bold uppercase tracking-widest xl:text-[11px]">
            Lançamentos do Mês
          </span>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[1.7rem] font-black leading-tight xl:text-[2rem]">
          {formatAmount(totalMonth)}
          <span className="text-sm font-medium opacity-70 xl:text-base">CVE</span>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
    </div>
  );
};

export default TotalCard;
