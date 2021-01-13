import {combineReducers} from 'redux';

import auth from './auth';
import profile from './profile';
import wallet from './wallet';

const rootReducer = combineReducers({
  auth,
  profile,
  wallet,
});

export default rootReducer;
