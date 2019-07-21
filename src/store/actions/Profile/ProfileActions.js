import {
  GET_BUYER_POS_BEGIN,
  GET_BUYER_POS_SUCCESS,
  GET_BUYER_POS_FAILURE,
} from '../';
import Web3Service from '../../../utils/Web3Service';
import {
  ProcurementManagementABI,
  ProcurementManagementAddress,
} from '../../../assets/data/contracts';

const getBuyerPOsBegin = () => ({
  type: GET_BUYER_POS_BEGIN,
});

const getBuyerPOsSuccess = result => ({
  type: GET_BUYER_POS_SUCCESS,
  payload: { result },
});

const getBuyerPOsFailure = error => ({
  type: GET_BUYER_POS_FAILURE,
  payload: { error },
});

const getBuyerPOs = buyerAddress => {
  return async dispatch => {
    dispatch(getBuyerPOsBegin());

    try {
      const web3 = new Web3Service();
      const PMContract = new web3.eth.Contract(ProcurementManagementABI);
      PMContract.address = ProcurementManagementAddress;
      const res = await PMContract.methods
        .getPurchaseOrdersByBuyer(buyerAddress)
        .call();
      dispatch(getBuyerPOsSuccess(res));
    } catch (error) {
      dispatch(getBuyerPOsFailure(error));
    }
  };
};

export { getBuyerPOs };
