import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View, TouchableOpacity} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {logout} from '../actions/auth';
import {connect} from 'react-redux';
import {mapStateToProps} from '../tools/util';

const Item = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0,
        marginLeft: 20,
      }}>
      <Icon color="#000000" size={24} name={props.icon} />
      <TouchableOpacity onPress={props.onPress}>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            paddingVertical: 20,
            paddingLeft: 10,
          }}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const drawerItemOptions = {
  activeTintColor: '#000000',
  inactiveTintColor: '#000000',
  style: {
    alignSelf: 'flex-start',
  },
  labelStyle: {
    textDecorationLine: 'underline',
    fontSize: 18,
  },
};

function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{marginTop: 20}}>
        <Item
          text="Home"
          icon="home"
          onPress={() => props.navigation.navigate('GuestHome')}
        />
        <Item
          text="XP Market"
          icon="storefront"
          onPress={() => props.navigation.navigate('XpMarket')}
        />
        <Item
          text="The Cabin"
          icon="videocam"
          onPress={() => props.navigation.navigate('XpCabin')}
        />
        <Item
          text="Store"
          icon="payments"
          onPress={() => props.navigation.navigate('Store')}
        />
        <Item
          text="Notifications"
          icon="notifications"
          onPress={() => props.navigation.navigate('GuestHome')}
        />
        <Item
          text="Settings"
          icon="settings"
          onPress={() => props.navigation.navigate('GuestHome')}
        />
        <Item
          text="Switch view"
          icon="swap-horiz"
          onPress={() => props.navigation.navigate('Option')}
        />
        <Item
          text="Log out"
          icon="exit-to-app"
          onPress={() => props.logout()}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default connect(mapStateToProps, {logout})(DrawerContent);
