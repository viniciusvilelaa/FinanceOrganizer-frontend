import { useNavigate } from "react-router-dom";
import { Target } from "lucide-react";

export default function EmptyGoalCard({ onCreateGoal }) {

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Target className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-gray-800">Nenhuma meta para este mês</h3>
                <p className="text-xs text-gray-500 max-w-[240px]">
                    Defina uma meta e acompanhe seu progresso
                </p>
            </div>
            <button
                onClick={onCreateGoal}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
                Definir Meta
            </button>
        </div>
    );
}
