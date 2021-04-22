import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import {navigate} from '../RootNavigation';
import {formatDateTime} from '../tools/util';

export default function HostPastExperienceCard({item}) {
  return (
    <View>
      <View
        style={{
          borderColor: '#000',
          borderWidth: 1,
          borderRadius: 10,
          width: 200,
          backgroundColor: '#000',
        }}>
        <View
          style={{
            borderRadius: 10,
            width: 200,
            paddingBottom: 10,
            marginLeft: 0,
            marginRight: 10,
            elevation: 3,
            borderColor: '#000',
            borderWidth: 0.1,
            shadowRadius: 30,
            backgroundColor: '#000',
            shadowOffset: {width: 50, height: 50},
            shadowColor: 'black',
            shadowOpacity: 0.7,
            minHeight: 300,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/alex.jpg')}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginTop: '5%',
                marginLeft: '5%',
                borderColor: '#000',
                borderWidth: 1,
              }}></Image>
            <Text
              style={{
                fontSize: 17.5,
                marginLeft: 10,
                marginTop: '10%',
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
            <Icon
              name="check"
              size={35}
              color={'#FFF'}
              style={{marginLeft: '5%', marginTop: 25}}></Icon>
          </View>

          <Text style={{marginLeft: '5%', marginTop: '5%', color: '#FFF'}}>
            {item.description}
          </Text>
          <View style={{flexDirection: 'row', marginTop: '5%'}}>
            <Icon
              name="database"
              size={15}
              color={'#FFF'}
              style={{marginLeft: '5%'}}></Icon>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              {item.duration} XP
            </Text>
          </View>
        </View>
      </View>
      <Text
        onPress={() => navigate('XpCabin')}
        style={{marginLeft: 10, color: '#000', fontWeight: 'bold'}}>
        {formatDateTime(item.start)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
