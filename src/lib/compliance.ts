import { addBusinessDays } from './businessDays'

export const ASN_DEADLINE_BUSINESS_DAYS = 2
export const MIN_EXPIRY_YEARS_FROM_DELIVERY = 1

export function asnDeadline(orderDate: Date): Date {
  return addBusinessDays(orderDate, ASN_DEADLINE_BUSINESS_DAYS)
}

export function asnStatus(
  orderDate: Date,
  now: Date = new Date(),
): { deadline: Date; daysLeft: number; tone: 'ok' | 'warning' | 'danger' } {
  const deadline = asnDeadline(orderDate)
  const msLeft = deadline.getTime() - now.getTime()
  const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24))
  const tone = daysLeft < 0 ? 'danger' : daysLeft <= 1 ? 'warning' : 'ok'
  return { deadline, daysLeft, tone }
}

export function checkExpiryCompliance(
  deliveryDate: Date,
  expiryDate: Date | null,
): { compliant: boolean; minExpiry: Date } {
  const minExpiry = new Date(deliveryDate)
  minExpiry.setFullYear(minExpiry.getFullYear() + MIN_EXPIRY_YEARS_FROM_DELIVERY)
  const compliant = expiryDate != null && expiryDate >= minExpiry
  return { compliant, minExpiry }
}
