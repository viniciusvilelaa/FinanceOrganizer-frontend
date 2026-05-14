export function formatPercentage(value) {
    if (value === null || value === undefined || isNaN(value)) {
        return "0.0%";
    }
    
    // Converte para número e fixa 1 casa decimal
    return `${Number(value).toFixed(1)}%`;
}
