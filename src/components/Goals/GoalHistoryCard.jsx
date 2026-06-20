import { Calendar as CalendarIcon } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

const statusConfig = {
    IN_PROGRESS: {
        label: "Em andamento",
        badgeClass: "bg-blue-100 text-blue-700",
    },
    ACHIEVED: {
        label: "Concluída",
        badgeClass: "bg-green-100 text-green-700",
    },
    FAILED: {
        label: "Não alcançada",
        badgeClass: "bg-red-100 text-red-700",
    },
};

const MONTH_NAMES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function GoalHistoryCard({ name, targetAmount, currentAmount, month, year, status }) {

    const config = statusConfig[status];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-800 truncate">{name}</h3>
                {config && (
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.badgeClass}`}>
                        {config.label}
                    </span>
                )}
            </div>

            {/* Valores */}
            <div className="flex items-end justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400">Alcançado</span>
                    <span className="text-lg font-bold text-gray-800">{formatCurrency(currentAmount)}</span>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                    <span className="text-xs text-gray-400">Meta</span>
                    <span className="text-sm font-medium text-gray-500">{formatCurrency(targetAmount)}</span>
                </div>
            </div>

            {/* Footer — Prazo */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{MONTH_NAMES[month - 1]} {year}</span>
            </div>

        </div>
    )
}