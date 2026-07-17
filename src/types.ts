import type { CatalogItem } from './data/catalog'

export interface OrderLine {
  item: CatalogItem
  qty: number
}

export interface OrderMeta {
  orderNumber: string
  lotNumber: string
  orderDate: string // ISO date
  issuerName: string
  issuerTitle: string
  deliverToAlternate: boolean
  alternateLocation: string
  leadTimeDays: number
  expiryDate: string // ISO date
  notes: string
  isPartialOrder: boolean
  backorderProposedDate: string // ISO date
}
