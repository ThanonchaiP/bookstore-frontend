export function toFixedNoRound(number: number, precision = 1) {
  const factor = Math.pow(10, precision);
  return Math.floor(number * factor) / factor;
}
