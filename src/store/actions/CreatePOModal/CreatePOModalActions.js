import moment from 'moment';

import {
  ON_NAME_CHANGE,
  ON_RFP_CHANGE,
  ON_RFP_DEADLINE_CHANGE,
  ON_BID_TYPE_CHANGE,
  ON_SELLERS_ADDRESSES_CHANGE,
  ON_SEND_PO_BEGIN,
  ON_SEND_PO_SUCCESS,
  ON_SEND_PO_FAILURE,
  CLEAR_PO,
} from '../';
import Web3Service from '../../../utils/Web3Service';
import {
  ProcurementManagementABI,
  ProcurementManagementAddress,
} from '../../../assets/data/contracts';

const onNameChange = name => ({
  type: ON_NAME_CHANGE,
  payload: { name },
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

const onSendPOBegin = () => ({
  type: ON_SEND_PO_BEGIN,
});

const onSendPOSuccess = result => ({
  type: ON_SEND_PO_SUCCESS,
  payload: { result },
});

const onSendPOFailure = error => ({
  type: ON_SEND_PO_FAILURE,
  payload: { error },
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

const clearPO = () => ({
  type: CLEAR_PO,
});

const sendPO = (
  name,
  buyerAddress,
  rfp,
  rfpDeadline,
  bidType,
  sellersAddresses
) => {
  return async dispatch => {
    dispatch(onSendPOBegin());

    try {
      const web3 = new Web3Service();
      const PMContract = new web3.eth.Contract(ProcurementManagementABI);
      PMContract.address = ProcurementManagementAddress;
      const tx = await PMContract.methods
        .createPurchaseOrder(
          name,
          buyerAddress,
          rfp,
          moment(rfpDeadline).format('YYYY-MM-DD hh:mm a'),
          bidType,
          sellersAddresses
        )
        .send({ from: buyerAddress, gas: 3000000 });
      tx.gasUsed = web3.utils.hexToNumberString(tx.gasUsed);
      dispatch(onSendPOSuccess(tx));
    } catch (error) {
      dispatch(onSendPOFailure(error));
    }
  };
};

export {
  onNameChange,
  onRfpChange,
  onRfpDeadlineChange,
  onBidTypeChange,
  onSellersAddressesChange,
  sendPO,
  clearPO,
};
