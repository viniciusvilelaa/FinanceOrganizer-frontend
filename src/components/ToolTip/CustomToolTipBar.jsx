export function CustomToolTipBar({ active, payload }) {
    if (!active || !payload || payload.length === 0) return null



    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-md p-3 text-left">
            <p className="text-sm font-semibold text-gray-700">{payload[0].month}</p>
            <p className="text-sm text-green-400">{payload[0].payload.formattedIncome}</p>
            <p className="text-sm text-red-400p">{payload[1].payload.formattedExpense}</p>
        </div>
    )
}