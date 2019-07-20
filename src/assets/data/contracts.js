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
          { name: 'name', type: 'string' },
          { name: 'buyer', type: 'address' },
          { name: 'rfp', type: 'string' },
          { name: 'rfpDeadline', type: 'string' },
          { name: 'bidType', type: 'string' },
          { name: 'sellers', type: 'address[]' },
          { name: 'fulfilled', type: 'bool' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export const ProcurementManagementAddress =
  '0x0913CfA4B6FC51789d5F4E9e1f06D0644BF38D12';
