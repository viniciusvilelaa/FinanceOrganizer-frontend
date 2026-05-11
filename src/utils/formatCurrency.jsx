export function formatCurrency(valor) {
    if (valor === undefined || valor === null) return 'R$ 0,OO';

    const numero = Number(valor);

    return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL", maximumFractionDigits: 2, minimumFractionDigits: 2}).format(numero);
}