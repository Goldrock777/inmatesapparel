import {
  BACKORDER_PATHS,
  CONTRACT,
  DELIVERY_REQUIREMENTS,
  LEAD_TIME_SCORE,
  RETURN_REQUIREMENTS,
} from '../data/contract'
import { Kicker, Panel, SectionHeading, Tag } from './ui'

export function FulfillmentSpec() {
  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="SA §5 - Delivery"
        title="Fulfillment &amp; Delivery Specification"
        description="Every constraint below is pulled directly from the Standing Arrangement (Appendix A) and RSA 6000086831. This platform's Order Builder and Order Confirmation are built to satisfy each item on this sheet."
      />

      <Panel className="p-5">
        <Kicker>Delivery Location</Kicker>
        <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm">
          <div>
            <div className="text-heading font-mono">
              {CONTRACT.deliveryLocation}
            </div>
            <div className="text-mist text-xs mt-1">
              {CONTRACT.deliveryLocationName}
            </div>
          </div>
          <div>
            <div className="text-heading">{CONTRACT.businessHours}</div>
            <div className="text-mist text-xs mt-1">
              Skid appointment line: {CONTRACT.receivingPhone}
            </div>
          </div>
        </div>
      </Panel>

      <div>
        <Kicker>SA §5.2 - Packaging &amp; Delivery Requirements</Kicker>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {DELIVERY_REQUIREMENTS.map((req) => (
            <Panel key={req.label} className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-heading text-sm font-semibold">
                  {req.label}
                </div>
                <Tag tone="ok">enforced</Tag>
              </div>
              <p className="text-xs text-body/80 mt-2 leading-relaxed">
                {req.detail}
              </p>
            </Panel>
          ))}
        </div>
      </div>

      <div>
        <Kicker>SA §7.3.1 / RSA §7.3 - Lead Time Scoring</Kicker>
        <Panel className="p-5 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-mist stamp text-[10px] border-b border-line">
                <th className="py-2 font-normal">Proposed Lead Time</th>
                <th className="py-2 font-normal text-right">
                  Evaluation Points
                </th>
              </tr>
            </thead>
            <tbody>
              {LEAD_TIME_SCORE.map((row) => (
                <tr key={row.range} className="border-b border-line/50">
                  <td className="py-2 font-mono text-body">{row.range}</td>
                  <td className="py-2 text-right font-mono text-heading">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-mist mt-3">
            The Order Builder's Lead Time field drives the computed Delivery
            Date shown on every Order and Order Confirmation.
          </p>
        </Panel>
      </div>

      <div>
        <Kicker>SA §4.7 - Partial Order &amp; Backorder Resolution</Kicker>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {BACKORDER_PATHS.map((path) => (
            <Panel key={path.code} className="p-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-amber text-xs border border-amber/50 w-6 h-6 grid place-items-center">
                  {path.code}
                </span>
                <div className="text-heading text-sm font-semibold">
                  {path.title}
                </div>
              </div>
              <p className="text-xs text-body/80 mt-2 leading-relaxed">
                {path.detail}
              </p>
            </Panel>
          ))}
        </div>
        <p className="text-xs text-mist mt-3">
          Contractor notifies the Province of a Backorder within two Business
          Days of receiving the Order; the Province selects the resolution
          path in its sole discretion.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Kicker>SA §6 - Returns (Contractor Error)</Kicker>
          <Panel className="p-4 mt-4">
            <ul className="space-y-2 text-xs text-body/80">
              {RETURN_REQUIREMENTS.contractorError.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red-bright">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
        <div>
          <Kicker>SA §6 - Returns (Province Error)</Kicker>
          <Panel className="p-4 mt-4">
            <ul className="space-y-2 text-xs text-body/80">
              {RETURN_REQUIREMENTS.provinceError.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-amber">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <div>
        <Kicker>SA §8.4-8.5 - Recall Procedure</Kicker>
        <Panel className="p-5 mt-4">
          <ol className="space-y-2 text-sm text-body/90 list-decimal list-inside">
            <li>
              Recall procedures maintained internally and with all
              Subcontractors / manufacturers for rapid removal of affected
              Goods from distribution and use.
            </li>
            <li>
              On a Recall, the Province is notified{' '}
              <span className="text-amber">immediately</span> with removal
              instructions for the relevant Goods.
            </li>
            <li>
              Returns tampering safeguards (SA §6.3) prevent recalled or
              tampered stock from re-entering the distribution chain.
            </li>
          </ol>
        </Panel>
      </div>
    </div>
  )
}
