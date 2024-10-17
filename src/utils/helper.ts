export const formatPrice = (number: number) => Number(number?.toFixed(1)).toLocaleString()

export function getLastTwoNames(fullName: string) {
  const names = fullName.trim().split(' ')
  const lastTwoNames = names.slice(-2)
  return lastTwoNames.join(' ')
}
