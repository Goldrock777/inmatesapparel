import type { PropsWithChildren, ReactNode } from 'react'

export function Panel({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`bracket-panel bg-panel/70 border border-line ${className}`}
    >
      {children}
    </div>
  )
}

export function Kicker({ children }: PropsWithChildren) {
  return (
    <div className="stamp text-[11px] text-amber flex items-center gap-2">
      <span className="w-4 h-px bg-amber inline-block" />
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: ReactNode
}) {
  return (
    <div className="mb-6">
      <Kicker>{eyebrow}</Kicker>
      <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-heading mt-2">
        {title}
      </h2>
      {description && (
        <p className="text-body/80 mt-2 max-w-2xl text-sm leading-relaxed">
          {description}
        </p>
      )}
      <div className="scan-divider mt-4" />
    </div>
  )
}

export function StatTile({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="bracket-panel bg-panel-raised/60 border border-line px-4 py-3">
      <div className="stamp text-[10px] text-mist">{label}</div>
      <div className="font-display text-xl md:text-2xl text-heading mt-1">
        {value}
      </div>
      {sub && <div className="text-xs text-mist mt-1">{sub}</div>}
    </div>
  )
}

export function Tag({
  children,
  tone = 'default',
}: PropsWithChildren<{ tone?: 'default' | 'red' | 'amber' | 'ok' }>) {
  const toneClass = {
    default: 'border-line text-mist',
    red: 'border-red-bright/50 text-red-bright',
    amber: 'border-amber/50 text-amber',
    ok: 'border-ok/50 text-ok',
  }[tone]
  return (
    <span
      className={`stamp text-[10px] border px-2 py-0.5 inline-block ${toneClass}`}
    >
      {children}
    </span>
  )
}
