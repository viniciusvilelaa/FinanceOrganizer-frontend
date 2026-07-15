export default function BalanceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-[25px] text-left w-full card-container animate-pulse">
      {/* Skeleton para o Título */}
      <div className="h-4 bg-gray-200 rounded w-28 mb-3"></div>
      
      {/* Skeleton para o Valor */}
      <div className="h-9 bg-gray-200 rounded w-44"></div>
    </div>
  );
}
