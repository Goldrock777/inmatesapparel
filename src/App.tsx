import { useEffect, useMemo, useState } from 'react'
import { Header, type TabKey } from './components/Header'
import { Cover } from './components/Cover'
import { SecurePortalLogin } from './components/SecurePortalLogin'
import { OrderBuilder } from './components/OrderBuilder'
import { SlipTab } from './components/SlipTab'
import { FulfillmentSpec } from './components/FulfillmentSpec'
import { PricingSheet } from './components/PricingSheet'
import { CATALOG, type CatalogItem } from './data/catalog'
import { addBusinessDays } from './lib/businessDays'
import { generateLotNumber, generateOrderNumber, itemKey } from './lib/ids'
import type { OrderMeta } from './types'

const STORAGE_KEY = 'ia-order-system-v1'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function defaultMeta(): OrderMeta {
  const orderDate = todayIso()
  const leadTimeDays = 3
  const deliveryDate = addBusinessDays(new Date(orderDate), leadTimeDays)
  const expiry = new Date(deliveryDate)
  expiry.setFullYear(expiry.getFullYear() + 2)
  return {
    orderNumber: generateOrderNumber(new Date(), 1),
    lotNumber: generateLotNumber(new Date(), 1),
    orderDate,
    issuerName: '',
    issuerTitle: '',
    deliverToAlternate: false,
    alternateLocation: '',
    leadTimeDays,
    expiryDate: expiry.toISOString().slice(0, 10),
    notes: '',
    isPartialOrder: false,
    backorderProposedDate: '',
  }
}

interface PersistedState {
  companyName: string
  manufacturingNote: string
  cart: [string, number][]
  meta: OrderMeta
}

function loadPersisted(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PersistedState
  } catch {
    return null
  }
}

function App() {
  const persisted = useMemo(loadPersisted, [])
  const [tab, setTab] = useState<TabKey>('cover')
  const [companyName, setCompanyName] = useState(persisted?.companyName ?? '')
  const [manufacturingNote, setManufacturingNote] = useState(
    persisted?.manufacturingNote ?? '',
  )
  const [cart, setCart] = useState<Map<string, number>>(
    () => new Map(persisted?.cart ?? []),
  )
  const [meta, setMeta] = useState<OrderMeta>(
    () => persisted?.meta ?? defaultMeta(),
  )

  useEffect(() => {
    const state: PersistedState = {
      companyName,
      manufacturingNote,
      cart: Array.from(cart.entries()),
      meta,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [companyName, manufacturingNote, cart, meta])

  function handleQtyChange(item: CatalogItem, qty: number) {
    setCart((prev) => {
      const next = new Map(prev)
      const key = itemKey(item)
      if (qty <= 0) {
        next.delete(key)
      } else {
        next.set(key, qty)
      }
      return next
    })
  }

  function handleMetaChange(patch: Partial<OrderMeta>) {
    setMeta((prev) => ({ ...prev, ...patch }))
  }

  function handleGenerate() {
    setTab('slip')
  }

  function handleAnchor(id: string) {
    setTab('cover')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }

  const lines = useMemo(
    () =>
      CATALOG.filter((item) => (cart.get(itemKey(item)) ?? 0) > 0).map(
        (item) => ({ item, qty: cart.get(itemKey(item)) ?? 0 }),
      ),
    [cart],
  )

  return (
    <div className="min-h-screen">
      <Header
        active={tab}
        onChange={setTab}
        onAnchor={handleAnchor}
        companyName={companyName}
        onCompanyNameChange={setCompanyName}
      />
      <main
        className={
          tab === 'cover' || tab === 'login'
            ? ''
            : 'max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12'
        }
      >
        {tab === 'cover' && (
          <Cover
            companyName={companyName}
            manufacturingNote={manufacturingNote}
            onManufacturingNoteChange={setManufacturingNote}
            leadTimeDays={meta.leadTimeDays}
            onNavigate={setTab}
          />
        )}
        {tab === 'login' && (
          <SecurePortalLogin
            companyName={companyName}
            onSignIn={() => setTab('builder')}
          />
        )}
        {tab === 'builder' && (
          <OrderBuilder
            cart={cart}
            onQtyChange={handleQtyChange}
            meta={meta}
            onMetaChange={handleMetaChange}
            onGenerate={handleGenerate}
          />
        )}
        {tab === 'slip' && (
          <SlipTab
            lines={lines}
            meta={meta}
            onMetaChange={handleMetaChange}
            companyName={companyName}
            onBackToBuilder={() => setTab('builder')}
          />
        )}
        {tab === 'fulfillment' && <FulfillmentSpec />}
        {tab === 'pricing' && <PricingSheet companyName={companyName} />}
      </main>
      {tab !== 'cover' && tab !== 'login' && (
        <footer className="border-t border-line mt-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 text-xs text-dim font-tech tracking-wide">
            RSA 6000086831 · Product Distribution Centre · Ministry of
            Citizens&apos; Services
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
