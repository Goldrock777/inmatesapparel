import { useState } from 'react'
import { Button, Panel } from './ui'

export function SecurePortalLogin({
  companyName,
  onSignIn,
}: {
  companyName: string
  onSignIn: () => void
}) {
  const [username] = useState('kendra.green@gov.bc.ca')
  const [password] = useState('demo-2026')

  return (
    <div className="min-h-[calc(100vh-165px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <LockMark />
          <div className="text-heading font-semibold text-lg mt-4">
            PDC Ordering Portal
          </div>
          <p className="text-mist text-sm mt-1">
            Product Distribution Centre · placing an Order with{' '}
            {companyName || 'ApparelIQ'}
          </p>
        </div>

        <Panel className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSignIn()
            }}
          >
            <label className="text-xs font-semibold text-mist uppercase tracking-wide block mb-1">
              Government email
            </label>
            <input
              value={username}
              readOnly
              className="w-full bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading font-tech mb-4 focus:outline-none focus:border-amber"
            />

            <label className="text-xs font-semibold text-mist uppercase tracking-wide block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              readOnly
              className="w-full bg-panel-2 border border-line rounded-lg px-3 py-2 text-sm text-heading font-tech mb-2 focus:outline-none focus:border-amber"
            />
            <p className="text-xs text-dim mb-5">
              Demo credentials pre-filled for this walkthrough. A live
              deployment would authenticate real PDC staff logins.
            </p>

            <Button type="submit">Sign in →</Button>
          </form>
        </Panel>

        <div className="flex items-center justify-center gap-2 mt-5 text-dim text-xs font-tech">
          <LockIcon />
          Encrypted connection · Canadian data residency
        </div>
      </div>
    </div>
  )
}

function LockMark() {
  return (
    <div className="w-14 h-14 rounded-full bg-amber/10 border border-amber/30 flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect
          x="5"
          y="10"
          width="14"
          height="10"
          rx="2"
          stroke="#cda349"
          strokeWidth="1.6"
        />
        <path
          d="M8 10V7a4 4 0 0 1 8 0v3"
          stroke="#cda349"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  )
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}
