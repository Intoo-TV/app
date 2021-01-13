import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {isValidEmail, mapStateToProps} from '../tools/util';

class Login extends React.Component {
  state = {
    result: null,
    showPassword: false,
    email: '',
    error: '',
    password: '',
  };

  render() {
    if (this.props.auth.loggedIn) {
      this.props.navigation.navigate('Option');
    }
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.header}></Image>
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
              this.setState({password: !this.state.showPassword});
            }}
            name={this.state.eye}
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

        <Text style={styles.loginButton} onPress={() => this.login()}>
          Login
        </Text>
        <Text
          style={{
            position: 'relative',
            fontSize: 15,
            margin: 'auto',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            marginTop: '10%',
            width: '70%',
            alignSelf: 'center',
          }}>
          New to IntooTV?
        </Text>
        <Text
          style={styles.registerButton}
          onPress={() => {
            this.props.navigation.navigate('Register');
          }}>
          Create an account
        </Text>
      </View>
    );
  }

  login() {
    this.setState({emailError: '', passwordError: ''});

    if (!isValidEmail(this.state.email)) {
      this.setState({error: 'Please enter a valid email address'});
      return;
    }

    if (this.state.password.length == 0) {
      this.setState({error: 'Please enter a password'});
      return;
    }

    this.props.login(
      this.state.email.toLowerCase(),
      this.state.password,
      false,
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
  loginButton: {
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
  registerButton: {
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
  },
});

export default connect(mapStateToProps, {login})(Login);
