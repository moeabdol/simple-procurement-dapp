import {
  ON_BUYER_ADDRESS_CHANGE,
  ON_RFP_CHANGE,
  ON_RFP_DEADLINE_CHANGE,
  ON_BID_TYPE_CHANGE,
  ON_SELLERS_ADDRESSES_CHANGE,
} from '../';

const onBuyerAddressChange = buyerAddress => ({
  type: ON_BUYER_ADDRESS_CHANGE,
  payload: { buyerAddress },
});

const onRfpChange = rfp => ({
  type: ON_RFP_CHANGE,
  payload: { rfp },
});

const onRfpDeadlineChange = rfpDeadline => ({
  type: ON_RFP_DEADLINE_CHANGE,
  payload: { rfpDeadline },
});

const onBidTypeChange = bidType => ({
  type: ON_BID_TYPE_CHANGE,
  payload: { bidType },
});

const onSellersAddressesChange = sellers => {
  const sellersAddresses = [];
  sellers.forEach(s => {
    if (s.selected) sellersAddresses.push(s.address);
  });
  return {
    type: ON_SELLERS_ADDRESSES_CHANGE,
    payload: { sellersAddresses },
  };
};

export {
  onBuyerAddressChange,
  onRfpChange,
  onRfpDeadlineChange,
  onBidTypeChange,
  onSellersAddressesChange,
};
