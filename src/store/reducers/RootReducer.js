import { combineReducers } from 'redux';

import homeReducer from './Home/HomeReducer';
import navbarReducer from './Navbar/NavbarReducer';
import createPOModalReducer from './CreatePOModal/CreatePOModalReducer';

const rootReducer = combineReducers({
  homeState: homeReducer,
  navbarState: navbarReducer,
  createPOModalState: createPOModalReducer,
});

export default rootReducer;
