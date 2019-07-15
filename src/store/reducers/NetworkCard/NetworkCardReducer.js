import {
  GET_NETWORK_INFO_BEGIN,
  GET_NETWORK_INFO_SUCCESS,
  GET_NETWORK_INFO_FAILURE,
} from '../../actions';

const initialState = {
  loading: false,
  networkId: null,
  networkType: null,
  isListening: null,
  peerCount: null,
  error: null,
};

const networkCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NETWORK_INFO_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_NETWORK_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        networkId: action.payload.result.networkId,
        networkType: action.payload.result.networkType,
        isListening: action.payload.result.isListening,
        peerCount: action.payload.result.peerCount,
      };
    case GET_NETWORK_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default networkCardReducer;
