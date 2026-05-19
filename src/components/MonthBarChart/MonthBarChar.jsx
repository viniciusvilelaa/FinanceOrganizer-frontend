import { BarChart, Bar, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { CustomToolTipBar } from "../ToolTip/CustomToolTipBar";

import MonthBarChartSkeleton from "./MonthBarChartSkeleton";

const expenseRedColor = "#dc2626";
const incomeGreenColor = "#16a34a";

export default function MonthBarChart({ data, loading, error }) {
    
    if (loading) return <MonthBarChartSkeleton />
    if (error) return `Error: ${error}`
    if (!data || data.length === 0) return "Empty data"

    return (
        <div className="bg-white rounded-xl p-[25px] text-left w-full card-container">
            <h1 className="text-sm font-normal text-gray-400 mb-2 uppercase tracking-wider">Monthly overview</h1>
            <p className="text-xs text-gray-300 mb-4">Last 6 months</p>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                    <XAxis dataKey="month"></XAxis>
                    <Tooltip content={CustomToolTipBar}></Tooltip>
                    <Bar dataKey="income" fill={incomeGreenColor}></Bar>
                    <Bar dataKey="expense" fill={expenseRedColor}></Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-col text-center mt-4 gap-2 justify-center">
                <div className="flex items-center ">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: incomeGreenColor }}></div>
                    <span className="text-sm text-gray-600">Income</span>
                </div>
                <div className="flex items-center ">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: expenseRedColor }}></div>
                    <span className="text-sm text-gray-600">Expense</span>
                </div>
            </div>
        </div>
    )
}