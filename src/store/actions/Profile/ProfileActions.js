import {
  GET_BUYER_POS_BEGIN,
  GET_BUYER_POS_SUCCESS,
  GET_BUYER_POS_FAILURE,
  GET_SELLER_POS_BEGIN,
  GET_SELLER_POS_SUCCESS,
  GET_SELLER_POS_FAILURE,
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

const getSellerPOsBegin = () => ({
  type: GET_SELLER_POS_BEGIN,
});

const getSellerPOsSuccess = result => ({
  type: GET_SELLER_POS_SUCCESS,
  payload: { result },
});

const getSellerPOsFailure = error => ({
  type: GET_SELLER_POS_FAILURE,
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

const getSellerPOs = sellerAddress => {
  return async dispatch => {
    dispatch(getSellerPOsBegin());

    try {
      const web3 = new Web3Service();
      const PMContract = new web3.eth.Contract(ProcurementManagementABI);
      PMContract.address = ProcurementManagementAddress;
      const res = await PMContract.methods
        .getPurchaseOrdersBySeller(sellerAddress)
        .call();
      dispatch(getSellerPOsSuccess(res));
    } catch (error) {
      dispatch(getSellerPOsFailure(error));
    }
  };
};

export { getBuyerPOs, getSellerPOs };
