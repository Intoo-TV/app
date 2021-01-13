import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {login} from '../actions/auth';
import {connect} from 'react-redux';
import {isValidEmail} from '../tools/util';

class _Login extends React.Component {
  state = {
    result: null,
    showPassword: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/logotext.png')}
        />
        <Text style={{color: 'red', fontSize: 12}}>
          {this.state.emailError}
        </Text>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          autoCapitalize={'none'}
        />
        <Text style={{color: 'red', fontSize: 12}}>
          {this.state.passwordError}
        </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={!this.state.showPassword}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          autoCapitalize={'none'}
        />
        <Button
          style={styles.button}
          title="_Login"
          onPress={() => this.login()}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ForgotPassword')}
          style={[styles.text, {marginTop: 50}]}>
          <Text>Forgot your password?</Text>
        </TouchableOpacity>
        <Text style={[styles.text, {marginTop: 50}]}>New to Intoo?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={[styles.text, {marginTop: 10}]}>Create an account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  login() {
    this.setState({emailError: '', passwordError: ''});

    if (!isValidEmail(this.state.email)) {
      this.setState({emailError: 'Please enter a valid email address'});
      return;
    }

    if (this.state.password.length == 0) {
      this.setState({passwordError: 'Please enter a password'});
      return;
    }

    this.props.login(this.state.email.toLowerCase(), this.state.password);
  }
}

function mapStateToProps(state) {
  return state;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  image: {
    alignSelf: 'center',
    marginTop: 10,
  },
  button: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps, {login})(_Login);
