export const formatNumber = (num, currency = true) => {
  const symbol = '\u20A6';
  const numParts = num.toString().split('.');
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (!currency) {
    return numParts.join('.');
  }
  return symbol + numParts.join('.');
};
