import { Calendar as CalendarIcon } from "lucide-react";
import CurrentGoalCardSkeleton from "./CurrentGoalCardSkeleton";

const statusConfig = {
    "ACHIEVED": {
        label: "Done",
        badgeClass: "bg-green-100 text-green-700",
        barClass: "bg-green-500",
    },
    "FAILED": {
        label: "Failed",
        badgeClass: "bg-red-100 text-red-700",
        barClass: "bg-red-500",
    },
    "ON_TRACK": {
        label: "At the way",
        badgeClass: "bg-blue-100 text-blue-700",
        barClass: "bg-blue-500",
    },
    "AT_RISK": {
        label: "At risk",
        badgeClass: "bg-yellow-100 text-yellow-700",
        barClass: "bg-yellow-500"
    }
};



export default function CurrentGoalCard({ name, targetAmount, currentAmount, status, percentage, month, year, isFetching }) {

    if(isFetching) return <CurrentGoalCardSkeleton/>

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-800 truncate">{name}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[status].badgeClass}`}>
                    {statusConfig[status].label}
                </span>
            </div>

            {/* Valores */}
            <div className="flex items-end justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400">Current</span>
                    <span className="text-lg font-bold text-gray-800">{currentAmount}</span>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                    <span className="text-xs text-gray-400">Goal</span>
                    <span className="text-sm font-medium text-gray-500">{targetAmount}</span>
                </div>
            </div>

            {/* Barra de Progresso */}
            <div className="flex flex-col gap-1.5">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-2 rounded-full transition-all duration-500 ${statusConfig[status].barClass}`}
                        style={{ width: `${Math.min(parseFloat(percentage) || 0, 100)}%` }}
                    />
                </div>
                <span className="text-xs text-gray-400 text-right">{percentage} completed</span>
            </div>

            {/* Footer — Prazo */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{month}/{year}</span>
            </div>

        </div>
    )


}