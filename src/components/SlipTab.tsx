import { useRef, useState } from 'react'
import type { CatalogItem } from '../data/catalog'
import type { OrderMeta } from '../types'
import { OrderSlip } from './OrderSlip'
import { Button, DownloadIcon, Eyebrow, Panel, SectionHeading } from './ui'
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
          <div className="mt-4 flex justify-center">
            <Button onClick={onBackToBuilder}>← Back to Order Builder</Button>
          </div>
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

      <Panel className="p-5 space-y-4">
        <div>
          <Eyebrow>Lot Number</Eyebrow>
          <input
            value={meta.lotNumber}
            onChange={(e) => onMetaChange({ lotNumber: e.target.value })}
            className="w-full sm:w-64 mt-2 bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading font-tech focus:outline-none focus:border-amber"
          />
        </div>
        <div>
          <Eyebrow>Notes / Special Instructions</Eyebrow>
          <textarea
            value={meta.notes}
            onChange={(e) => onMetaChange({ notes: e.target.value })}
            rows={2}
            className="w-full mt-2 bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading focus:outline-none focus:border-amber"
            placeholder="Optional — courier details, additional handling notes..."
          />
        </div>
      </Panel>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => handleExport('pdf')} disabled={exporting !== null}>
          <DownloadIcon />
          {exporting === 'pdf' ? 'Rendering…' : 'Download PDF'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleExport('jpeg')}
          disabled={exporting !== null}
        >
          <DownloadIcon />
          {exporting === 'jpeg' ? 'Rendering…' : 'Download JPEG'}
        </Button>
        <Button variant="ghost" onClick={onBackToBuilder}>
          ← Edit Order
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line">
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
