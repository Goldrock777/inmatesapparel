import { useMemo, useState } from 'react'
import { CATALOG, type CatalogItem, type GoodCategory } from '../data/catalog'
import { CONTRACT, ORDER_REQUIREMENTS } from '../data/contract'
import { formatCurrency, formatNumber } from '../lib/format'
import { addBusinessDays, formatDate } from '../lib/businessDays'
import { asnStatus, checkExpiryCompliance } from '../lib/compliance'
import { itemKey } from '../lib/ids'
import { Button, Eyebrow, Panel, SectionHeading, Tag } from './ui'
import type { OrderMeta } from '../types'

const CATEGORIES: GoodCategory[] = ['T-Shirt', 'Sweatshirt', 'Sweatpants']

export function OrderBuilder({
  cart,
  onQtyChange,
  meta,
  onMetaChange,
  onGenerate,
}: {
  cart: Map<string, number>
  onQtyChange: (item: CatalogItem, qty: number) => void
  meta: OrderMeta
  onMetaChange: (patch: Partial<OrderMeta>) => void
  onGenerate: () => void
}) {
  const [activeCategory, setActiveCategory] = useState<GoodCategory>('T-Shirt')

  const lines = useMemo(
    () =>
      CATALOG.filter((item) => (cart.get(itemKey(item)) ?? 0) > 0).map(
        (item) => ({ item, qty: cart.get(itemKey(item)) ?? 0 }),
      ),
    [cart],
  )

  const totalQty = lines.reduce((sum, l) => sum + l.qty, 0)
  const totalValue = lines.reduce(
    (sum, l) => sum + l.qty * (l.item.unitPrice ?? 0),
    0,
  )
  const orderDate = new Date(meta.orderDate || Date.now())
  const deliveryDate = addBusinessDays(orderDate, meta.leadTimeDays)
  const asn = asnStatus(orderDate)
  const expiry = checkExpiryCompliance(
    deliveryDate,
    meta.expiryDate ? new Date(meta.expiryDate) : null,
  )

  const visibleItems = CATALOG.filter((i) => i.category === activeCategory)
  const colors = Array.from(new Set(visibleItems.map((i) => i.color)))

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="SA §4 - Orders"
        title="Order Builder"
        description="Select Goods and quantities. No minimum order quantity applies to any Order per the Contractor's Response. Line items missing an assigned PDC code are still orderable — code assignment is pending on the Province's side."
      />

      <Panel className="p-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Eyebrow>Mandatory Order Fields — SA §4.6</Eyebrow>
          <Tag tone={asn.tone === 'ok' ? 'ok' : asn.tone === 'warning' ? 'amber' : 'red'}>
            Confirm &amp; ship by {formatDate(asn.deadline)}
            {asn.tone !== 'ok' &&
              (asn.daysLeft < 0
                ? ' — overdue'
                : asn.daysLeft === 0
                  ? ' — due today'
                  : ' — 1 day left')}
          </Tag>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-xs font-semibold text-mist uppercase tracking-wide block mb-1">
              PDC Officer Name
            </label>
            <input
              value={meta.issuerName}
              onChange={(e) => onMetaChange({ issuerName: e.target.value })}
              placeholder="e.g. Kendra Green"
              className="w-full bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading focus:outline-none focus:border-amber"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-mist uppercase tracking-wide block mb-1">
              PDC Officer Title
            </label>
            <input
              value={meta.issuerTitle}
              onChange={(e) => onMetaChange({ issuerTitle: e.target.value })}
              placeholder="e.g. Procurement and Contract Officer"
              className="w-full bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading focus:outline-none focus:border-amber"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-mist uppercase tracking-wide block mb-1">
              Order Date
            </label>
            <input
              type="date"
              value={meta.orderDate}
              onChange={(e) => onMetaChange({ orderDate: e.target.value })}
              className="w-full bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading focus:outline-none focus:border-amber"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-mist uppercase tracking-wide block mb-1">
              Lead Time (Business Days)
            </label>
            <input
              type="number"
              min={0}
              value={meta.leadTimeDays}
              onChange={(e) =>
                onMetaChange({ leadTimeDays: Number(e.target.value) || 0 })
              }
              className="w-full bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading focus:outline-none focus:border-amber"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-mist uppercase tracking-wide block mb-1">
              Goods Expiry Date (SA §4.2)
            </label>
            <input
              type="date"
              value={meta.expiryDate}
              onChange={(e) => onMetaChange({ expiryDate: e.target.value })}
              className="w-full bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading focus:outline-none focus:border-amber"
            />
            {!expiry.compliant && meta.expiryDate && (
              <div className="text-xs text-red-bright mt-1">
                Below 1 year from Delivery Date — requires Province sign-off
                in advance.
              </div>
            )}
          </div>
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              id="alt-delivery"
              type="checkbox"
              checked={meta.deliverToAlternate}
              onChange={(e) =>
                onMetaChange({ deliverToAlternate: e.target.checked })
              }
              className="accent-[var(--color-amber)]"
            />
            <label htmlFor="alt-delivery" className="text-sm text-body">
              Deliver to alternate location (SA §5.3 - occasional drop
              shipment)
            </label>
          </div>
          {meta.deliverToAlternate && (
            <div className="md:col-span-2">
              <input
                value={meta.alternateLocation}
                onChange={(e) =>
                  onMetaChange({ alternateLocation: e.target.value })
                }
                placeholder="Alternate delivery address"
                className="w-full bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading focus:outline-none focus:border-amber"
              />
            </div>
          )}

          <div className="md:col-span-2 flex items-center gap-3">
            <input
              id="partial-order"
              type="checkbox"
              checked={meta.isPartialOrder}
              onChange={(e) =>
                onMetaChange({ isPartialOrder: e.target.checked })
              }
              className="accent-[var(--color-amber)]"
            />
            <label htmlFor="partial-order" className="text-sm text-body">
              This is a Partial Order / Backorder (SA §4.7)
            </label>
          </div>
          {meta.isPartialOrder && (
            <div>
              <label className="text-xs font-semibold text-mist uppercase tracking-wide block mb-1">
                Proposed Backorder Delivery Date
              </label>
              <input
                type="date"
                value={meta.backorderProposedDate}
                onChange={(e) =>
                  onMetaChange({ backorderProposedDate: e.target.value })
                }
                className="w-full bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading focus:outline-none focus:border-amber"
              />
            </div>
          )}
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mt-5 text-xs">
          {ORDER_REQUIREMENTS.map((req) => (
            <div
              key={req}
              className="border border-line rounded-lg px-3 py-2 text-mist flex gap-2"
            >
              <span className="text-amber">✓</span>
              {req}
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                activeCategory === cat
                  ? 'bg-panel-2 text-heading'
                  : 'text-mist hover:text-body'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {colors.map((color) => (
          <div key={color} className="mb-6 last:mb-0">
            <div className="text-sm font-semibold text-heading mb-2">
              {color}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b border-line text-mist text-xs font-semibold uppercase tracking-wide">
                    <th className="py-2 pr-3 font-semibold">Size</th>
                    <th className="py-2 pr-3 font-semibold">PDC Code</th>
                    <th className="py-2 pr-3 font-semibold text-right">
                      Unit Price
                    </th>
                    <th className="py-2 pr-3 font-semibold text-right">
                      Est. Annual Vol.
                    </th>
                    <th className="py-2 pr-0 font-semibold text-right w-28">
                      Order Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleItems
                    .filter((i) => i.color === color)
                    .map((item) => {
                      const key = itemKey(item)
                      const qty = cart.get(key) ?? 0
                      return (
                        <tr
                          key={key}
                          className="border-b border-line/60 hover:bg-panel-2/40"
                        >
                          <td className="py-2.5 pr-3 text-heading font-semibold">
                            {item.size}
                          </td>
                          <td className="py-2.5 pr-3 font-mono text-sm text-body">
                            {item.pdcCode ?? (
                              <Tag tone="amber">code pending</Tag>
                            )}
                          </td>
                          <td className="py-2.5 pr-3 text-right text-body tabular-nums">
                            {item.unitPrice != null
                              ? formatCurrency(item.unitPrice)
                              : '—'}
                          </td>
                          <td className="py-2.5 pr-3 text-right text-mist tabular-nums">
                            {item.estimatedAnnualVolume != null
                              ? formatNumber(item.estimatedAnnualVolume)
                              : '—'}
                          </td>
                          <td className="py-2.5 pr-0 text-right">
                            <input
                              type="number"
                              min={0}
                              value={qty || ''}
                              placeholder="0"
                              onChange={(e) =>
                                onQtyChange(
                                  item,
                                  Math.max(0, Number(e.target.value) || 0),
                                )
                              }
                              className="w-24 bg-panel-2 border border-line rounded-lg px-2 py-1.5 text-right font-semibold tabular-nums text-heading focus:outline-none focus:border-amber"
                            />
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </Panel>

      <Panel className="p-5 sticky bottom-4 shadow-2xl shadow-black/40">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            <div>
              <div className="text-xs font-semibold text-mist uppercase tracking-wide">
                Line Items
              </div>
              <div className="text-xl font-bold text-heading">
                {lines.length}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-mist uppercase tracking-wide">
                Total Units
              </div>
              <div className="text-xl font-bold text-heading">
                {formatNumber(totalQty)}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-mist uppercase tracking-wide">
                Total Order Value
              </div>
              <div className="text-xl font-bold text-amber">
                {formatCurrency(totalValue)}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-mist uppercase tracking-wide">
                Delivery Date
              </div>
              <div className="text-xl font-bold text-heading">
                {formatDate(deliveryDate)}
              </div>
              <div className="text-xs text-mist">
                {meta.leadTimeDays} Business Days →{' '}
                {meta.deliverToAlternate
                  ? meta.alternateLocation || 'alternate location'
                  : CONTRACT.deliveryLocationName}
              </div>
            </div>
          </div>
          <Button disabled={lines.length === 0} onClick={onGenerate}>
            Generate Order Confirmation →
          </Button>
        </div>
      </Panel>
    </div>
  )
}
