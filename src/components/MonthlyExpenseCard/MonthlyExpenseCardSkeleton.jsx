export default function MonthlyExpenseCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-[25px] text-left w-full card-container expense-card-container mt-0 animate-pulse">
      {/* Skeleton para o Título */}
      <div className="h-4 bg-gray-200 rounded w-28 mb-3"></div>
      
      {/* Skeleton para o Valor e a Badge */}
      <div className="expense-row">
        <div className="h-7 bg-gray-200 rounded w-24"></div>
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </div>
    </div>
  );
}
