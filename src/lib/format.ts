export function formatCurrency(value: number): string {
  return value.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
  })
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-CA')
}
