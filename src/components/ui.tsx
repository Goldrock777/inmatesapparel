import type { PropsWithChildren, ReactNode } from 'react'

export function Panel({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-xl bg-panel border border-line ${className}`}>
      {children}
    </div>
  )
}

export function Eyebrow({ children }: PropsWithChildren) {
  return <div className="eyebrow">{children}</div>
}

export function SectionHead({ no, label }: { no: string; label: string }) {
  return (
    <div className="section-head">
      <span className="no">{no}</span>
      <span className="lbl">{label}</span>
      <span className="rule" />
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
}) {
  return (
    <div className="mb-9 max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-disp text-2xl md:text-3xl font-bold text-heading leading-tight mt-2">
        {title}
      </h2>
      {description && (
        <p className="text-mist mt-3 text-[15px] leading-relaxed">
          {description}
        </p>
      )}
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
    <div>
      <div className="text-2xl md:text-3xl font-semibold text-heading tracking-tight">
        {value}
      </div>
      <div className="font-tech text-[11px] text-dim uppercase tracking-wide mt-1">
        {label}
      </div>
      {sub && <div className="text-sm text-body mt-0.5">{sub}</div>}
    </div>
  )
}

export function Tag({
  children,
  tone = 'default',
}: PropsWithChildren<{ tone?: 'default' | 'red' | 'amber' | 'ok' | 'blue' }>) {
  const toneClass = {
    default: 'bg-panel-2 text-mist border-line-2',
    red: 'bg-red-bright/10 text-red-bright border-red-bright/30',
    amber: 'bg-amber/10 text-amber border-amber/30',
    ok: 'bg-green/10 text-green border-green/30',
    blue: 'bg-blue/10 text-blue border-blue/30',
  }[tone]
  return (
    <span
      className={`font-tech text-[11px] font-semibold rounded-md border px-2.5 py-1 inline-flex items-center gap-1.5 tracking-wide ${toneClass}`}
    >
      {children}
    </span>
  )
}

export function Pill({
  children,
  tone = 'ok',
}: PropsWithChildren<{ tone?: 'ok' | 'low' | 'crit' | 'pend' }>) {
  const toneClass = {
    ok: 'bg-green/15 text-green',
    low: 'bg-amber/15 text-amber',
    crit: 'bg-red-bright/15 text-red-bright',
    pend: 'bg-blue/15 text-blue',
  }[tone]
  return (
    <span
      className={`font-tech text-[10px] font-semibold px-2 py-0.5 rounded-md tracking-wide ${toneClass}`}
    >
      {children}
    </span>
  )
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  href,
}: PropsWithChildren<{
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  type?: 'button' | 'submit'
  href?: string
}>) {
  const variantClass = {
    primary: 'bg-amber text-amber-ink hover:bg-amber-2',
    secondary:
      'border border-line-2 text-heading hover:border-blue bg-transparent',
    ghost: 'text-mist hover:text-body bg-transparent',
  }[variant]
  const classes = `inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${variantClass}`
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  )
}

export function DownloadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12m0 0-4-4m4 4 4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  )
}
