import 'react-native-gesture-handler';
import React from 'react';

import {YellowBox} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {navigationRef} from './RootNavigation';
import DrawerContent from './components/DrawerContent';
import StackNavigator from './navigation/StackNavigator';

const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {
  console.log(store.getState());
  YellowBox.ignoreWarnings(['Setting a timer']);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Drawer.Navigator
            drawerPosition="left"
            drawerType="front"
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={StackNavigator} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
