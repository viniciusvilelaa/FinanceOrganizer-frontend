const ROOT = ['finance'];

export const QUERY_KEYS = {
    finance: ROOT,

    goals: {
        all: [...ROOT, 'goals'],
        current: () => [...QUERY_KEYS.goals.all, 'currentGoalData'],
        history: (filters) => [...QUERY_KEYS.goals.all, 'goalHistory', filters],
    },

    transactions: (filters) => [...ROOT, 'transactions', filters],

    summary: () => [...ROOT, 'summary'],
    monthlyBalance: () => [...ROOT, 'monthlyBalance'],
    sixMonthChart: () => [...ROOT, 'sixMonthChartData'],
    categoryChart: () => [...ROOT, 'categoryChartData'],

    //Passar filters no futuro? para permitir filtros de categoria
    categories: () => [...ROOT, 'categories'] 
};