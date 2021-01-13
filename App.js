import 'react-native-gesture-handler';
import React from 'react';

import {YellowBox} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './RootNavigation';
import _Home from './screens/_Home';
import Login from './screens/Login';

import Budget from './screens/Budget';
import CreateProfile from './screens/CreateProfile';
import CreateRequest from './screens/CreateRequest';
import ExpLive from './screens/ExpLive';
import GuestHome from './screens/GuestHome';
import HostHome from './screens/HostHome';
import Option from './screens/Option';
import ProfileComplete from './screens/ProfileComplete';
import Register from './screens/Register';
import RequestCalendar from './screens/RequestCalendar';
import Reset from './screens/Reset';
import Splash from './screens/Splash';
import Success from './screens/Success';
import XpCabin from './screens/XpCabin';
import XpCalendar from './screens/XpCalendar';
import XpDetails from './screens/XpDetails';
import XpMarket from './screens/XpMarket';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  console.log(store.getState());
  YellowBox.ignoreWarnings(['Setting a timer']);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="Login"
            headerMode="none"
            screenOptions={{cardStyle: {backgroundColor: 'white'}}}>
            <Stack.Screen name="Home" component={_Home} />
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen name="Budget" component={Budget} />
            <Stack.Screen name="CreateProfile" component={CreateProfile} />
            <Stack.Screen name="CreateRequest" component={CreateRequest} />
            <Stack.Screen name="ExpLive" component={ExpLive} />
            <Stack.Screen name="GuestHome" component={GuestHome} />
            <Stack.Screen name="HostHome" component={HostHome} />
            <Stack.Screen name="Option" component={Option} />
            <Stack.Screen name="ProfileComplete" component={ProfileComplete} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RequestCalendar" component={RequestCalendar} />
            <Stack.Screen name="Reset" component={Reset} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Success" component={Success} />
            <Stack.Screen name="XpCabin" component={XpCabin} />
            <Stack.Screen name="XpCalendar" component={XpCalendar} />
            <Stack.Screen name="XpDetails" component={XpDetails} />
            <Stack.Screen name="XpMarket" component={XpMarket} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
