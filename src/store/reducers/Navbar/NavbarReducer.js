import {
  SET_DEFAULT_ACCOUNT_SUCCESS,
  SET_DEFAULT_ACCOUNT_FAILURE,
} from '../../actions';

const initialState = {
  defaultAccount: null,
  error: null,
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_ACCOUNT_SUCCESS:
      return {
        ...state,
        defaultAccount: action.payload.result,
      };
    case SET_DEFAULT_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default navbarReducer;
