import {
  ON_RFP_CHANGE,
  ON_RFP_DEADLINE_CHANGE,
  ON_BID_TYPE_CHANGE,
  ON_SELLERS_ADDRESSES_CHANGE,
  ON_SEND_PO_BEGIN,
  ON_SEND_PO_SUCCESS,
  ON_SEND_PO_FAILURE,
  CLEAR_PO,
} from '../../actions';

const initialState = {
  rfp: '',
  rfpDeadline: new Date(),
  bidType: 'public',
  sellersAddresses: [],
  loading: false,
  result: null,
  error: null,
};

const createPOModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_RFP_CHANGE:
      return {
        ...state,
        rfp: action.payload.rfp,
      };
    case ON_RFP_DEADLINE_CHANGE:
      return {
        ...state,
        rfpDeadline: action.payload.rfpDeadline,
      };
    case ON_BID_TYPE_CHANGE:
      return {
        ...state,
        bidType: action.payload.bidType,
      };
    case ON_SELLERS_ADDRESSES_CHANGE:
      return {
        ...state,
        sellersAddresses: action.payload.sellersAddresses,
      };
    case ON_SEND_PO_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ON_SEND_PO_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload.result,
      };
    case ON_SEND_PO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_PO:
      return initialState;
    default:
      return state;
  }
};

export default createPOModalReducer;
