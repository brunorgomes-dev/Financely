const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatAmount = (value) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return currencyFormatter.format(0);
  }

  return currencyFormatter.format(amount);
};

export const sanitizeAmountInput = (rawValue) => {
  const cleanedValue = rawValue.replace(/[^\d.,]/g, '');

  if (!cleanedValue) {
    return '';
  }

  const normalizedValue = cleanedValue.includes(',')
    ? cleanedValue.replace(/\./g, '').replace(',', '.').replace(/,/g, '')
    : cleanedValue;

  const [integerPart, ...decimalParts] = normalizedValue.split('.');
  const decimals = decimalParts.join('').replace(/\D/g, '').slice(0, 2);
  const numbersOnlyInteger = integerPart.replace(/\D/g, '');

  if (normalizedValue.includes('.')) {
    return `${numbersOnlyInteger || '0'}.${decimals}`;
  }

  return numbersOnlyInteger;
};

export const parseAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};
