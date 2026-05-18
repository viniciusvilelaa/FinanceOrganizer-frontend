export function formatShortChurrency(valor){
    if(valor === undefined || valor === null) return "R$ 0"

    const NUMBER = valor

    if(NUMBER >= 1000){
        return `R$ ${(NUMBER/1000).toFixed(1)}k`;
    }

    return `R$ ${NUMBER}k.`
}