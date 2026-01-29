/**
 * Formata um valor numérico como moeda brasileira (R$)
 * @param value - Valor em reais (número ou string)
 * @returns Valor formatado como "R$ 1.234,56"
 */
export const formatCurrency = (value: string | number): string => {
  if (!value) return 'R$ 0,00';

  // Converter para número se for string
  let numValue = typeof value === 'string' ? parseFloat(value) : value;

  // Se for NaN, retornar 0
  if (isNaN(numValue)) return 'R$ 0,00';

  // Formatar como moeda brasileira
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numValue);
};

/**
 * Formata um valor numérico como moeda sem o símbolo R$
 * @param value - Valor em reais (número ou string)
 * @returns Valor formatado como "1.234,56"
 */
export const formatCurrencyValue = (value: string | number): string => {
  if (!value) return '0,00';

  let numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '0,00';

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue);
};

/**
 * Converte um valor formatado (string com vírgula/ponto) para número
 * @param value - Valor formatado como "1.234,56" ou "1234.56"
 * @returns Número decimal
 */
export const parseFormattedCurrency = (value: string): number => {
  if (!value) return 0;

  // Remover espaços
  value = value.trim();

  // Remover "R$" se existir
  value = value.replace('R$', '').trim();

  // Converter formato brasileiro (1.234,56) para número
  if (value.includes(',')) {
    // Remover pontos (separador de milhares) e converter vírgula para ponto
    value = value.replace(/\./g, '').replace(',', '.');
  }

  return parseFloat(value);
};
