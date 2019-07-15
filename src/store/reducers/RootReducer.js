import { combineReducers } from 'redux';

import networkCardReducer from './NetworkCard/NetworkCardReducer';
import blockchainCardReducer from './BlockchainCard/BlockchainCardReducer';

const rootReducer = combineReducers({
  networkCardState: networkCardReducer,
  blockchainCardState: blockchainCardReducer,
});

export default rootReducer;
