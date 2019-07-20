import { combineReducers } from 'redux';

import homeReducer from './Home/HomeReducer';
import navbarReducer from './Navbar/NavbarReducer';
import createPOModalReducer from './CreatePOModal/CreatePOModalReducer';
import profileReducer from './Profile/ProfileReducer';

const rootReducer = combineReducers({
  homeState: homeReducer,
  navbarState: navbarReducer,
  createPOModalState: createPOModalReducer,
  profileState: profileReducer,
});

export default rootReducer;
