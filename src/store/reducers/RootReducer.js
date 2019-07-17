import { combineReducers } from 'redux';

import homeReducer from './Home/HomeReducer';
import navbarReducer from './Navbar/NavbarReducer';

const rootReducer = combineReducers({
  homeState: homeReducer,
  navbarState: navbarReducer,
});

export default rootReducer;
