import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

export default function TinderCard({item}) {
  return (
    <View style={{alignSelf: 'center'}}>
      <View
        style={{
          borderColor: '#000',
          borderWidth: 1,
          borderRadius: 10,
          alignSelf: 'center',
        }}>
        <View
          style={{
            borderRadius: 10,
            width: 325,
            paddingBottom: 10,
            marginLeft: 0,
            marginRight: 10,
            elevation: 3,
            borderColor: '#000',
            borderWidth: 0.1,
            shadowColor: '#000',
            shadowRadius: 30,
            backgroundColor: '#FFF',
            shadowOffset: {width: 50, height: 50},
            shadowOpacity: 0.7,
            alignSelf: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/alex.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginTop: '5%',
                marginLeft: '5%',
                borderColor: '#000',
                borderWidth: 1,
              }}></Image>
            <Text
              style={{
                fontSize: 30,
                marginLeft: 10,
                marginTop: '15%',
                color: '#000',
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
          </View>

          <Text
            style={{
              marginLeft: '5%',
              marginTop: '5%',
              color: '#36A9E1',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {item.text}
          </Text>
          <Text
            style={{
              marginLeft: '5%',
              marginTop: '5%',
              color: '#000',
              fontSize: 15,
              width: '90%',
            }}>
            {item.description}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: '5%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                color: '#000',
                fontWeight: 'bold',
                padding: '5%',
              }}>
              #Label
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                color: '#000',
                fontWeight: 'bold',
                padding: '5%',
              }}>
              #Label
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                color: '#000',
                fontWeight: 'bold',
                padding: '5%',
              }}>
              #Label
            </Text>
          </View>

          <Icon
            name="database"
            size={30}
            color={'#000'}
            style={{alignSelf: 'center', marginTop: '10%'}}></Icon>
          <Text
            style={{
              fontSize: 30,
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            5 XP
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
