import type { CatalogItem } from '../data/catalog'

const CATEGORY_CODE: Record<string, string> = {
  'T-Shirt': 'TSH',
  Sweatshirt: 'SWS',
  Sweatpants: 'SWP',
}

const COLOR_CODE: Record<string, string> = {
  White: 'WHT',
  'Sport Grey': 'GRY',
  'Dark Red': 'RED',
}

export function itemKey(item: CatalogItem): string {
  return `${item.category}|${item.color}|${item.size}`
}

// Contractor's own product code, per SA section 4.3 - distinct from the PDC code.
export function contractorSku(item: CatalogItem): string {
  const cat = CATEGORY_CODE[item.category] ?? 'GEN'
  const color = COLOR_CODE[item.color] ?? item.color.slice(0, 3).toUpperCase()
  return `IA-${cat}-${color}-${item.size}`
}

function pad(n: number, width: number): string {
  return String(n).padStart(width, '0')
}

export function generateOrderNumber(date: Date, seq: number): string {
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1, 2)
  const d = pad(date.getDate(), 2)
  return `SA-6000086831-${y}${m}${d}-${pad(seq, 3)}`
}

export function generateLotNumber(date: Date, seq: number): string {
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1, 2)
  const d = pad(date.getDate(), 2)
  return `LOT-${y}${m}${d}-${pad(seq, 2)}`
}
