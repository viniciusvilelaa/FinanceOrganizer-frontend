import { Calendar as CalendarIcon } from "lucide-react";

export default function CurrentGoalCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 animate-pulse">

            {/* Header */}
            <div className="flex items-center justify-between">
                {/* Skeleton para o Nome */}
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                {/* Skeleton para a Badge */}
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
            </div>

            {/* Valores */}
            <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-gray-400">Atual</span>
                    {/* Skeleton para o valor atual */}
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="flex flex-col gap-1.5 items-end">
                    <span className="text-xs text-gray-400">Meta</span>
                    {/* Skeleton para o valor da meta */}
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
            </div>

            {/* Barra de Progresso */}
            <div className="flex flex-col gap-1.5">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gray-200 w-full" />
                </div>
                {/* Skeleton para a porcentagem concluída */}
                <div className="h-3.5 bg-gray-200 rounded w-24 ml-auto"></div>
            </div>

            {/* Footer — Prazo */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <CalendarIcon className="w-3.5 h-3.5 text-gray-200" />
                {/* Skeleton para a data */}
                <div className="h-3.5 bg-gray-200 rounded w-12"></div>
            </div>

        </div>
    );
}
