import GoalFilters from "../../components/Goals/GoalFilters";
import GoalHistoryCard from "../../components/Goals/GoalHistoryCard";
import GoalHistoryCardSkeleton from "../../components/Goals/GoalHistoryCardSkeleton";
import Pagination from "../../components/Pagination/Pagination";
import { useHistoryGoals } from "../../hooks/useHistoryGoals";
import { useState } from "react";

export default function GoalHistory() {

    const [filters, setFilters] = useState({
        name: '',
        month: '',
        year: '',
        page: 1
    });

    function handleFilterChange(key, value) {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
       
    }

    function handlePageChange(newPage) {
        setFilters(prev => ({ ...prev, page: newPage }));
    }

    const { goalsHistory, meta, isFetching, error, isLoading } = useHistoryGoals(filters);

    const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1

    return (
        <>
            {/* MEIO (Ocupa 9 colunas relativas ao container de 9 colunas) */}
            <main className="col-span-9 mt-10 ml-2 p-6 bg-white">
                <div className='new-transaction-header mb-6 pl-3'>
                    <h1 className='text-4xl font-semibold text-slate-800 mb-1'>Goal History</h1>
                    <p className='text-slate-500 text-sm'>A list of your goals history.</p>
                </div>
                <GoalFilters filters={filters} onFilterChange={handleFilterChange}></GoalFilters>
                <div className={`mt-6 w-full ${isFetching ? "pointer-events-none" : ""}`}>

                    {(isLoading || isFetching) && (
                        <div className="flex flex-col gap-3 min-h-[440px]">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <GoalHistoryCardSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {!error && !isLoading && !isFetching && goalsHistory.length === 0 && (
                        <div className="flex justify-center items-center py-10">
                            <p className="text-gray-500">No goals found for the selected filters</p>
                        </div>
                    )}

                    {!error && !isFetching && !isLoading && goalsHistory.length > 0 && (
                        <div className="flex flex-col gap-3 min-h-[440px]">
                            {goalsHistory.map((goal, index) => (
                                <GoalHistoryCard 
                                    key={goal.id || `${goal.name}-${index}`} 
                                    name={goal.name} 
                                    targetAmount={goal.targetAmount} 
                                    currentAmount={goal.currentAmount} 
                                    status={goal.status} 
                                    month={goal.month} 
                                    year={goal.year}
                                />
                            ))}
                        </div>
                    )}

                    <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={handlePageChange}></Pagination>

                </div>


            </main>


        </>
    );
}
