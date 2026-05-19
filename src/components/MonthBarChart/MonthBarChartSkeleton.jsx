export default function MonthBarChartSkeleton() {
    // Alturas fixas para simular o gráfico (evita pulos na tela e garante um skeleton bonito)
    const heights = [
        { income: 40, expense: 30 },
        { income: 60, expense: 50 },
        { income: 80, expense: 40 },
        { income: 50, expense: 70 },
        { income: 90, expense: 60 },
        { income: 70, expense: 45 },
    ];

    return (
        <div className="bg-white rounded-xl p-[25px] text-left w-full card-container">
            {/* Skeleton do Título */}
            <div className="h-4 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
            
            {/* Skeleton do Gráfico */}
            <div className="w-full h-[300px] flex items-end justify-between pt-4">
                {heights.map((h, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 gap-2">
                        {/* Container das Barras (Income e Expense) */}
                        <div className="flex items-end justify-center w-full max-w-[32px] gap-1 h-[260px] border-b border-gray-100 pb-1">
                            <div className="w-full bg-gray-200 rounded-t-sm animate-pulse" style={{ height: `${h.income}%` }}></div>
                            <div className="w-full bg-gray-200 rounded-t-sm animate-pulse" style={{ height: `${h.expense}%` }}></div>
                        </div>
                        {/* Skeleton do Eixo X (Mês) */}
                        <div className="h-3 w-8 bg-gray-200 rounded animate-pulse mt-1"></div>
                    </div>
                ))}
            </div>

            {/* Skeleton da Legenda */}
            <div className="flex flex-col text-center mt-4 gap-2 justify-center">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-200 mr-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-200 mr-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
