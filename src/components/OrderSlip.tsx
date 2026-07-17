import { forwardRef } from 'react'
import type { CatalogItem } from '../data/catalog'
import { CONTRACT } from '../data/contract'
import { formatCurrency, formatNumber } from '../lib/format'
import { addBusinessDays, formatDate } from '../lib/businessDays'
import { contractorSku } from '../lib/ids'
import type { OrderMeta } from '../types'

interface Line {
  item: CatalogItem
  qty: number
}

export const OrderSlip = forwardRef<
  HTMLDivElement,
  { lines: Line[]; meta: OrderMeta; companyName: string }
>(function OrderSlip({ lines, meta, companyName }, ref) {
  const deliveryDate = addBusinessDays(
    new Date(meta.orderDate || Date.now()),
    meta.leadTimeDays,
  )
  const totalQty = lines.reduce((s, l) => s + l.qty, 0)
  const totalValue = lines.reduce(
    (s, l) => s + l.qty * (l.item.unitPrice ?? 0),
    0,
  )
  const deliverTo = meta.deliverToAlternate
    ? meta.alternateLocation || 'Alternate location (TBD)'
    : CONTRACT.deliveryLocation

  return (
    <div
      ref={ref}
      className="bg-white text-[#14181a] w-full max-w-[850px] mx-auto"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      <div className="bg-[#0a0c0d] text-white px-8 py-5 flex items-center justify-between">
        <div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-[#c99a3e]">
            Order Confirmation &amp; Advance Shipping Notice
          </div>
          <div className="text-xl font-bold uppercase tracking-tight mt-1">
            {companyName || '[Contractor Legal Name]'}
          </div>
        </div>
        <div className="text-right text-[11px] leading-relaxed text-[#c7ced2]">
          <div>Standing Arrangement</div>
          <div className="font-mono text-white">RSA {CONTRACT.rsaNumber}</div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[12px] border-b border-[#d8dbdd] pb-6 mb-6">
          <Field label="Order Number" value={meta.orderNumber} mono />
          <Field label="Lot Number" value={meta.lotNumber} mono />
          <Field
            label="Order Date"
            value={formatDate(new Date(meta.orderDate || Date.now()))}
          />
          <Field
            label="Delivery Date (per Lead Time)"
            value={`${formatDate(deliveryDate)}  (${meta.leadTimeDays} Business Days)`}
          />
          <Field
            label="Issued By (PDC)"
            value={`${meta.issuerName || '—'}${meta.issuerTitle ? `, ${meta.issuerTitle}` : ''}`}
          />
          <Field label="Deliver To" value={deliverTo} />
          <Field
            label="Goods Expiry Date"
            value={
              meta.expiryDate
                ? formatDate(new Date(meta.expiryDate))
                : '—'
            }
            mono
          />
        </div>

        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="text-left uppercase text-[10px] text-[#5c6669] border-b-2 border-[#0a0c0d]">
              <th className="py-2 pr-2 font-semibold">Description</th>
              <th className="py-2 pr-2 font-semibold">PDC Code</th>
              <th className="py-2 pr-2 font-semibold">Contractor Code</th>
              <th className="py-2 pr-2 font-semibold text-right">Qty</th>
              <th className="py-2 pr-2 font-semibold text-right">
                Unit Price
              </th>
              <th className="py-2 pr-0 font-semibold text-right">
                Extended
              </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr
                key={`${line.item.category}-${line.item.color}-${line.item.size}`}
                className="border-b border-[#e5e7e8]"
              >
                <td className="py-2 pr-2">{line.item.description}</td>
                <td className="py-2 pr-2 font-mono">
                  {line.item.pdcCode ?? 'PENDING'}
                </td>
                <td className="py-2 pr-2 font-mono">
                  {contractorSku(line.item)}
                </td>
                <td className="py-2 pr-2 text-right font-mono">
                  {formatNumber(line.qty)}
                </td>
                <td className="py-2 pr-2 text-right font-mono">
                  {line.item.unitPrice != null
                    ? formatCurrency(line.item.unitPrice)
                    : '—'}
                </td>
                <td className="py-2 pr-0 text-right font-mono">
                  {formatCurrency(line.qty * (line.item.unitPrice ?? 0))}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} />
              <td className="py-3 pr-2 text-right font-semibold border-t-2 border-[#0a0c0d]">
                {formatNumber(totalQty)}
              </td>
              <td className="py-3 pr-2 text-right font-semibold border-t-2 border-[#0a0c0d] text-[10px] uppercase text-[#5c6669]">
                Total
              </td>
              <td className="py-3 pr-0 text-right font-bold border-t-2 border-[#0a0c0d]">
                {formatCurrency(totalValue)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-6 text-[10px] text-[#5c6669]">
          <div className="uppercase tracking-wide font-semibold text-[#14181a] mb-1">
            Goods Expiry
          </div>
          Per SA §4.2, Goods supplied under this Order must carry an expiry
          date no less than one (1) year from the Delivery Date above, unless
          the Province has agreed otherwise in writing in advance.
        </div>

        {meta.notes && (
          <div className="mt-4 text-[10px] text-[#5c6669]">
            <div className="uppercase tracking-wide font-semibold text-[#14181a] mb-1">
              Notes
            </div>
            {meta.notes}
          </div>
        )}

        <div className="mt-6 border border-[#d8dbdd] p-4">
          <div className="uppercase tracking-wide font-semibold text-[10px] text-[#14181a] mb-2">
            Packing Slip Contents — SA §5.2(h) Confirmation
          </div>
          <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-[10px] text-[#3a4245]">
            {[
              'Order number provided by the Province',
              'Lot number of the Goods',
              "Contractor's product code",
              'Quantity of Goods shipped',
              'Relevant expiry date of the Goods',
              'PDC product code',
            ].map((label) => (
              <div key={label} className="flex items-start gap-1.5">
                <span className="text-[#0a0c0d]">☑</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-10 pt-6 border-t border-[#d8dbdd] text-[10px]">
          <div>
            <div className="h-10 border-b border-[#0a0c0d]" />
            <div className="mt-1 text-[#5c6669] uppercase tracking-wide">
              Contractor Authorized Signature
            </div>
          </div>
          <div>
            <div className="h-10 border-b border-[#0a0c0d]" />
            <div className="mt-1 text-[#5c6669] uppercase tracking-wide">
              Date
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f2f1ea] px-8 py-3 text-[9px] text-[#5c6669] flex justify-between">
        <span>
          Delivery Location: PDC Warehouse, {CONTRACT.deliveryLocation}
        </span>
        <span>Generated by {companyName || '[Contractor]'} order system</span>
      </div>
    </div>
  )
})

function Field({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div>
      <div className="uppercase text-[9px] tracking-wide text-[#5c6669]">
        {label}
      </div>
      <div className={mono ? 'font-mono text-[13px]' : 'text-[13px]'}>
        {value || '—'}
      </div>
    </div>
  )
}
