import { CATALOG, GOODS_SPECS } from '../data/catalog'
import { CONTRACT } from '../data/contract'
import { Button, Eyebrow, Panel, SectionHead, Tag } from './ui'
import type { TabKey } from './Header'

export function Cover({
  companyName,
  manufacturingNote,
  onManufacturingNoteChange,
  leadTimeDays,
  onNavigate,
}: {
  companyName: string
  manufacturingNote: string
  onManufacturingNoteChange: (value: string) => void
  leadTimeDays: number
  onNavigate: (tab: TabKey) => void
}) {
  const skuCount = CATALOG.length

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-line pt-16 pb-14 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-[1.08fr_0.92fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <Eyebrow>ApparelIQ · Single-source apparel program</Eyebrow>
              <Tag tone="blue">Working prototype</Tag>
            </div>
            <h1 className="font-disp text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-heading leading-[1.15] mt-5">
              <span className="text-amber">
                {companyName || 'ApparelIQ'}
              </span>
              {': a managed order fulfillment platform for BC Corrections inmate apparel.'}
            </h1>
            <p className="text-mist text-[16px] leading-relaxed mt-5 max-w-lg">
              A working prototype showing exactly how Order intake,
              delivery-compliance tracking, and Order Confirmations would
              run against the Standing Arrangement for RSA{' '}
              {CONTRACT.rsaNumber}. Every screen below is real and
              interactive.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button onClick={() => onNavigate('login')}>
                Start an order →
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  document
                    .getElementById('capabilities')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View capabilities
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-md">
              <HeroStat value={`${skuCount}`} label="Catalog SKUs" />
              <HeroStat value="2 yr + 5×1" label="Term options" />
              <HeroStat value="100%" label="SA requirements mapped" />
            </div>
          </div>
          <PreviewCard />
        </div>
      </section>

      {/* STANDARDS STRIP */}
      <div className="border-b border-line bg-panel-2">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-5">
          <TrustItem label="Delivery" value="PDC, Coquitlam" />
          <TrustItem label="Lead time (proposed)" value={`${leadTimeDays} Business Days`} />
          <TrustItem label="Backorder notice" value="Within 2 Bus. Days" />
          <TrustItem label="Goods expiry" value="≥ 1 year on delivery" />
          <TrustItem label="Recall notice" value="Immediate" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* 01 UNDERSTANDING & COMMITMENT */}
        <section id="commitment" className="py-20 border-b border-line">
          <SectionHead no="01" label="Understanding & Commitment" />
          <div className="max-w-2xl mb-11">
            <h2 className="font-disp text-2xl md:text-3xl font-bold text-heading leading-tight">
              We built the compliance system before submitting the Response.
            </h2>
            <p className="text-mist mt-3 text-[15px] leading-relaxed">
              RSA {CONTRACT.rsaNumber} carries real operational risk for the
              Province: no guaranteed Order volume, a hard 2-Business-Day
              window to confirm and ship every Order, and specific packaging
              and packing-slip requirements that can trigger a rejection at
              the Contractor&apos;s expense. Rather than describe a process
              on paper, we built the tooling that enforces it. This
              platform is that tooling, live.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
            <Phase
              tag="On Award"
              title="System configured"
              body="PDC contact, Delivery Location, and Standing Arrangement reference loaded. Tax Verification Letter on file per Schedule D."
            />
            <Phase
              tag="Within 2 Bus. Days"
              title="Order confirmed"
              body="Advance Shipping Notice and Order Confirmation issued automatically per SA §4.3: quantities, Contractor product code, and pricing confirmed."
            />
            <Phase
              tag={`Within ${leadTimeDays} Bus. Days`}
              title="Goods delivered"
              body="Delivered to PDC, Coquitlam within Business Hours, packaging and labeling compliant with SA §5.2."
            />
            <Phase
              tag="Ongoing"
              title="Term-long compliance"
              body="Backorder, Returns, and Recall procedures tracked per SA §4.7 / §6 / §8 across the 2-year term and up to five 1-year extensions."
            />
          </div>
        </section>

        {/* 02 CAPABILITIES */}
        <section id="capabilities" className="py-20 border-b border-line">
          <SectionHead no="02" label="Capabilities" />
          <div className="max-w-2xl mb-9">
            <h2 className="font-disp text-2xl md:text-3xl font-bold text-heading leading-tight">
              Mapped directly to the Standing Arrangement
            </h2>
            <p className="text-mist mt-3 text-[15px] leading-relaxed">
              Every capability below is built and working in this prototype,
              not just described on paper.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="text-left bg-panel-2 border-b border-line">
                  <th className="font-tech text-[11px] uppercase tracking-wide text-dim font-medium py-3 px-5">
                    Requirement
                  </th>
                  <th className="font-tech text-[11px] uppercase tracking-wide text-dim font-medium py-3 px-5">
                    Delivered capability
                  </th>
                  <th className="font-tech text-[11px] uppercase tracking-wide text-dim font-medium py-3 px-5">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {CAPABILITIES.map((row) => (
                  <tr key={row.ref} className="border-b border-line last:border-0">
                    <td className="py-4 px-5 align-top">
                      <div className="text-heading font-semibold">
                        {row.requirement}
                      </div>
                      <div className="font-tech text-[11px] text-amber mt-1">
                        {row.ref}
                      </div>
                    </td>
                    <td className="py-4 px-5 align-top text-mist">
                      {row.capability}
                    </td>
                    <td className="py-4 px-5 align-top">
                      <Tag tone="ok">Working</Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 03 MANUFACTURING & QUALITY */}
        <section id="manufacturing" className="py-20 border-b border-line">
          <SectionHead no="03" label="Manufacturing & Quality" />
          <div className="max-w-2xl mb-9">
            <h2 className="font-disp text-2xl md:text-3xl font-bold text-heading leading-tight">
              Goods built to the Province&apos;s specification
            </h2>
            <p className="text-mist mt-3 text-[15px] leading-relaxed">
              Every SKU meets the fabric, sizing, and design requirements in
              Appendix B, including safety-driven details the specification
              calls for.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {(Object.keys(GOODS_SPECS) as (keyof typeof GOODS_SPECS)[]).map(
              (cat) => (
                <Panel key={cat} className="p-5">
                  <div className="text-heading font-semibold">{cat}</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-mist">
                    {[...GOODS_SPECS[cat].fabric, ...GOODS_SPECS[cat].design].map(
                      (f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-amber">·</span>
                          {f}
                        </li>
                      ),
                    )}
                  </ul>
                </Panel>
              ),
            )}
          </div>

          <div className="mt-6 rounded-xl border border-line-2 border-dashed bg-panel-2/50 p-6">
            <div className="font-tech text-[11px] uppercase tracking-wide text-amber">
              Contractor input
            </div>
            <div className="text-heading font-semibold mt-2">
              Manufacturing facility &amp; quality assurance
            </div>
            <p className="text-sm text-mist mt-1 mb-3">
              Add your facility location, quality management protocol, and
              any certifications referenced in your Response (SA §7.1(l)).
            </p>
            <textarea
              value={manufacturingNote}
              onChange={(e) => onManufacturingNoteChange(e.target.value)}
              rows={3}
              placeholder="e.g. Manufactured at [facility], quality-managed under [standard/certification]..."
              className="w-full bg-panel border border-line rounded-lg px-3 py-2.5 text-sm text-heading placeholder:text-dim focus:outline-none focus:border-amber"
            />
          </div>
        </section>

        {/* 04 SYSTEM */}
        <section id="system" className="py-20 border-b border-line">
          <SectionHead no="04" label="System" />
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="eyebrow">Order intake</div>
              <h3 className="text-heading text-xl font-semibold mt-3">
                Ordering built against the real PDC catalogue
              </h3>
              <p className="text-mist text-[15px] mt-3 leading-relaxed">
                Select Goods against the actual PDC product codes, with no
                minimum order quantity and the mandatory Order fields from
                SA §4.6 enforced before an Order Confirmation can be
                generated.
              </p>
              <Button
                variant="secondary"
                onClick={() => onNavigate('login')}
              >
                Open the Order Builder →
              </Button>
            </div>
            <ConsolePreview />
          </div>
        </section>

        {/* 05 SERVICE LEVELS */}
        <section id="service-levels" className="py-20 border-b border-line">
          <SectionHead no="05" label="Service Levels" />
          <div className="max-w-2xl mb-9">
            <h2 className="font-disp text-2xl md:text-3xl font-bold text-heading leading-tight">
              Process commitments enforced by the platform
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm border-collapse min-w-[520px]">
              <thead>
                <tr className="text-left bg-panel-2 border-b border-line">
                  <th className="font-tech text-[11px] uppercase tracking-wide text-dim font-medium py-3 px-5">
                    Service metric
                  </th>
                  <th className="font-tech text-[11px] uppercase tracking-wide text-dim font-medium py-3 px-5">
                    SA target
                  </th>
                  <th className="font-tech text-[11px] uppercase tracking-wide text-dim font-medium py-3 px-5">
                    Platform behaviour
                  </th>
                </tr>
              </thead>
              <tbody>
                <SlaRow
                  metric="Order confirmation & ASN"
                  target="2 Business Days (§4.3)"
                  current="Same-day, automated"
                />
                <SlaRow
                  metric="Backorder notice"
                  target="2 Business Days (§4.7)"
                  current="Flagged on the Order itself"
                />
                <SlaRow
                  metric="Goods expiry compliance"
                  target="≥ 1 year from delivery (§4.2)"
                  current="Checked before Confirmation issues"
                />
                <SlaRow
                  metric="Packing slip completeness"
                  target="6 required fields (§5.2(h))"
                  current="Auto-populated on every Order"
                />
                <SlaRow
                  metric="Proposed Lead Time"
                  target="< 30 Business Days (RSA §3.3.1)"
                  current={`${leadTimeDays} Business Days`}
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* 06 COVERAGE */}
        <section className="py-20">
          <SectionHead no="06" label="Goods Coverage" />
          <div className="max-w-2xl mb-9">
            <h2 className="font-disp text-2xl md:text-3xl font-bold text-heading leading-tight">
              Full catalogue, {skuCount} SKUs
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {(Object.keys(GOODS_SPECS) as (keyof typeof GOODS_SPECS)[]).map(
              (cat) => (
                <div
                  key={cat}
                  className="rounded-xl border border-line p-5"
                >
                  <div className="text-heading font-semibold">{cat}</div>
                  <div className="text-mist text-sm mt-2">
                    {GOODS_SPECS[cat].colors.length} colour
                    {GOODS_SPECS[cat].colors.length === 1 ? '' : 's'} ·{' '}
                    {GOODS_SPECS[cat].sizes.length} sizes
                  </div>
                  <div className="text-dim text-xs mt-1 font-tech">
                    {GOODS_SPECS[cat].colors.join(' · ')}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="py-20 text-center border-t border-line">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="font-disp text-2xl md:text-3xl font-bold text-heading">
            Review the system, end to end
          </h2>
          <p className="text-mist mt-3 max-w-lg mx-auto">
            Every tab is live and fully interactive: build an Order and
            generate a real Order Confirmation.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button onClick={() => onNavigate('login')}>
              Order Builder →
            </Button>
            <Button variant="secondary" onClick={() => onNavigate('pricing')}>
              Pricing Schedule
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line py-11">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="text-heading font-semibold">
                ApparelIQ · BC Corrections
              </div>
              <p className="text-dim text-sm mt-2 max-w-xs">
                Order fulfillment platform prepared in response to RSA{' '}
                {CONTRACT.rsaNumber}, Inmate Apparel, Product Distribution
                Centre.
              </p>
            </div>
            <div>
              <div className="font-tech text-[11px] uppercase tracking-wide text-dim mb-3">
                Procurement
              </div>
              <div className="text-sm text-mist space-y-1.5">
                <div>
                  <span className="text-heading font-medium">Opportunity</span>{' '}
                  RSA {CONTRACT.rsaNumber}
                </div>
                <div>
                  <span className="text-heading font-medium">Authority</span>{' '}
                  Product Distribution Centre, Ministry of Citizens&apos;
                  Services
                </div>
                <div>
                  <span className="text-heading font-medium">Closing</span>{' '}
                  {CONTRACT.closingDateTime}
                </div>
              </div>
            </div>
            <div>
              <div className="font-tech text-[11px] uppercase tracking-wide text-dim mb-3">
                Platform
              </div>
              <div className="text-sm text-mist space-y-1.5">
                <button
                  onClick={() => onNavigate('login')}
                  className="block hover:text-heading"
                >
                  Order Builder
                </button>
                <button
                  onClick={() => onNavigate('fulfillment')}
                  className="block hover:text-heading"
                >
                  Fulfillment Spec
                </button>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="block hover:text-heading"
                >
                  Pricing Schedule
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-line mt-9 pt-5 font-tech text-[11px] text-dim tracking-wide">
            MINISTRY OF CITIZENS&apos; SERVICES · PRODUCT DISTRIBUTION CENTRE
            · BRITISH COLUMBIA
          </div>
        </div>
      </footer>
    </div>
  )
}

const CAPABILITIES: {
  ref: string
  requirement: string
  capability: string
}[] = [
  {
    ref: 'SA §4.6',
    requirement: 'Mandatory Order fields',
    capability:
      'Every Order enforces the SA reference, issuing PDC officer, and Goods/quantities before it can proceed.',
  },
  {
    ref: 'SA §4.3',
    requirement: '2-Business-Day confirmation',
    capability:
      'Order Confirmation and Advance Shipping Notice generated automatically, with a live deadline tracker.',
  },
  {
    ref: 'SA §4.7',
    requirement: 'Backorder / Partial Order handling',
    capability:
      'Partial Order flag with a proposed Backorder delivery date, formatted into the Order Confirmation.',
  },
  {
    ref: 'SA §4.2',
    requirement: 'Goods expiry ≥ 1 year',
    capability:
      'Expiry date checked against the computed Delivery Date before the Confirmation issues.',
  },
  {
    ref: 'SA §5.2(h)',
    requirement: 'Packing slip contents',
    capability:
      'Order #, lot #, Contractor and PDC product codes, quantity, and expiry auto-populated on every slip.',
  },
  {
    ref: 'SA §6',
    requirement: 'Returns handling',
    capability:
      'Return-authorization workflow and cost allocation documented per Contractor vs. Province error.',
  },
  {
    ref: 'SA §8.4-8.5',
    requirement: 'Recall notification',
    capability:
      'Recall procedure documented for immediate Province notification and removal instructions.',
  },
]

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold text-heading tracking-tight">
        {value}
      </div>
      <div className="font-tech text-[11px] text-dim uppercase tracking-wide mt-1">
        {label}
      </div>
    </div>
  )
}

function TrustItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4 px-1 sm:px-2">
      <div className="font-tech text-[11px] text-dim uppercase tracking-wide">
        {label}
      </div>
      <div className="text-heading font-semibold mt-1 text-sm">{value}</div>
    </div>
  )
}

