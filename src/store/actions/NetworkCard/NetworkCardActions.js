import _ from 'lodash';
import Web3 from 'web3';

import {
  GET_NETWORK_INFO_BEGIN,
  GET_NETWORK_INFO_SUCCESS,
  GET_NETWORK_INFO_FAILURE,
} from '../';

const RPC_URI = process.env.REACT_APP_RPC_URI;

const getNetworkInfoBegin = () => ({
  type: GET_NETWORK_INFO_BEGIN,
});

const getNetworkInfoSuccess = result => ({
  type: GET_NETWORK_INFO_SUCCESS,
  payload: { result },
});

const getNetworkInfoFailure = error => ({
  type: GET_NETWORK_INFO_FAILURE,
  payload: { error },
});

const getNetworkInfo = () => {
  return async dispatch => {
    dispatch(getNetworkInfoBegin());

    try {
      const web3 = new Web3(Web3.givenProvider || RPC_URI);
      const networkId = await web3.eth.net.getId();
      const networkType = await web3.eth.net.getNetworkType();
      const isListening = await web3.eth.net.isListening();
      const peerCount = await web3.eth.net.getPeerCount();
      dispatch(
        getNetworkInfoSuccess({
          networkId,
          networkType: _.capitalize(networkType),
          isListening,
          peerCount,
        })
      );
    } catch (error) {
      dispatch(getNetworkInfoFailure(error));
    }
  };
};

export { getNetworkInfo };
