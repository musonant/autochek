const symbol = '\u20A6';

export const formatNumber = (num, currency = true) => {
  const numParts = num.toString().split('.');
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (!currency) {
    return numParts.join('.');
  }
  return symbol + numParts.join('.');
};

/**
 * @source: https://stackoverflow.com/a/18650828/11226901
 */
export const abbreviateNumber = (num, currency = true, decimals = 2) => {
  if (num === 0) {
    return '0';
  }

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['', 'K', 'M', 'B'];

  const i = Math.floor(Math.log(num) / Math.log(k));
  const result = parseFloat((num / Math.pow(k, i)).toFixed(dm)) + '' + sizes[i];

  if (!currency) {
    return result;
  }
  return symbol + result;
};
