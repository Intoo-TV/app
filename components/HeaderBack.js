import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function Header(props) {
  const {navigation, name} = props;
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back" size={30}></Icon>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            marginLeft: '5%',
            color: '#000',
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: '5%',
  },
});
