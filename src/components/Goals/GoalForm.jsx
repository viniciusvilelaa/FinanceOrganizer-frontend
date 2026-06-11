import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { goalValidation } from "../../validations/goalValidation";
import { useCreateGoal } from "../../hooks/useCreateGoal.jsx"

export function GoalForm({ onSuccess }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(goalValidation),
        defaultValues: {
            name: "",
            targetAmount: 0,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        }
    });

    const { mutate, isPending } = useCreateGoal();



    function onSubmit(data) {
        mutate(data, {
            onSuccess: () => onSucess()
        })
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            {/* Nome */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Nome da meta</label>
                <input
                    {...register("name")}
                    type="text"
                    placeholder="Ex: Viagem, Carro novo..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>

            {/* Valor Alvo */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Valor alvo</label>
                <input
                    {...register("targetAmount", { valueAsNumber: true })}
                    type="number"
                    placeholder="R$ 0,00"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {errors.targetAmount && <span className="text-xs text-red-500">{errors.targetAmount.message}</span>}
            </div>

            {/* Mês e Ano */}
            <div className="flex gap-3">

                {/* Mês */}
                <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-sm font-medium text-gray-700">Mês</label>
                    <select
                        {...register("month", { valueAsNumber: true })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
                            .map((m, i) => (
                                <option key={i} value={i + 1}>{m}</option>
                            ))}
                    </select>
                    {errors.month && <span className="text-xs text-red-500">{errors.month.message}</span>}
                </div>

                {/* Ano */}
                <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-sm font-medium text-gray-700">Ano</label>
                    <select
                        {...register("year", { valueAsNumber: true })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        {[0, 1, 2].map((offset) => {
                            const y = new Date().getFullYear() + offset;
                            return <option key={y} value={y}>{y}</option>
                        })}
                    </select>
                    {errors.year && <span className="text-xs text-red-500">{errors.year.message}</span>}
                </div>

            </div>

            {/* Botão */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-2"
            >
                {isPending ? "Criando..." : "Criar meta"}
            </button>

        </form>
    )
}