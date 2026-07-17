# Inmate Apparel — Order Fulfillment System

A proposal exhibit built for RSA 6000086831 (Product Distribution Centre,
Ministry of Citizens' Services) — the Standing Arrangement for BC
Corrections inmate apparel (t-shirts, sweatshirts, sweatpants).

This is a client-side order intake and fulfillment-compliance demonstration,
not a production procurement system. There is no backend and no payment
processing — it exists to show, concretely, how order intake and the
required order-confirmation paperwork would work against the actual Standing
Arrangement terms.

## What's here

- **Proposal** — cover/overview of the system and contract context.
- **Order Builder** — select Goods against the real PDC product codes
  (from the Procurement Decision Note) and quantities, with the mandatory
  Order fields from SA §4.6 and a computed Delivery Date from Lead Time.
- **Order Confirmation** — generates the advance shipping notice / packing
  slip required by SA §4.3 and §5.2(h), downloadable as PDF or JPEG
  (client-side, via `html2canvas` + `jsPDF`).
- **Fulfillment Spec** — a reference sheet of the SA's delivery, packaging,
  backorder, returns, and recall requirements (§4.7, §5.2, §6, §8).
- **Pricing Schedule** — the proposed Appendix B1 pricing schedule against
  estimated annual volumes, also exportable as PDF/JPEG.

All order and pricing data live in `src/data/catalog.ts` and
`src/data/contract.ts`, sourced from the RSA, the Standing Arrangement, and
the Procurement Decision Note.

## Development

```bash
npm install
npm run dev
```

```bash
npm run build   # type-check + production build
npm run lint    # oxlint
```
