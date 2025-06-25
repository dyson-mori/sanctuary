export const format = {
  money: (value: number) => value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }),
  formatCurrency(value: string): string {
    const numeric = value.replace(/\D/g, '') // remove tudo que não for número
    const number = parseFloat(numeric) / 100
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  },
  parseCurrencyToFloat(value: string): number {
    return Number(
      value
        .replace(/\s/g, '')       // remove espaços
        .replace('R$', '')        // remove R$
        .replace('.', '')         // remove separador de milhar
        .replace(',', '.')        // troca vírgula por ponto
    );
  }
};