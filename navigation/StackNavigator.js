import _Home from '../screens/_Home';
import Login from '../screens/Login';
import Budget from '../screens/Budget';
import CreateProfile from '../screens/CreateProfile';
import CreateRequest from '../screens/CreateRequest';
import ExpLive from '../screens/ExpLive';
import GuestHome from '../screens/GuestHome';
import HostHome from '../screens/HostHome';
import Option from '../screens/Option';
import ProfileComplete from '../screens/ProfileComplete';
import Register from '../screens/Register';
import RequestCalendar from '../screens/RequestCalendar';
import Reset from '../screens/Reset';
import Splash from '../screens/Splash';
import Success from '../screens/Success';
import XpCabin from '../screens/XpCabin';
import XpCalendar from '../screens/XpCalendar';
import XpDetails from '../screens/XpDetails';
import XpMarket from '../screens/XpMarket';
import Store from '../screens/Store';
import Broadcast from '../screens/Broadcast';
import Stream from '../screens/Stream';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
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
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="XpCabin" component={XpCabin} />
      <Stack.Screen name="XpCalendar" component={XpCalendar} />
      <Stack.Screen name="XpDetails" component={XpDetails} />
      <Stack.Screen name="XpMarket" component={XpMarket} />
      <Stack.Screen name="Broadcast" component={Broadcast} />
      <Stack.Screen name="Stream" component={Stream} />
    </Stack.Navigator>
  );
}
