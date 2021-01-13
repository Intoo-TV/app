import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Reset extends React.Component {
  state = {
    password: true,
    password2: true,
    eye: 'eye',
    eye2: 'eye',
    p1: null,
    p2: null,
    match: true,
    email: null,
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  _togglePassword() {
    if (!this.state.password) {
      this.setState({eye: 'eye-with-line'});
    } else if (this.state.password) {
      this.setState({eye: 'eye'});
    }
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.header}></Image>
        <Text
          placeholder="Email"
          style={{
            position: 'relative',
            fontSize: 30,
            marginTop: '10%',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            fontWeight: '100',
          }}>
          Great!
        </Text>
        <Text
          placeholder="Email"
          style={{
            position: 'relative',
            fontSize: 20,
            marginTop: '10%',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            fontWeight: '100',
            width: '70%',
            alignSelf: 'center',
          }}>
          Please check your email to reset your password.
        </Text>

        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            margin: 'auto',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            marginTop: '20%',
            padding: '5%',
            width: '70%',
            borderWidth: 2,
            alignSelf: 'center',
            borderTopColor: '#000',
            borderBottomColor: '#000',
            borderLeftColor: '#FFF',
            borderRightColor: '#FFF',
          }}
          onPress={() => {
            this.props.navigation.navigate('Success');
          }}>
          Back to Login
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    backgroundColor: '#FFF',
  },
  header: {
    height: '20%',
    width: '30%',
    marginTop: '10%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
