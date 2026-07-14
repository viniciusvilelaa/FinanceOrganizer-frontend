export function formatCurrency(valor) {
    if (valor === undefined || valor === null) return 'R$ 0.00';

    const numero = Number(valor);

    return new Intl.NumberFormat("en-US", {style: "currency", currency: "BRL", maximumFractionDigits: 2, minimumFractionDigits: 2}).format(numero);
}