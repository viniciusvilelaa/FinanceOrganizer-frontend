export default function RecentTransactionsSkeleton() {
  return (
    <div className="bg-white rounded-xl p-[25px] w-full card-container animate-pulse">
      {/* Header Skeleton */}
      <div className="recent-header">
        <div className="h-4 bg-gray-200 rounded w-28"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>

      {/* List Skeleton */}
      <div className="recent-list">
        {[1, 2, 3].map((i) => (
          <div key={i} className="recent-item">
            {/* Circle for icon */}
            <div className="w-[38px] h-[38px] rounded-full bg-gray-200 flex-shrink-0"></div>
            
            {/* Info containing name and date */}
            <div className="recent-info">
              <div className="h-3.5 bg-gray-200 rounded w-32 mb-1.5"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            
            {/* Amount */}
            <div className="h-3.5 bg-gray-200 rounded w-12 flex-shrink-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
