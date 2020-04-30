export function contains<T extends any>(arr:T[], value:T): boolean {
  return arr.some(v => v === value)
}
