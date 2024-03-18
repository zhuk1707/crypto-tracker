export function getPercentDifference(a, b) {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}