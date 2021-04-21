import {combineReducers} from 'redux';

import auth from './auth';
import profile from './profile';
import wallet from './wallet';
import upcomingExperiences from './upcomingExperiences';
import pastExperiences from './pastExperiences';
import newExperiences from './newExperiences';

const rootReducer = combineReducers({
  auth,
  profile,
  wallet,
  upcomingExperiences,
  pastExperiences,
  newExperiences,
});

export default rootReducer;
