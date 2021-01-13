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

// steps should be:
// 1: Step 1
// 2: Step 2
// 3: Step 3
// 4: success

class _CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {step: 1};
  }

  goToStep2() {
    this.setState({step: 2});
  }

  goToStep3() {
    this.setState({step: 3});
  }

  goToStep4() {
    this.setState({step: 4});
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
            <Text style={[styles.text, styles.title, {marginTop: 10}]}>
              Your Profile - Step 1 of 3
            </Text>
            <Text style={[styles.text, {marginTop: 10}]}>
              Before you start, we'd love to learn a little more about you.
            </Text>
            <TextInput placeholder="Create a Nickname" />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text style={[styles.text, {marginTop: 10}]}>
                Profile picture
              </Text>
              <Button style={styles.formButton} title="Upload Picture" />
            </View>
            <TextInput placeholder="Your location" />
            <Button
              onPress={() => this.goToStep2()}
              style={styles.formButton}
              title="Next: Pick your interests"
            />
          </View>
        ) : null}
        {this.state.step == 2 ? (
          <View>
            <Text style={[styles.text, styles.title, {marginTop: 10}]}>
              Your Interests - Step 2 of 3
            </Text>
            <Text style={[styles.text, {marginTop: 10}]}>
              Some text to go here to explain things - pick between 1 and 3
              interests
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>Sports</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>Nature</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginVertical: 20,
              }}>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>Cooking</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>Gardening</Text>
              </TouchableOpacity>
            </View>
            <Button
              onPress={() => this.goToStep3()}
              style={styles.formButton}
              title="Next: Pick your favorite places"
            />
          </View>
        ) : null}
        {this.state.step == 3 ? (
          <View>
            <Text style={[styles.text, styles.title, {marginTop: 10}]}>
              Favourite Places - Step 3 of 3
            </Text>
            <Text style={[styles.text, {marginTop: 10}]}>
              Some text to go here to explain things - pick between 1 and 3
              places
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>England</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>France</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>Italy</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>Latvia</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>Estonia</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.text}>USA</Text>
              </TouchableOpacity>
            </View>
            <Button
              onPress={() => this.goToStep4()}
              style={styles.formButton}
              title="Let's go!"
            />
          </View>
        ) : null}
        {this.state.step == 4 ? (
          <View>
            <Text style={[styles.text, styles.title, {marginTop: 50}]}>
              Welcome to your Experience
            </Text>
            <Text style={[styles.text, {marginTop: 10, marginBottom: 20}]}>
              Here is a little help to make it happen
            </Text>
            <View
              style={{
                height: 168,
                width: 168,
                backgroundColor: '#23A5F7',
                borderRadius: 84,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={[styles.text, {fontSize: 20, color: 'white'}]}>
                10 XP
              </Text>
            </View>
            <Text style={[styles.text, {marginTop: 10, marginBottom: 20}]}>
              Now you are ready to create your first experience
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  image: {
    alignSelf: 'center',
    marginTop: 10,
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
  card: {
    width: 81,
    height: 95,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default _CreateProfile;
