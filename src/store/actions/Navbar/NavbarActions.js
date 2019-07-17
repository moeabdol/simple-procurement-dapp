import { SET_DEFAULT_ACCOUNT_SUCCESS, SET_DEFAULT_ACCOUNT_FAILURE } from '../';
import Web3Servcie from '../../../utils/Web3Service';

const setDefaultAccountSuccess = result => ({
  type: SET_DEFAULT_ACCOUNT_SUCCESS,
  payload: { result },
});

const setDefaultAccountFailure = error => ({
  type: SET_DEFAULT_ACCOUNT_FAILURE,
  payload: { error },
});

const setDefaultAccount = account => {
  return async dispatch => {
    try {
      const web3 = new Web3Servcie();
      web3.defaultAccount = account.address;
      dispatch(setDefaultAccountSuccess(account));
    } catch (error) {
      dispatch(setDefaultAccountFailure(error));
    }
  };
};

export { setDefaultAccount };
