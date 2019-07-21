import { combineReducers } from 'redux';

import homeReducer from './Home/HomeReducer';
import navbarReducer from './Navbar/NavbarReducer';
import createPOModalReducer from './CreatePOModal/CreatePOModalReducer';
import profileReducer from './Profile/ProfileReducer';
import ordersReducer from './Orders/OrdersReducer';

const rootReducer = combineReducers({
  homeState: homeReducer,
  navbarState: navbarReducer,
  createPOModalState: createPOModalReducer,
  profileState: profileReducer,
  ordersState: ordersReducer,
});

export default rootReducer;
