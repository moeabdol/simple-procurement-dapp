import Web3 from 'web3';

import {
  GET_BLOCKCHAIN_INFO_BEGIN,
  GET_BLOCKCHAIN_INFO_SUCCESS,
  GET_BLOCKCHAIN_INFO_FAILURE,
} from '../';

const RPC_URI = process.env.REACT_APP_RPC_URI;

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

const getBlockchainInfo = () => {
  return async dispatch => {
    dispatch(getBlockchainInfoBegin);

    try {
      const web3 = new Web3(RPC_URI);
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

export { getBlockchainInfo };
