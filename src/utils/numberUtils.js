export const toPercent = (total, value) => {
  return Number(((value / total) * 100).toFixed(2));
};
