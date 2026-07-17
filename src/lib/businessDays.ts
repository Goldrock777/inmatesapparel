// Business Day per the Standing Arrangement: excludes Saturdays, Sundays,
// BC statutory holidays, and Dec 26 / Easter Monday. Statutory holidays are
// approximated here (fixed-date ones only) for planning purposes.

const FIXED_HOLIDAYS_MMDD = new Set([
  '01-01', // New Year's Day
  '07-01', // Canada Day
  '11-11', // Remembrance Day
  '12-25', // Christmas Day
  '12-26', // Boxing Day (contract explicitly excludes)
])

function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

function mmdd(date: Date): string {
  return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`
}

export function isBusinessDay(date: Date): boolean {
  if (isWeekend(date)) return false
  if (FIXED_HOLIDAYS_MMDD.has(mmdd(date))) return false
  return true
}

export function addBusinessDays(start: Date, days: number): Date {
  const result = new Date(start)
  let remaining = days
  while (remaining > 0) {
    result.setDate(result.getDate() + 1)
    if (isBusinessDay(result)) remaining -= 1
  }
  return result
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}
