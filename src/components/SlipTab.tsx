import { useRef, useState } from 'react'
import type { CatalogItem } from '../data/catalog'
import type { OrderMeta } from '../types'
import { OrderSlip } from './OrderSlip'
import { Kicker, Panel, SectionHeading } from './ui'
import { exportNodeAsJpeg, exportNodeAsPdf } from '../lib/exportSlip'

interface Line {
  item: CatalogItem
  qty: number
}

export function SlipTab({
  lines,
  meta,
  onMetaChange,
  companyName,
  onBackToBuilder,
}: {
  lines: Line[]
  meta: OrderMeta
  onMetaChange: (patch: Partial<OrderMeta>) => void
  companyName: string
  onBackToBuilder: () => void
}) {
  const slipRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState<'pdf' | 'jpeg' | null>(null)

  const filename = `${meta.orderNumber || 'order-confirmation'}`

  async function handleExport(kind: 'pdf' | 'jpeg') {
    if (!slipRef.current) return
    setExporting(kind)
    try {
      if (kind === 'pdf') {
        await exportNodeAsPdf(slipRef.current, filename)
      } else {
        await exportNodeAsJpeg(slipRef.current, filename)
      }
    } finally {
      setExporting(null)
    }
  }

  if (lines.length === 0) {
    return (
      <div className="space-y-6">
        <SectionHeading
          eyebrow="SA §4.3 / §5.2(h)"
          title="Order Confirmation"
          description="No line items yet. Add Goods and quantities in the Order Builder first."
        />
        <Panel className="p-8 text-center">
          <p className="text-mist text-sm">
            Nothing to confirm yet — build an Order first.
          </p>
          <button
            type="button"
            onClick={onBackToBuilder}
            className="stamp text-xs bg-amber text-ink px-4 py-2.5 mt-4 hover:bg-amber/90"
          >
            ← Back to Order Builder
          </button>
        </Panel>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="SA §4.3 / §5.2(h)"
        title="Order Confirmation"
        description="Advance shipping notice and packing-slip contents, generated from the Order Builder. Confirms quantities, Contractor product code, and pricing within the required two Business Day window."
      />

      <Panel className="p-5">
        <Kicker>Lot Number</Kicker>
        <input
          value={meta.lotNumber}
          onChange={(e) => onMetaChange({ lotNumber: e.target.value })}
          className="w-full sm:w-64 mt-2 bg-panel-raised border border-line px-3 py-2 text-sm text-heading font-mono focus:outline-none focus:border-amber"
        />
        <Kicker>
          <span className="mt-4 block">Notes / Special Instructions</span>
        </Kicker>
        <textarea
          value={meta.notes}
          onChange={(e) => onMetaChange({ notes: e.target.value })}
          rows={2}
          className="w-full mt-2 bg-panel-raised border border-line px-3 py-2 text-sm text-heading focus:outline-none focus:border-amber"
          placeholder="Optional — e.g. Partial Order / Backorder notice, courier details..."
        />
      </Panel>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleExport('pdf')}
          disabled={exporting !== null}
          className="stamp text-xs bg-amber text-ink px-4 py-2.5 hover:bg-amber/90 disabled:opacity-50"
        >
          {exporting === 'pdf' ? 'Rendering…' : 'Download PDF'}
        </button>
        <button
          type="button"
          onClick={() => handleExport('jpeg')}
          disabled={exporting !== null}
          className="stamp text-xs border border-line-strong text-heading px-4 py-2.5 hover:border-amber disabled:opacity-50"
        >
          {exporting === 'jpeg' ? 'Rendering…' : 'Download JPEG'}
        </button>
        <button
          type="button"
          onClick={onBackToBuilder}
          className="stamp text-xs border border-line text-mist px-4 py-2.5 hover:text-body"
        >
          ← Edit Order
        </button>
      </div>

      <div className="overflow-x-auto border border-line bg-[#0000]">
        <div className="py-8 px-4 min-w-[850px]">
          <OrderSlip
            ref={slipRef}
            lines={lines}
            meta={meta}
            companyName={companyName}
          />
        </div>
      </div>
    </div>
  )
}
