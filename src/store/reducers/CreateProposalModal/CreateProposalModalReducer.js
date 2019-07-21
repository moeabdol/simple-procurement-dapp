import {
  ON_PROPOSAL_CHANGE,
  ON_SEND_PROPOSAL_BEGIN,
  ON_SEND_PROPOSAL_SUCCESS,
  ON_SEND_PROPOSAL_FAILURE,
} from '../../actions';

const initialState = {
  proposal: '',
  loading: false,
  result: null,
  error: null,
};

const createProposalModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_PROPOSAL_CHANGE:
      return {
        ...state,
        proposal: action.payload.proposal,
      };
    case ON_SEND_PROPOSAL_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ON_SEND_PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload.result,
      };
    case ON_SEND_PROPOSAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default createProposalModalReducer;
