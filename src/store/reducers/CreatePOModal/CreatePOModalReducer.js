import {
  ON_BUYER_ADDRESS_CHANGE,
  ON_RFP_CHANGE,
  ON_RFP_DEADLINE_CHANGE,
  ON_BID_TYPE_CHANGE,
  ON_SELLERS_ADDRESSES_CHANGE,
} from '../../actions';

const initialState = {
  buyerAddress: '',
  rfp: '',
  rfpDeadline: new Date(),
  bidType: 'public',
  sellersAddresses: [],
};

const createPOModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_BUYER_ADDRESS_CHANGE:
      return {
        ...state,
        buyerAddress: action.payload.buyerAddress,
      };
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
    default:
      return state;
  }
};

export default createPOModalReducer;