function Phase({
  tag,
  title,
  body,
}: {
  tag: string
  title: string
  body: string
}) {
  return (
    <div className="bg-panel p-6 flex flex-col">
      <div className="font-tech text-[11px] tracking-wide text-amber">
        {tag}
      </div>
      <div className="text-heading font-semibold mt-2.5">{title}</div>
      <p className="text-sm text-mist mt-2 leading-relaxed">{body}</p>
    </div>
  )
}

function SlaRow({
  metric,
  target,
  current,
}: {
  metric: string
  target: string
  current: string
}) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="py-3.5 px-5 text-mist">{metric}</td>
      <td className="py-3.5 px-5 font-tech text-body">{target}</td>
      <td className="py-3.5 px-5 font-tech text-green">{current}</td>
    </tr>
  )
}

function PreviewCard() {
  return (
    <div className="rounded-2xl border border-line-2 bg-panel overflow-hidden shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-panel-2">
        <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
        <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
        <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
        <span className="font-tech text-xs text-dim ml-2">
          order builder · preview
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-heading font-semibold">
              SHIRT TEE SS DARK RED
            </div>
            <div className="font-tech text-xs text-dim mt-0.5">
              PDC 8410213193
            </div>
          </div>
          <Tag tone="amber">$8.00</Tag>
        </div>

        <div className="mt-4">
          <div className="font-tech text-[11px] text-dim mb-1.5 uppercase tracking-wide">
            Size
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['S', 'M', 'L', 'XL', '2XL'].map((s) => (
              <span
                key={s}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                  s === 'L'
                    ? 'bg-blue text-panel-2 border-blue'
                    : 'border-line-2 text-body'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="font-tech text-[11px] text-dim uppercase tracking-wide">
              Order qty
            </div>
            <div className="text-heading font-semibold">200</div>
          </div>
          <div className="text-right">
            <div className="font-tech text-[11px] text-dim uppercase tracking-wide">
              Delivery
            </div>
            <div className="text-heading font-semibold">10 bus. days</div>
          </div>
        </div>

        <button className="w-full mt-5 bg-amber text-amber-ink text-sm font-semibold rounded-lg py-2.5">
          Generate confirmation →
        </button>
      </div>
    </div>
  )
}

function ConsolePreview() {
  return (
    <div className="rounded-2xl border border-line-2 bg-panel overflow-hidden shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-panel-2">
        <span className="font-tech text-xs text-mist tracking-wide">
          compliance console
        </span>
        <span className="font-tech text-[11px] text-green flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green" />
          monitoring
        </span>
      </div>
      <div className="p-5 space-y-3">
        <ReadoutRow k="ASN deadline" v="Jul 21, 2026" tone="ok" />
        <ReadoutRow k="Backorder notice" v="Not required" tone="ok" />
        <ReadoutRow k="Goods expiry" v="Jul 31, 2028 · compliant" tone="ok" />
        <ReadoutRow k="Delivery packaging" v="§5.2 checklist ready" tone="ok" />
      </div>
    </div>
  )
}

function ReadoutRow({
  k,
  v,
  tone,
}: {
  k: string
  v: string
  tone: 'ok' | 'warning'
}) {
  return (
    <div className="flex items-baseline gap-2 font-tech text-[13px]">
      <span className="text-dim whitespace-nowrap">{k}</span>
      <span className="flex-1 border-b border-dotted border-line-2 translate-y-[-3px]" />
      <span className={tone === 'ok' ? 'text-green' : 'text-amber'}>{v}</span>
    </div>
  )
}
