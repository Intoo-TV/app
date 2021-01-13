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
import {signup} from '../actions/auth';
import {connect} from 'react-redux';
import {isValidEmail, isValidPasswordStrength} from '../tools/util';

// steps should be:
// 1: Creator/Maker
// 2: Email and password
// 3: success

class _SignUp extends React.Component {
  state = {
    result: null,
    showPassword: false,
    email: '',
    emailError: '',
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    repeatPassword: '',
    repeatPasswordError: '',
    kind: 0,
  };

  constructor(props) {
    super(props);
    this.state = {step: 1};
  }

  setKind(kind) {
    this.setState({step: 2, kind});
  }

  signUp() {
    this.setState({
      emailError: '',
      usernameError: '',
      passwordError: '',
      repeatPasswordError: '',
    });

    if (!isValidEmail(this.state.email)) {
      this.setState({emailError: 'Please enter a valid email address'});
      return;
    }

    if (this.state.username.length == 0) {
      this.setState({usernameError: 'Please enter a username'});
      return;
    }

    if (!isValidPasswordStrength(this.state.password)) {
      this.setState({passwordError: 'Please enter a password'});
      return;
    }

    if (this.state.password !== this.state.repeatPassword) {
      this.setState({repeatPasswordError: 'Password should be equal'});
      return;
    }

    this.props.signup(
      this.state.email.toLowerCase(),
      this.state.username,
      this.state.password,
      this.state.kind,
    );

    this.setState({step: 3});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/logotext.png')}
        />
        {this.state.step == 1 ? (
          <View>
            <Text style={[styles.text, {marginTop: 10}]}>I am a...</Text>
            <TouchableOpacity
              onPress={() => this.setKind(0)}
              style={styles.button}>
              <Text style={styles.text}>Shower</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setKind(1)}
              style={styles.button}>
              <Text style={styles.text}>Viewer</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.state.step == 2 ? (
          <View>
            <TextInput
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              autoCapitalize={'none'}
            />
            <TextInput
              placeholder="Username"
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
              autoCapitalize={'none'}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={!this.state.showPassword}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              autoCapitalize={'none'}
            />
            <TextInput
              placeholder="Repeat Password"
              secureTextEntry={!this.state.showPassword}
              onChangeText={(repeatPassword) => this.setState({repeatPassword})}
              value={this.state.repeatPassword}
              autoCapitalize={'none'}
            />
            <Button
              onPress={() => this.signUp()}
              style={styles.formButton}
              title="Create Account"
            />
          </View>
        ) : null}
        {this.state.step == 3 ? (
          <View>
            <Text style={[styles.text, styles.title, {marginTop: 50}]}>
              Success
            </Text>
            <Text style={[styles.text, {marginTop: 10, marginBottom: 50}]}>
              Now just check your email to verify your email address
            </Text>
            <Button
              style={[styles.formButton]}
              title="_Login"
              onPress={() => this.props.navigation.navigate('_Login')}
            />
          </View>
        ) : null}
      </View>
    );
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
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 145,
    width: 259,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  formButton: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
  },
});

export default connect(mapStateToProps, {signup})(_SignUp);
