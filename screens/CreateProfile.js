import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import Logo from '../assets/Logo.png';
import Card from '../components/Card';
import Sport from '../assets/sport.png';
import Music from '../assets/music.png';
import Nature from '../assets/nature.png';
import Cooking from '../assets/cooking.png';

import Paris from '../assets/paris.png';
import NewYork from '../assets/nyc.png';
import Prague from '../assets/prague.png';
import {mapStateToProps} from '../tools/util';
import {connect} from 'react-redux';
import {updateProfile} from '../actions/profile';

class CreateProfile extends React.Component {
  state = {
    error: '',
    step: 1,
    nickname: '',
    selectedInterests: [],
    selectedPlaces: [],
  };

  renderInterest({item}) {
    return (
      <TouchableOpacity onPress={() => this.toggleInterest(item.name)}>
        <Card
          name={item.name}
          icon={item.icon}
          selected={this.state.selectedInterests.indexOf(item.name) > -1}
        />
      </TouchableOpacity>
    );
  }

  renderPlace({item}) {
    return (
      <TouchableOpacity onPress={() => this.togglePlace(item.name)}>
        <Card
          name={item.name}
          icon={item.icon}
          selected={this.state.selectedPlaces.indexOf(item.name) > -1}
        />
      </TouchableOpacity>
    );
  }

  toggleInterest(interest) {
    let interests = this.state.selectedInterests;
    let index = interests.indexOf(interest);
    if (index > -1) {
      interests.splice(index, 1);
    } else {
      interests.push(interest);
    }
    this.setState({selectedInterests: interests});
  }

  togglePlace(place) {
    let places = this.state.selectedPlaces;
    let index = places.indexOf(place);
    if (index > -1) {
      places.splice(index, 1);
    } else {
      places.push(place);
    }
    this.setState({selectedPlaces: places});
  }

  validateNickname() {
    this.setState({error: ''});

    if (this.state.nickname.length == 0) {
      this.setState({error: 'Please enter a nickname'});
      return;
    }

    this.setState({step: 2});
  }

  updateProfile() {
    this.props.updateProfile(
      this.state.nickname,
      this.state.selectedInterests,
      this.state.selectedPlaces,
    );
  }

  render() {
    let interests = [
      {name: 'Sport', icon: Sport},
      {name: 'Music', icon: Music},
      {name: 'Nature', icon: Nature},
      {name: 'Cooking', icon: Cooking},
    ];
    let places = [
      {name: 'Paris', icon: Paris},
      {name: 'New York', icon: NewYork},
      {name: 'Prague', icon: Prague},
    ];

    return (
      <View style={styles.container}>
        <Image source={Logo} style={styles.header} />
        <Text
          style={{
            position: 'relative',
            fontSize: 25,
            marginTop: '5%',
            textAlign: 'left',
            marginLeft: '15%',
            color: '#000',
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}>
          Your Profile- Step {this.state.step} of 3
        </Text>

        {this.state.step == 1 && (
          <View>
            <Text
              style={{
                position: 'relative',
                fontSize: 17.5,
                marginTop: '2.5%',
                width: '70%',
                alignSelf: 'center',
                textAlign: 'left',
                marginLeft: '2.5%',
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: '200',
              }}>
              Before you start, we’d love to learn a little more about you.
            </Text>

            <TextInput
              placeholder="Nickname"
              style={{
                position: 'relative',
                fontSize: 20,
                marginTop: '10%',
                marginLeft: '15%',
                textAlign: 'left',
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: '100',
              }}
              onChangeText={(nickname) => this.setState({nickname})}
            />

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

            <Text
              style={{
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
              }}
              onPress={() => this.validateNickname()}>
              Next: Pick your interests
            </Text>
          </View>
        )}
        {this.state.step == 2 && (
          <View>
            <Text
              style={{
                position: 'relative',
                fontSize: 20,
                marginTop: '5%',
                width: '70%',
                alignSelf: 'center',
                textAlign: 'center',
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: '200',
              }}>
              Pick 1-3 topics you find interesting
            </Text>

            <View style={{marginTop: 20, width: '70%', alignSelf: 'center'}}>
              <FlatList
                style={styles.cards}
                horizontal={true}
                data={interests}
                keyExtractor={(item) => item.name}
                renderItem={(item) => this.renderInterest(item)}
              />
            </View>

            <Text
              style={{
                position: 'relative',
                fontSize: 20,
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
                textAlignVertical: 'center',
              }}
              onPress={() => this.setState({step: 3})}>
              Next: Pick your favorite places
            </Text>
          </View>
        )}
        {this.state.step == 3 && (
          <View>
            <Text
              style={{
                position: 'relative',
                fontSize: 20,
                marginTop: '5%',
                width: '70%',
                alignSelf: 'center',
                textAlign: 'center',
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: '200',
              }}>
              Pick 1-3 places you like
            </Text>

            <View style={{marginTop: 20, width: '70%', alignSelf: 'center'}}>
              <FlatList
                style={styles.cards}
                horizontal={true}
                data={places}
                keyExtractor={(item) => item.name}
                renderItem={(item) => this.renderPlace(item)}
              />
            </View>
            <Text
              style={{
                position: 'relative',
                fontSize: 20,
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
                textAlignVertical: 'center',
              }}
              onPress={() => this.updateProfile()}>
              Let's go!
            </Text>
          </View>
        )}
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
  cards: {
    flexDirection: 'row',
    margin: '2.5%',
    alignContent: 'center',
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden',
  },
});

export default connect(mapStateToProps, {updateProfile})(CreateProfile);
