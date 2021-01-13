import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';

export default class Splash extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.header}></Image>
        <Text
          style={{
            position: 'relative',
            fontSize: 40,
            marginTop: '20%',
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
          }}>
          The World
        </Text>
        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            margin: 'auto',
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Roboto',
            marginTop: '2.5%',
            width: '70%',
            alignSelf: 'center',
          }}>
          Through Someone's Eyes{' '}
        </Text>

        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            margin: 'auto',
            textAlign: 'center',
            color: 'transparent',
            fontFamily: 'Roboto',
            marginTop: '25%',
            padding: '5%',
            width: '70%',
            borderRadius: 10,
            alignSelf: 'center',
            elevation: 1,
          }}
          onPress={() => this.props.navigation.navigate('Login')}>
          LOGIN
        </Text>
        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            margin: 'auto',
            textAlign: 'center',
            color: 'transparent',
            fontFamily: 'Roboto',
            marginTop: '5%',
            padding: '5%',
            width: '70%',
            borderRadius: 10,
            alignSelf: 'center',
            elevation: 1,
          }}
          onPress={() => this.props.navigation.navigate('Register')}>
          REGISTER
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  header: {
    height: '30%',
    width: '70%',
    marginTop: '20%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
