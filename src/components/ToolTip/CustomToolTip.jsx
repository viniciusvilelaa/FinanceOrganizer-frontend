export function CustomTooltip({ active, payload }) {
    if (!active || !payload || payload.length === 0) return null

    const item = payload[0].payload

    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-md p-3 text-left">
            <p className="text-sm font-semibold text-gray-700">{item.category}</p>
            <p className="text-sm text-gray-500">{item.formattedTotal}</p>
            <p className="text-sm text-gray-400">{item.formattedPercentage}</p>
        </div>
    )
}