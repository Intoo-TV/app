import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: createSensitiveStorage({
    keychainService: 'Intoo',
    sharedPreferencesName: 'Intoo',
  }),
  stateReconciler: autoMergeLevel2,
  version: 1,
  debug: true,
  whitelist: [
    'auth',
    'profile',
    'wallet',
    'upcomingExperiences',
    'pastExperiences',
    'newExperiences',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer, applyMiddleware(thunk));

export let persistor = persistStore(store);
