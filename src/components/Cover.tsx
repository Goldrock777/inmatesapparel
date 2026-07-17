import { CONTRACT } from '../data/contract'
import { CATALOG } from '../data/catalog'
import { Kicker, Panel, StatTile } from './ui'
import type { TabKey } from './Header'

export function Cover({
  companyName,
  onNavigate,
}: {
  companyName: string
  onNavigate: (tab: TabKey) => void
}) {
  const skuCount = CATALOG.length
  const assignedCodes = CATALOG.filter((c) => c.pdcCode).length

  return (
    <div className="space-y-10">
      <section className="relative border border-line bg-panel/50 px-6 py-10 md:px-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_1px,transparent_14px)]" />
        <div className="relative">
          <Kicker>Response Exhibit // Fulfillment Systems Demonstration</Kicker>
          <h1 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl text-heading tracking-tight mt-3 max-w-3xl">
            Order Fulfillment System
            <span className="block text-amber">for BC Corrections Inmate Apparel</span>
          </h1>
          <p className="text-body/90 mt-4 max-w-2xl leading-relaxed">
            Submitted in support of {companyName || '[Contractor Legal Name]'}
            's Response to RSA {CONTRACT.rsaNumber} (Product Distribution
            Centre, Ministry of Citizens' Services). This platform demonstrates
            the order intake, delivery-compliance, and order-confirmation
            workflow proposed for the resulting Standing Arrangement — built
            directly against the Goods, Delivery, and Order requirements of
            Appendix A.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              type="button"
              onClick={() => onNavigate('builder')}
              className="stamp text-xs bg-amber text-ink px-4 py-2.5 hover:bg-amber/90 transition-colors"
            >
              Open Order Builder →
            </button>
            <button
              type="button"
              onClick={() => onNavigate('fulfillment')}
              className="stamp text-xs border border-line-strong text-heading px-4 py-2.5 hover:border-amber transition-colors"
            >
              View Fulfillment Spec
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile
          label="Est. Contract Value"
          value={CONTRACT.estimatedTotalValue}
          sub="Incl. all extension terms"
        />
        <StatTile
          label="Term"
          value="2 yrs + 5×1 yr opt."
          sub={`${CONTRACT.termStart} start`}
        />
        <StatTile
          label="Catalog SKUs Modeled"
          value={`${skuCount}`}
          sub={`${assignedCodes} with PDC codes on file`}
        />
        <StatTile
          label="Avg. Annual Spend"
          value={CONTRACT.avgAnnualSpend}
          sub={`${CONTRACT.avgMonthlySpend} / month historical`}
        />
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Panel className="p-5">
          <div className="stamp text-[11px] text-amber">01</div>
          <h3 className="font-display uppercase text-heading text-lg mt-2">
            Order Intake
          </h3>
          <p className="text-sm text-body/80 mt-2 leading-relaxed">
            Structured order builder against the actual PDC product codes,
            enforcing the SA §4.6 minimum Order fields — SA reference, issuing
            PDC officer, and Goods/quantities — with no minimum order quantity.
          </p>
        </Panel>
        <Panel className="p-5">
          <div className="stamp text-[11px] text-amber">02</div>
          <h3 className="font-display uppercase text-heading text-lg mt-2">
            Confirmation &amp; Slip
          </h3>
          <p className="text-sm text-body/80 mt-2 leading-relaxed">
            Auto-generates the Order Confirmation / packing slip required by
            SA §4.3 and §5.2(h) — Order #, lot #, Contractor and PDC product
            codes, quantities, and expiry — downloadable as PDF or JPEG.
          </p>
        </Panel>
        <Panel className="p-5">
          <div className="stamp text-[11px] text-amber">03</div>
          <h3 className="font-display uppercase text-heading text-lg mt-2">
            Delivery Compliance
          </h3>
          <p className="text-sm text-body/80 mt-2 leading-relaxed">
            Built-in reference for dock, skid, carton, and labeling
            specifications (SA §5.2), Backorder handling (§4.7), Returns
            (§6), and Recall procedure (§8.4-8.5).
          </p>
        </Panel>
      </section>
    </div>
  )
}
