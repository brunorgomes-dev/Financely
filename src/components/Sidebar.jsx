import AppHeader from './AppHeader';
import CategoryList from './CategoryList';
import SpendingSummary from './SpendingSummary';
import TotalCard from './TotalCard';

const Sidebar = ({
  categories,
  categoryTotals,
  darkMode,
  newCategoryName,
  onAddCategory,
  onCategoryNameChange,
  onToggleDarkMode,
  totalMonth,
}) => {
  return (
    <aside className="flex w-full flex-col gap-8 lg:h-full lg:min-h-0 lg:w-80 lg:gap-4 xl:w-72 xl:gap-3">
      <AppHeader darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <TotalCard totalMonth={totalMonth} />
      <CategoryList
        categories={categories}
        categoryTotals={categoryTotals}
        darkMode={darkMode}
        newCategoryName={newCategoryName}
        onAddCategory={onAddCategory}
        onCategoryNameChange={onCategoryNameChange}
      />
      <SpendingSummary
        categories={categories}
        categoryTotals={categoryTotals}
        darkMode={darkMode}
        totalMonth={totalMonth}
      />
    </aside>
  );
};

export default Sidebar;
