export const ProcurementManagementABI = [
  {
    constant: false,
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'buyer', type: 'address' },
      { name: 'rfp', type: 'string' },
      { name: 'rfpDeadline', type: 'string' },
      { name: 'bidType', type: 'string' },
      { name: 'sellers', type: 'address[]' },
    ],
    name: 'createPurchaseOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getPurchaseOrders',
    outputs: [
      {
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'name', type: 'string' },
          { name: 'buyer', type: 'address' },
          { name: 'rfp', type: 'string' },
          { name: 'rfpDeadline', type: 'string' },
          { name: 'bidType', type: 'string' },
          { name: 'sellers', type: 'address[]' },
          { name: 'fulfilled', type: 'bool' },
          { name: 'winner', type: 'address' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'buyer', type: 'address' }],
    name: 'getPurchaseOrdersByBuyer',
    outputs: [
      {
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'name', type: 'string' },
          { name: 'buyer', type: 'address' },
          { name: 'rfp', type: 'string' },
          { name: 'rfpDeadline', type: 'string' },
          { name: 'bidType', type: 'string' },
          { name: 'sellers', type: 'address[]' },
          { name: 'fulfilled', type: 'bool' },
          { name: 'winner', type: 'address' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'seller', type: 'address' }],
    name: 'getPurchaseOrdersBySeller',
    outputs: [
      {
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'name', type: 'string' },
          { name: 'buyer', type: 'address' },
          { name: 'rfp', type: 'string' },
          { name: 'rfpDeadline', type: 'string' },
          { name: 'bidType', type: 'string' },
          { name: 'sellers', type: 'address[]' },
          { name: 'fulfilled', type: 'bool' },
          { name: 'winner', type: 'address' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'seller', type: 'address' },
      { name: 'poId', type: 'uint256' },
      { name: 'content', type: 'string' },
    ],
    name: 'createProposal',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const ProcurementManagementAddress =
  '0x0913CfA4B6FC51789d5F4E9e1f06D0644BF38D12';
