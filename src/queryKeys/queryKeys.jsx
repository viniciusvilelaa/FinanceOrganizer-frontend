export const QUERY_KEYS = {
    goals: {
        all: ['goals'],
        current: () => [...QUERY_KEYS.goals.all, 'currentGoalData'],
        history: (filters) => [...QUERY_KEYS.goals.all, 'goalHistory', filters],

    },

    transactions: (filters) => ['transactions', filters],

    summary: () => ['summary'],
    monthlyBalance: () => ['monthlyBalance'],
    sixMonthChart: () => ['sixMonthChartData'],
    categoryChart: () => ['categoryChartData']

}