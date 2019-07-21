import { GET_POS_BEGIN, GET_POS_SUCCESS, GET_POS_FAILURE } from '../../actions';

const initialState = {
  loading: false,
  result: null,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_POS_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload.result,
      };
    case GET_POS_FAILURE:
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
