import { PieChart as PieChartIcon, ReceiptText } from "lucide-react";

export default function CategoryPieChartEmpty() {
    return (
        <div className="bg-white rounded-xl p-[25px] text-left w-full card-container">
            <h1 className="text-sm font-normal text-gray-400 mb-2 uppercase tracking-wider">
                Expenses by category
            </h1>

            <div className="flex flex-col items-center justify-center min-h-[280px] py-6 text-center">
                <div className="relative w-44 h-44 rounded-full border-4 border-dashed border-gray-200 flex flex-col items-center justify-center bg-gray-50/60 mb-4 shadow-inner">
                    <PieChartIcon className="w-10 h-10 text-gray-300 stroke-[1.5] mb-1" />
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">No data</span>
                </div>

                <h3 className="text-base font-semibold text-gray-600 mb-1">
                    No transactions found
                </h3>
                <p className="text-xs text-gray-400 max-w-xs">
                    There are no expense records for this period to display the category chart.
                </p>
            </div>
        </div>
    );
}
