import { GET_POS_BEGIN, GET_POS_SUCCESS, GET_POS_FAILURE } from '../';
import Web3Service from '../../../utils/Web3Service';
import {
  ProcurementManagementABI,
  ProcurementManagementAddress,
} from '../../../assets/data/contracts';

const getPOsBegin = () => ({
  type: GET_POS_BEGIN,
});

const getPOsSuccess = result => ({
  type: GET_POS_SUCCESS,
  payload: { result },
});

const getPOsFailure = error => ({
  type: GET_POS_FAILURE,
  payload: { error },
});

const getPOs = () => {
  return async dispatch => {
    dispatch(getPOsBegin());

    try {
      const web3 = new Web3Service();
      const PMContract = new web3.eth.Contract(ProcurementManagementABI);
      PMContract.address = ProcurementManagementAddress;
      const res = await PMContract.methods.getPurchaseOrders().call();
      dispatch(getPOsSuccess(res));
    } catch (error) {
      dispatch(getPOsFailure(error));
    }
  };
};

export { getPOs };
