export default function CategoryPieChartSkeleton() {
    return (
        <div className="bg-white rounded-xl p-[25px] text-left w-full card-container">
            {/* Skeleton do Título */}
            <div className="h-4 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
            
            <div className="flex card-body">
                {/* Skeleton do Gráfico (Círculo) */}
                <div className="w-full h-[280px] flex items-center justify-center">
                    <div className="w-[220px] h-[220px] rounded-full bg-gray-200 animate-pulse"></div>
                </div>

                {/* Skeleton da Legenda (Lista) */}
                <div className="flex flex-col text-center mt-4 gap-4 justify-center min-w-[120px]">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center w-full">
                            <div className="w-3 h-3 rounded-full bg-gray-200 mr-2 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-8 ml-auto animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
