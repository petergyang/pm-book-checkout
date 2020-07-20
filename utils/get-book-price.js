const getBookPrice = numBooks =>
  (Math.round(numBooks * 8.99 * 100) / 100).toFixed(2);

export default getBookPrice;
