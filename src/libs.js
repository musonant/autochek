export const toMoneyString = (num) => {
  const symbol = '\u20A6';
  const result = (+num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return symbol + result;
};
