import {
  GET_BUYER_POS_BEGIN,
  GET_BUYER_POS_SUCCESS,
  GET_BUYER_POS_FAILURE,
  GET_SELLER_POS_BEGIN,
  GET_SELLER_POS_SUCCESS,
  GET_SELLER_POS_FAILURE,
} from '../../actions';

const initialState = {
  loading: false,
  result: null,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUYER_POS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_BUYER_POS_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload.result,
      };
    case GET_BUYER_POS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case GET_SELLER_POS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_SELLER_POS_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload.result,
      };
    case GET_SELLER_POS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default profileReducer;
