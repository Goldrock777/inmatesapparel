export type TabKey = 'cover' | 'builder' | 'slip' | 'fulfillment' | 'pricing'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'cover', label: 'Proposal' },
  { key: 'builder', label: 'Order Builder' },
  { key: 'slip', label: 'Order Confirmation' },
  { key: 'fulfillment', label: 'Fulfillment Spec' },
  { key: 'pricing', label: 'Pricing Schedule' },
]

export function Header({
  active,
  onChange,
  companyName,
  onCompanyNameChange,
}: {
  active: TabKey
  onChange: (tab: TabKey) => void
  companyName: string
  onCompanyNameChange: (value: string) => void
}) {
  return (
    <header className="border-b border-line bg-ink/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-3 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border-2 border-amber grid place-items-center rotate-45">
              <span className="font-display text-amber -rotate-45 text-sm">
                IA
              </span>
            </div>
            <div>
              <div className="font-display uppercase tracking-widest text-heading text-sm leading-none">
                Inmate Apparel
              </div>
              <div className="stamp text-[10px] text-mist mt-1">
                RSA 6000086831 // Order Fulfillment System
              </div>
            </div>
          </div>
          <input
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            className="bg-panel border border-line px-3 py-1.5 text-sm text-heading font-mono w-full sm:w-64 focus:outline-none focus:border-amber"
            placeholder="Your company legal name"
            aria-label="Contractor legal name"
          />
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-2 -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`stamp text-[11px] px-3 py-2 border-b-2 whitespace-nowrap transition-colors ${
                active === tab.key
                  ? 'border-amber text-heading'
                  : 'border-transparent text-mist hover:text-body'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
