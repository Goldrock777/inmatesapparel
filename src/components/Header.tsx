import { Button } from './ui'

export type TabKey = 'cover' | 'builder' | 'slip' | 'fulfillment' | 'pricing'

const ANCHORS: { id: string; label: string }[] = [
  { id: 'commitment', label: 'Approach' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'system', label: 'System' },
  { id: 'service-levels', label: 'Service levels' },
]

const TOOL_TABS: { key: TabKey; label: string }[] = [
  { key: 'builder', label: 'Order Builder' },
  { key: 'slip', label: 'Confirmation' },
  { key: 'fulfillment', label: 'Fulfillment' },
  { key: 'pricing', label: 'Pricing' },
]

export function Header({
  active,
  onChange,
  onAnchor,
  companyName,
  onCompanyNameChange,
}: {
  active: TabKey
  onChange: (tab: TabKey) => void
  onAnchor: (id: string) => void
  companyName: string
  onCompanyNameChange: (value: string) => void
}) {
  const onCover = active === 'cover'

  return (
    <header className="sticky top-0 z-30 bg-ink/85 backdrop-blur border-b border-line">
      <div className="hidden md:block border-b border-line bg-panel-2">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-[34px] flex items-center justify-between font-tech text-[11px] tracking-wide text-dim">
          <span>
            Government of British Columbia · Ministry of Citizens&apos;
            Services
          </span>
          <span>
            RSA <span className="text-amber font-semibold">6000086831</span>
          </span>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-[60px] gap-4">
          <button
            type="button"
            onClick={() => onChange('cover')}
            className="flex items-center gap-3 text-left"
          >
            <ShieldMark />
            <div>
              <div className="font-semibold text-heading text-[15px] leading-none tracking-tight">
                ApparelIQ
              </div>
              <div className="font-tech text-[10px] text-dim mt-1 tracking-wide">
                BC CORRECTIONS · INMATE APPAREL
              </div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {onCover
              ? ANCHORS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => onAnchor(a.id)}
                    className="text-sm text-mist hover:text-heading px-3 py-2 rounded-md hover:bg-white/[0.04] transition-colors"
                  >
                    {a.label}
                  </button>
                ))
              : TOOL_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => onChange(tab.key)}
                    className={`text-sm px-3 py-2 rounded-md transition-colors ${
                      active === tab.key
                        ? 'text-heading bg-white/[0.06]'
                        : 'text-mist hover:text-heading hover:bg-white/[0.04]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
          </nav>

          <div className="flex items-center gap-3">
            <input
              value={companyName}
              onChange={(e) => onCompanyNameChange(e.target.value)}
              className="hidden xl:block bg-panel-2 border border-line-2 rounded-lg px-3 py-2 text-sm text-heading w-52 focus:outline-none focus:border-amber"
              placeholder="Your company legal name"
              aria-label="Contractor legal name"
            />
            <Button onClick={() => onChange('builder')}>Start an order</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function ShieldMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5 5 5.2v5.3c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V5.2L12 2.5Z"
        stroke="#cda349"
        strokeWidth="1.6"
      />
      <path
        d="m9 12 2 2 4-4.5"
        stroke="#cda349"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
