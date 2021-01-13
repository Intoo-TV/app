import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import Card from './card';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
  },
});

const CardList = ({itemList}) => (
  <View style={styles.container}>
    <FlatList
      initialNumToRender={10}
      data={itemList}
      renderItem={({item}) => <Card name={item.name} icon={item.icon} />}
    />
  </View>
);

export default CardList;
