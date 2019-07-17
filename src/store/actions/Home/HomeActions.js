import _ from 'lodash';

import Web3Service from '../../../utils/Web3Service';
import {
  GET_NETWORK_INFO_BEGIN,
  GET_NETWORK_INFO_SUCCESS,
  GET_NETWORK_INFO_FAILURE,
  GET_BLOCKCHAIN_INFO_BEGIN,
  GET_BLOCKCHAIN_INFO_SUCCESS,
  GET_BLOCKCHAIN_INFO_FAILURE,
} from '../';

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

const getBlockchainInfoBegin = () => ({
  type: GET_BLOCKCHAIN_INFO_BEGIN,
});

const getBlockchainInfoSuccess = result => ({
  type: GET_BLOCKCHAIN_INFO_SUCCESS,
  payload: { result },
});

const getBlockchainInfoFailure = error => ({
  type: GET_BLOCKCHAIN_INFO_FAILURE,
  payload: { error },
});

const getNetworkInfo = () => {
  return async dispatch => {
    dispatch(getNetworkInfoBegin());

    try {
      const web3 = new Web3Service();
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

const getBlockchainInfo = () => {
  return async dispatch => {
    dispatch(getBlockchainInfoBegin());

    try {
      const web3 = new Web3Service();
      const currentBlock = await web3.eth.getBlockNumber();
      const accounts = await web3.eth.getAccounts();
      const coinbase = await web3.eth.getCoinbase();
      const isMining = await web3.eth.isMining();
      const hashRate = await web3.eth.getHashrate();
      const gasPrice = await web3.eth.getGasPrice();
      dispatch(
        getBlockchainInfoSuccess({
          currentBlock,
          accounts,
          coinbase,
          isMining,
          hashRate,
          gasPrice,
        })
      );
    } catch (error) {
      dispatch(getBlockchainInfoFailure(error));
    }
  };
};

export { getNetworkInfo, getBlockchainInfo };
