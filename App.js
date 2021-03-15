import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {YellowBox, Linking} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {navigationRef, navigate} from './RootNavigation';
import DrawerContent from './components/DrawerContent';
import StackNavigator from './navigation/StackNavigator';
import DeepLinking from 'react-native-deep-linking';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {
  console.log(store.getState());
  YellowBox.ignoreWarnings(['Setting a timer']);

  // add URL schemes to `DeepLinking`

  DeepLinking.addScheme('intootv://');
  // configure a route, in this case, a simple Settings route
  DeepLinking.addRoute('/walletconnect', (response) => {
    console.log('Go To Wallet Connect');
    console.log(response);
    navigate('GuestHome');
  });
  // manage Linking event listener with useEffect
  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);
  // evaluate every incoming URL
  const handleOpenURL = (event) => {
    DeepLinking.evaluateUrl(event.url);
  };

  Linking.getInitialURL()
    .then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WalletConnectProvider
          // uri="intootv://"
          bridge="https://bridge.walletconnect.org"
          clientMeta={{
            description: 'Connect with WalletConnect',
            url: 'https://walletconnect.org',
            icons: ['https://walletconnect.org/walletconnect-logo.png'],
            name: 'Intoo TV',
          }}
          redirectUrl="intootv://"
          storageOptions={{
            asyncStorage: AsyncStorage,
          }}>
          <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator
              drawerPosition="left"
              drawerType="front"
              drawerContent={(props) => <DrawerContent {...props} />}>
              <Drawer.Screen name="Home" component={StackNavigator} />
            </Drawer.Navigator>
          </NavigationContainer>
        </WalletConnectProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
