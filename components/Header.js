import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Header(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Icon name="bars" size={20} color={'#000'} />
      </TouchableOpacity>
      <Icon name="home" size={20} style={{marginLeft: 25, color: '#000'}} />
      <Text
        style={{
          fontSize: 20,
          marginLeft: 5,
          color: '#000',
          fontWeight: 'bold',
        }}>
        Home
      </Text>
      <Icon name="bell" size={20} color={'#000'} style={{marginLeft: '30%'}} />
      <Icon
        name="database"
        size={20}
        color={'#000'}
        style={{marginLeft: '5%'}}
      />
      <Text style={{fontSize: 20, marginLeft: 5, color: '#000'}}>500</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: '5%',
  },
});
