import {
  GET_BLOCKCHAIN_INFO_BEGIN,
  GET_BLOCKCHAIN_INFO_SUCCESS,
  GET_BLOCKCHAIN_INFO_FAILURE,
} from '../../actions';

const initialState = {
  loading: false,
  currentBlock: null,
  accounts: null,
  coinbase: null,
  isMining: null,
  hashRate: null,
  gasPrice: null,
  error: null,
};

const blockchainCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOCKCHAIN_INFO_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_BLOCKCHAIN_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBlock: action.payload.result.currentBlock,
        accounts: action.payload.result.accounts,
        coinbase: action.payload.result.coinbase,
        isMining: action.payload.result.isMining,
        hashRate: action.payload.result.hashRate,
        gasPrice: action.payload.result.gasPrice,
      };
    case GET_BLOCKCHAIN_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default blockchainCardReducer;
