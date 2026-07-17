export const CONTRACT = {
  rsaNumber: '6000086831',
  rsaIssueDate: 'July 16, 2026',
  closingDateTime: 'August 6, 2026, 2:00 PM PT',
  deliveryLocation: '2370 United Boulevard, Coquitlam, BC, V3K 6A3',
  deliveryLocationName: 'PDC Warehouse - Product Distribution Centre',
  termStart: 'October 1, 2026',
  termEnd: 'September 30, 2028',
  extensionOptions: '5 additional one-year periods',
  estimatedTotalValue: '$1,200,000.00 CAD',
  avgAnnualSpend: '$207,646.71',
  avgMonthlySpend: '$17,303.89',
  businessHours: '0800 - 1500 hours, Business Days only',
  receivingPhone: '778-572-2630',
  pdcPhone: '604-927-2285',
}

export const ORDER_REQUIREMENTS = [
  'Reference to the Standing Arrangement (RSA / SA number)',
  'Name and title of the PDC employee issuing the Order',
  'The Goods and quantity of Goods being ordered',
]

export const DELIVERY_REQUIREMENTS = [
  {
    label: 'Delivery window',
    detail: 'All deliveries within Business Hours (0800-1500) on a Business Day only.',
  },
  {
    label: 'Appointment required',
    detail: `Deliveries exceeding 1 skid require an appointment - call PDC Receiving at ${CONTRACT.receivingPhone}.`,
  },
  {
    label: 'Dock-level trucks',
    detail: 'PDC dock heights are 3 ft. 6 in. and 4 ft. 2 in. - trucks must be dock level.',
  },
  {
    label: 'Carton weight',
    detail: 'Individual cartons must weigh no more than 50 lbs and be constructed/packed to resist collapse when stacked.',
  },
  {
    label: 'Skid height',
    detail: 'Maximum skid height is less than 80 inches.',
  },
  {
    label: 'Stretch wrap',
    detail: 'Tension adequately adjusted to stabilize load without damaging Goods (e.g., 3 wraps bottom, 4 wraps top).',
  },
  {
    label: 'Carton labeling',
    detail: "All boxes labeled in a visible exterior location with the Contractor's name and the Order number.",
  },
  {
    label: 'Packing slip',
    detail: 'Present and easily accessible; must identify Order number, lot number, Contractor product code, quantity shipped, expiry date (if applicable), and PDC product code.',
  },
]

export const LEAD_TIME_SCORE = [
  { range: '0 - 4 Business Days', points: 10 },
  { range: '5 - 8 Business Days', points: 8 },
  { range: '9 - 12 Business Days', points: 6 },
  { range: '13 - 16 Business Days', points: 4 },
  { range: '17 - 20 Business Days', points: 2 },
  { range: '21+ Business Days', points: 0 },
]

export const BACKORDER_PATHS = [
  {
    code: 'A',
    title: 'Cancel entire Order',
    detail: 'Province cancels the full Order and sources Goods by any other means, or takes no action.',
  },
  {
    code: 'B',
    title: 'Accept Partial Order only',
    detail: 'Partial Order proceeds on original terms; Backorder portion cancelled or sourced elsewhere.',
  },
  {
    code: 'C',
    title: 'Accept Partial Order + Backorder',
    detail: 'Both proceed on original terms, except the Backorder Delivery Date follows the Contractor-proposed date.',
  },
  {
    code: 'D',
    title: 'Accept Partial Order + negotiate alternates',
    detail: 'Partial Order proceeds; Backorder replaced with negotiated alternate goods on the same terms.',
  },
]

export const RETURN_REQUIREMENTS = {
  contractorError: [
    'Return authorization number required on all returns',
    'All documentation (e.g., waybills) completed before pickup at the Delivery Location',
    'Courier pickup arranged by the Contractor',
    'All expenses are the Contractor\'s responsibility',
  ],
  provinceError: [
    'Contractor accepts the return despite Province error',
    'Restocking fee may apply (capped per Standing Arrangement)',
    'Return authorization number required',
    'Documentation completed by the Province before pickup',
    'Courier pickup arranged by the Province (unless otherwise agreed)',
    'Province pays courier costs to return Goods to the Contractor',
  ],
}
