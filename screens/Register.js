import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {signup} from '../actions/auth';
import {
  isValidEmail,
  isValidPasswordStrength,
  mapStateToProps,
} from '../tools/util';

class Register extends React.Component {
  state = {
    result: null,
    showPassword: false,
    showRepeatPassword: false,
    email: '',
    password: '',
    repeatPassword: '',
    error: '',
    createAccountDisabled: false,
  };

  signUp() {
    this.setState({error: ''});

    if (!isValidEmail(this.state.email)) {
      this.setState({error: 'Please enter a valid email address'});
      return;
    }

    if (!isValidPasswordStrength(this.state.password)) {
      this.setState({error: 'Please enter a valid password'});
      return;
    }

    if (this.state.password !== this.state.repeatPassword) {
      this.setState({error: 'Password should be equal'});
      return;
    }

    this.setState({createAccountDisabled: true});
    this.props.signup(this.state.email.toLowerCase(), this.state.password);
    this.setState({createAccountDisabled: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/Logo.png')} style={styles.header} />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          autoCapitalize={'none'}
          style={{
            position: 'relative',
            fontSize: 20,
            marginTop: '10%',
            marginLeft: '20%',
            textAlign: 'left',
            color: '#000',
            fontFamily: 'Roboto',
            fontWeight: '100',
          }}
        />

        <View style={{flexDirection: 'row', marginTop: '5%'}}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!this.state.showPassword}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            autoCapitalize={'none'}
            style={{
              position: 'relative',
              fontSize: 20,
              marginLeft: '20%',
              textAlign: 'left',
              color: '#000',
              fontFamily: 'Roboto',
              fontWeight: '100',
            }}
          />
          <Icon
            onPress={() => {
              this.setState({showPassword: !this.state.showPassword});
            }}
            name="eye"
            size={30}
            style={{position: 'absolute', right: '20%'}}
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: '5%'}}>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!this.state.showRepeatPassword}
            onChangeText={(repeatPassword) => this.setState({repeatPassword})}
            value={this.state.repeatPassword}
            autoCapitalize={'none'}
            style={{
              position: 'relative',
              fontSize: 20,
              marginLeft: '20%',
              textAlign: 'left',
              color: '#000',
              fontFamily: 'Roboto',
              fontWeight: '100',
            }}
          />
          <Icon
            onPress={() => {
              this.setState({
                showRepeatPassword: !this.state.showRepeatPassword,
              });
            }}
            name="eye"
            size={30}
            style={{position: 'absolute', right: '20%'}}
          />
        </View>

        {this.state.error ? (
          <Text
            style={{
              color: 'red',
              fontSize: 14,
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            {this.state.error}
          </Text>
        ) : null}

        <TouchableOpacity
          disabled={this.state.createAccountDisabled}
          onPress={() => this.signUp()}>
          <Text style={styles.button}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Already have an account?</Text>
        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            margin: 'auto',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            marginTop: '1%',
            width: '70%',
            alignSelf: 'center',
            textDecorationLine: 'underline',
          }}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          Login
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    position: 'relative',
    fontSize: 20,
    margin: 'auto',
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Roboto',
    marginTop: 20,
    padding: '5%',
    width: '70%',
    borderWidth: 2,
    alignSelf: 'center',
    borderTopColor: '#000',
    borderBottomColor: '#000',
    borderLeftColor: '#FFF',
    borderRightColor: '#FFF',
  },
  text: {
    position: 'relative',
    fontSize: 20,
    margin: 'auto',
    textAlign: 'center',
    color: 'red',
    fontFamily: 'Roboto',
    marginTop: '2.5%',
    width: '70%',
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps, {signup})(Register);
