export const percentage = (numerator: number, denominator: number, fixed: number): Number => {
  const change = (numerator - denominator) / denominator;
  const percentChange = change * 100;
  return Number(percentChange.toFixed(fixed));
}