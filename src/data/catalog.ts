// PDC product codes sourced from the Procurement Decision Note (May 27, 2026).
// Combinations without an assigned PDC code are flagged rather than invented —
// PDC has historically only issued codes for SKUs with purchase history.

export type GoodCategory = 'T-Shirt' | 'Sweatshirt' | 'Sweatpants'

export interface CatalogItem {
  pdcCode: string | null
  category: GoodCategory
  description: string
  color: string
  size: string
  uom: 'Each'
  unitPrice: number | null
  estimatedAnnualVolume: number | null
}

const TEE_SIZES = ['SM', 'MD', 'LG', 'XL', '2XL', '3XL', '4XL', '5XL']
const SWEATSHIRT_SIZES = ['SM', 'MD', 'LG', 'XL', '2XL', '3XL', '4XL', '5XL']
const SWEATPANT_SIZES = ['SM', 'MD', 'LG', 'XL', '2XL']

interface SizeRow {
  code?: string
  price?: number
  volume?: number
}

// [size] -> PDC code (Procurement Decision Note) / bid price / estimated annual volume (Appendix C)
const TEE_WHITE: Record<string, SizeRow> = {
  SM: { code: '8410213175', price: 8.0, volume: 20 },
  MD: { code: '8410213176', price: 8.0, volume: 35 },
  LG: { code: '8410213177', price: 8.0, volume: 150 },
  XL: { code: '8410213178', price: 8.0, volume: 200 },
  '2XL': { code: '8410213179', price: 9.0, volume: 100 },
  '3XL': { code: '8410213169', price: 9.5, volume: 35 },
  '4XL': { price: 10.0 },
  '5XL': { price: 10.5 },
}

const TEE_SPORT_GREY: Record<string, SizeRow> = {
  SM: { code: '8410213272', price: 8.0, volume: 100 },
  MD: { code: '8410213273', price: 8.0, volume: 300 },
  LG: { code: '8410213274', price: 8.0, volume: 250 },
  XL: { code: '8410213275', price: 8.0, volume: 150 },
  '2XL': { code: '8410213276', price: 9.0, volume: 30 },
  '3XL': { price: 9.5, volume: 5 },
  '4XL': { code: '8410213278', price: 10.0, volume: 5 },
  '5XL': { price: 10.5, volume: 30 },
}

const TEE_DARK_RED: Record<string, SizeRow> = {
  SM: { price: 8.0, volume: 5 },
  MD: { code: '8410213192', price: 8.0, volume: 500 },
  LG: { code: '8410213193', price: 8.0, volume: 1700 },
  XL: { code: '8410213194', price: 8.0, volume: 3800 },
  '2XL': { code: '8410213195', price: 9.0, volume: 2300 },
  '3XL': { code: '8410213196', price: 9.5, volume: 650 },
  '4XL': { code: '8410213198', price: 10.0, volume: 200 },
  '5XL': { code: '8410213199', price: 10.5, volume: 50 },
}

const SWEATSHIRT_SPORT_GREY: Record<string, SizeRow> = {
  SM: { code: '8410070074', price: 10.0, volume: 20 },
  MD: { code: '8410070075', price: 11.0, volume: 50 },
  LG: { code: '8410070076', price: 11.5, volume: 500 },
  XL: { code: '8410070077', price: 12.0, volume: 500 },
  '2XL': { code: '8410070078', price: 12.5, volume: 450 },
  '3XL': { code: '8410070097', price: 13.0, volume: 50 },
  '4XL': { code: '8410070098', price: 13.5, volume: 50 },
  '5XL': { code: '8410070107', price: 14.0, volume: 10 },
}

const SWEATSHIRT_DARK_RED: Record<string, SizeRow> = {
  MD: { price: 12.0, volume: 5 },
  LG: { code: '8410070101', price: 12.0, volume: 200 },
  XL: { code: '8410070102', price: 12.0, volume: 350 },
  '2XL': { code: '8410070103', price: 13.0, volume: 400 },
  '3XL': { code: '8410070104', price: 13.5, volume: 150 },
  '4XL': { code: '8410070105', price: 14.0, volume: 50 },
  '5XL': { code: '8410070106', price: 14.5, volume: 20 },
}

const SWEATPANTS_SPORT_GREY: Record<string, SizeRow> = {
  SM: { code: '8410070090', price: 15.0, volume: 150 },
  MD: { code: '8410070091', price: 15.0, volume: 300 },
  LG: { code: '8410070092', price: 15.0, volume: 300 },
  XL: { code: '8410070093', price: 15.0, volume: 400 },
  '2XL': { code: '8410070094', price: 15.0, volume: 250 },
}

function build(
  category: GoodCategory,
  descPrefix: string,
  color: string,
  sizes: string[],
  rows: Record<string, SizeRow>,
): CatalogItem[] {
  return sizes.map((size) => {
    const row = rows[size] ?? {}
    return {
      pdcCode: row.code ?? null,
      category,
      description: `${descPrefix} ${color.toUpperCase()} ${size}`,
      color,
      size,
      uom: 'Each' as const,
      unitPrice: row.price ?? null,
      estimatedAnnualVolume: row.volume ?? null,
    }
  })
}

export const CATALOG: CatalogItem[] = [
  ...build('T-Shirt', 'SHIRT TEE SS', 'White', TEE_SIZES, TEE_WHITE),
  ...build('T-Shirt', 'SHIRT TEE SS', 'Sport Grey', TEE_SIZES, TEE_SPORT_GREY),
  ...build('T-Shirt', 'SHIRT TEE SS', 'Dark Red', TEE_SIZES, TEE_DARK_RED),
  ...build(
    'Sweatshirt',
    'SHIRT SWEAT P/C',
    'Sport Grey',
    SWEATSHIRT_SIZES,
    SWEATSHIRT_SPORT_GREY,
  ),
  ...build(
    'Sweatshirt',
    'SHIRT SWEAT P/C',
    'Dark Red',
    SWEATSHIRT_SIZES,
    SWEATSHIRT_DARK_RED,
  ),
  ...build(
    'Sweatpants',
    'PANTS SWEAT P/C',
    'Sport Grey',
    SWEATPANT_SIZES,
    SWEATPANTS_SPORT_GREY,
  ),
]

export const GOODS_SPECS: Record<
  GoodCategory,
  { colors: string[]; sizes: string[]; fabric: string[]; design: string[] }
> = {
  'T-Shirt': {
    colors: ['White', 'Grey', 'Dark Red'],
    sizes: ['SM', 'MD', 'LG', 'XL', '2XL', '3XL', '4XL', '5XL'],
    fabric: ['9 - 11 oz', '100% cotton', 'Pre-shrunk', 'Jersey knit'],
    design: ['Crew neck collar', 'Short sleeve'],
  },
  Sweatshirt: {
    colors: ['Grey', 'Dark Red'],
    sizes: ['SM', 'MD', 'LG', 'XL', '2XL', '3XL', '4XL', '5XL'],
    fabric: ['12 - 14 oz', 'Cotton/poly blend', 'Pre-shrunk'],
    design: ['Rib knit cuffs, collar and waistband', 'Long sleeve'],
  },
  Sweatpants: {
    colors: ['Grey'],
    sizes: ['SM', 'MD', 'LG', 'XL', '2XL'],
    fabric: ['12 - 14 oz', 'Cotton/poly blend', 'Pre-shrunk'],
    design: [
      'Elasticized cuffs',
      'Elastic waistband',
      'No drawstring',
      'No pockets',
    ],
  },
}
