import React from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';

export default class ProfileComplete extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.header}></Image>
        <Text
          style={{
            position: 'relative',
            fontSize: 30,
            marginTop: '5%',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}>
          Welcome to your Experience
        </Text>
        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            marginTop: '5%',
            width: '80%',
            alignSelf: 'center',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}>
          Here's a little help to make it happen
        </Text>

        <Text
          style={{
            position: 'relative',
            borderRadius: 100,
            height: 200,
            width: 200,
            fontFamily: 'Roboto',
            fontSize: 60,
            alignSelf: 'center',
            alignContent: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
            borderColor: '#000',
            borderWidth: 2,
            marginTop: '5%',
          }}>
          10XP
        </Text>

        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            marginTop: '10%',
            textAlign: 'center',
            color: '#000',
            width: '70%',
            alignSelf: 'center',
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}>
          {' '}
          Now you are ready to create your first experience.
        </Text>
        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            margin: 'auto',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            marginTop: '10%',
            padding: '5%',
            width: '70%',
            borderWidth: 2,
            alignSelf: 'center',
            borderTopColor: '#000',
            borderBottomColor: '#000',
            borderLeftColor: '#FFF',
            borderRightColor: '#FFF',
          }}
          onPress={() => this.props.navigation.navigate('Option')}>
          Start
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 100,
    width: '30%',
    marginTop: '10%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
