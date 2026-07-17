import { useMemo, useRef, useState } from 'react'
import { CATALOG, type GoodCategory } from '../data/catalog'
import { CONTRACT } from '../data/contract'
import { formatCurrency, formatNumber } from '../lib/format'
import { exportNodeAsJpeg, exportNodeAsPdf } from '../lib/exportSlip'
import { Button, Eyebrow, Panel, SectionHeading } from './ui'

const CATEGORIES: GoodCategory[] = ['T-Shirt', 'Sweatshirt', 'Sweatpants']

export function PricingSheet({ companyName }: { companyName: string }) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState<'pdf' | 'jpeg' | null>(null)

  const priced = CATALOG.filter((i) => i.unitPrice != null)
  const unbid = CATALOG.filter((i) => i.unitPrice == null)
  const pricedButCodePending = priced.filter((i) => !i.pdcCode)
  const grandTotalVolume = priced.reduce(
    (s, i) => s + (i.estimatedAnnualVolume ?? 0),
    0,
  )
  const grandTotalValue = priced.reduce(
    (s, i) => s + (i.unitPrice ?? 0) * (i.estimatedAnnualVolume ?? 0),
    0,
  )

  const byCategory = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        category: cat,
        items: priced.filter((i) => i.category === cat),
      })),
    [priced],
  )

  async function handleExport(kind: 'pdf' | 'jpeg') {
    if (!sheetRef.current) return
    setExporting(kind)
    try {
      if (kind === 'pdf') {
        await exportNodeAsPdf(sheetRef.current, 'appendix-b1-pricing-schedule')
      } else {
        await exportNodeAsJpeg(
          sheetRef.current,
          'appendix-b1-pricing-schedule',
        )
      }
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Schedule B - Appendix B1"
        title="Pricing Schedule"
        description="Proposed unit pricing against the Province's estimated annual purchase volumes (RSA Appendix C §3.4). Firm for the Standing Arrangement term per SA §2.11."
      />

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => handleExport('pdf')} disabled={exporting !== null}>
          {exporting === 'pdf' ? 'Rendering…' : 'Download PDF'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleExport('jpeg')}
          disabled={exporting !== null}
        >
          {exporting === 'jpeg' ? 'Rendering…' : 'Download JPEG'}
        </Button>
      </div>

      <div className="overflow-x-auto border border-line">
        <div className="py-8 px-4 min-w-[850px]">
          <div
            ref={sheetRef}
            className="bg-white text-[#14181a] w-full max-w-[850px] mx-auto"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
          >
            <div className="bg-[#0a0c0d] text-white px-8 py-5 flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#c99a3e]">
                  Schedule B - Appendix B1
                </div>
                <div className="text-xl font-bold uppercase tracking-tight mt-1">
                  {companyName || '[Contractor Legal Name]'} Pricing Schedule
                </div>
              </div>
              <div className="text-right text-[11px] leading-relaxed text-[#c7ced2]">
                <div>Standing Arrangement</div>
                <div className="font-mono text-white">
                  RSA {CONTRACT.rsaNumber}
                </div>
              </div>
            </div>

            <div className="px-8 py-6">
              {byCategory.map(({ category, items }) => (
                <div key={category} className="mb-6 last:mb-0">
                  <div className="uppercase text-[11px] font-semibold tracking-wide border-b-2 border-[#0a0c0d] pb-1 mb-2">
                    {category}
                  </div>
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr className="text-left uppercase text-[9px] text-[#5c6669]">
                        <th className="py-1 pr-2 font-semibold">
                          Description
                        </th>
                        <th className="py-1 pr-2 font-semibold">PDC Code</th>
                        <th className="py-1 pr-2 font-semibold text-right">
                          UoM
                        </th>
                        <th className="py-1 pr-2 font-semibold text-right">
                          Est. Annual Vol.
                        </th>
                        <th className="py-1 pr-2 font-semibold text-right">
                          Bid Price
                        </th>
                        <th className="py-1 pr-0 font-semibold text-right">
                          Extended
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.description}
                          className="border-b border-[#e5e7e8]"
                        >
                          <td className="py-1.5 pr-2">{item.description}</td>
                          <td className="py-1.5 pr-2 font-mono">
                            {item.pdcCode ?? 'PENDING'}
                          </td>
                          <td className="py-1.5 pr-2 text-right">
                            {item.uom}
                          </td>
                          <td className="py-1.5 pr-2 text-right font-mono">
                            {item.estimatedAnnualVolume != null
                              ? formatNumber(item.estimatedAnnualVolume)
                              : '—'}
                          </td>
                          <td className="py-1.5 pr-2 text-right font-mono">
                            {formatCurrency(item.unitPrice ?? 0)}
                          </td>
                          <td className="py-1.5 pr-0 text-right font-mono">
                            {formatCurrency(
                              (item.unitPrice ?? 0) *
                                (item.estimatedAnnualVolume ?? 0),
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}

              <div className="flex justify-end mt-4 pt-4 border-t-2 border-[#0a0c0d]">
                <table className="text-[11px]">
                  <tbody>
                    <tr>
                      <td className="pr-8 py-1 text-[#5c6669] uppercase text-[9px]">
                        Total Estimated Annual Volume
                      </td>
                      <td className="text-right font-mono font-semibold">
                        {formatNumber(grandTotalVolume)}
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-8 py-1 text-[#5c6669] uppercase text-[9px]">
                        Total Estimated Annual Value
                      </td>
                      <td className="text-right font-mono font-bold text-base">
                        {formatCurrency(grandTotalValue)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[9px] text-[#5c6669] mt-4 leading-relaxed">
                Prices quoted in Canadian dollars, inclusive of duty, FOB
                destination, and delivery charges where applicable, exclusive
                of applicable taxes, per RSA §7.4. Estimated volumes are
                historical purchase references only and do not constitute a
                guarantee of future Order quantities (SA §3.1).
              </p>
            </div>
          </div>
        </div>
      </div>

      <Panel className="p-5">
        <Eyebrow>Pricing Coverage Note</Eyebrow>
        <p className="text-xs text-mist mt-2 leading-relaxed">
          {pricedButCodePending.length} of {CATALOG.length} catalog
          combinations above (e.g. White 4XL/5XL) are priced but do not yet
          carry an assigned PDC product code or historical purchase volume —
          consistent with the Procurement Decision Note, which only issues
          codes against combinations with purchase history. These lines
          remain orderable in the Order Builder and will receive a PDC code
          on first Order.{' '}
          {unbid.length > 0 &&
            `${unbid.length} combination${unbid.length === 1 ? '' : 's'} (Sweatshirt Dark Red SM) received no bid and is omitted from this schedule entirely.`}
        </p>
      </Panel>
    </div>
  )
}
