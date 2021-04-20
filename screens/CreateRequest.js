import React from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';

import Sport from '../assets/sport.png';
import Music from '../assets/music.png';
import Nature from '../assets/nature.png';
import {TextInput} from 'react-native-gesture-handler';
import Cooking from '../assets/cooking.png';
import CalendarPicker from 'react-native-calendar-picker';
import DatePicker from 'react-native-date-picker';
import Coins from '../assets/coins.png';
import {connect} from 'react-redux';
import {mapStateToProps} from '../tools/util';
import {createExperience} from '../actions/experience';

class CreateRequest extends React.Component {
  state = {
    step: 1,
    title: null,
    description: null,
    selectedInterests: [],
    selectedStartDate: null,
    start: new Date(),
    end: new Date(),
    selectedBudget: 2,
    saveTemplate: true,
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

  confirmXP = () =>
    Alert.alert(
      'Confirm',
      'Are you sure?',
      [
        {
          text: 'No',
          onPress: () => console.log('Yes, Submit'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            console.log('Submitted');

            let params = {
              nft: {
                title: this.state.title,
                description: this.state.description,
                interests: this.state.selectedInterests,
                start: this.state.start,
                duration: this.state.selectedBudget,
              },
              saveTemplate: this.state.saveTemplate,
              templateId: -1,
            };

            this.props.createExperience(params);
          },
        },
      ],
      {cancelable: false},
    );

  render() {
    let interests = [
      {name: 'Sport', icon: Sport},
      {name: 'Music', icon: Music},
      {name: 'Nature', icon: Nature},
      {name: 'Cooking', icon: Cooking},
    ];
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <View style={styles.container}>
        {this.state.step == 1 ? (
          <View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="ios-arrow-back"
                size={30}
                onPress={() => this.props.navigation.goBack()}
              />
              <Text
                style={{
                  fontSize: 25,
                  marginLeft: '5%',
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                Create an Experience
              </Text>
            </View>

            <TextInput
              placeholder="Your Experience Title"
              style={{
                position: 'relative',
                fontSize: 20,
                marginTop: '5%',
                marginLeft: '5%',
                textAlign: 'left',
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: '100',
              }}
              onChangeText={(title) => this.setState({title})}
            />

            <TextInput
              placeholder="Describe your experience"
              style={{
                position: 'relative',
                fontSize: 15,
                marginTop: '5%',
                marginLeft: '5%',
                paddingLeft: '5%',
                textAlign: 'left',
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: '100',
                height: '20%',
                width: '90%',
                flexWrap: 'wrap',
                backgroundColor: '#F8FAFF',
                borderRadius: 10,
                textAlignVertical: 'top',
              }}
              multiline={true}
              numberOfLines={10}
              onChangeText={(description) => this.setState({description})}
            />

            <Text
              style={{
                position: 'relative',
                fontSize: 25,
                marginTop: '5%',
                textAlign: 'left',
                marginLeft: '5%',
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: '200',
              }}>
              Labels
            </Text>

            <View
              style={{
                marginTop: 20,
                width: '70%',
                alignSelf: 'center',
                marginBottom: 20,
              }}>
              <FlatList
                style={styles.cards}
                horizontal={true}
                data={interests}
                keyExtractor={(item) => item.name}
                renderItem={(item) => this.renderInterest(item)}
              />
            </View>
            {(this.state.description == null || this.state.title == null) && (
              <Text
                style={{
                  position: 'relative',
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#000',
                  fontFamily: 'Roboto',
                  marginTop: '-2.5%',
                  padding: '3%',
                  width: '70%',
                  borderWidth: 2,
                  alignSelf: 'center',
                  borderTopColor: '#000',
                  borderBottomColor: '#000',
                  borderLeftColor: '#FFF',
                  borderRightColor: '#FFF',
                  textAlignVertical: 'center',
                }}>
                1 of 3
              </Text>
            )}
            {this.state.description != null && this.state.title != null && (
              <Text
                style={{
                  position: 'relative',
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#FFF',
                  backgroundColor: '#000',
                  fontFamily: 'Roboto',
                  marginTop: '-2.5%',
                  padding: '3%',
                  width: '70%',
                  borderWidth: 2,
                  alignSelf: 'center',
                  borderTopColor: '#000',
                  borderBottomColor: '#000',
                  borderLeftColor: '#FFF',
                  borderRightColor: '#FFF',
                  textAlignVertical: 'center',
                }}
                onPress={() => this.setState({step: 2})}>
                1 of 3
              </Text>
            )}
          </View>
        ) : null}
        {this.state.step == 2 ? (
          <ScrollView>
            <View style={{flexDirection: 'row'}}>
              <Icon name="ios-arrow-back" size={30}></Icon>
              <Text
                style={{
                  fontSize: 25,
                  marginLeft: '5%',
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                Create an Experience
              </Text>
            </View>

            <Text
              style={{
                position: 'relative',
                fontSize: 20,
                marginTop: '5%',
                textAlign: 'left',
                marginLeft: '5%',
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: '200',
                marginBottom: '5%',
              }}>
              Pick your date
            </Text>

            <CalendarPicker
              onDateChange={(date) => this.setState({selectedStartDate: date})}
              selectedDayColor={'#000'}
              selectedDayTextColor={'#FFF'}
            />
            <Text
              style={{
                position: 'relative',
                fontSize: 20,
                marginTop: '5%',
                textAlign: 'left',
                marginLeft: '5%',
                color: '#000',
                fontFamily: 'Roboto',
                fontWeight: '200',
                marginBottom: '5%',
              }}>
              Timeslot
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{textAlign: 'center'}}>From</Text>
                <DatePicker
                  date={this.state.start}
                  onDateChange={(date) => this.setState({start: date})}
                  mode="time"
                  style={{width: 150}}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{textAlign: 'center'}}>To</Text>
                <DatePicker
                  date={this.state.end}
                  onDateChange={(date) => this.setState({end: date})}
                  mode="time"
                  style={{width: 150}}
                />
              </View>
            </View>

            {this.state.selectedStartDate == null && (
              <Text
                style={{
                  position: 'relative',
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#000',
                  fontFamily: 'Roboto',
                  marginTop: '-2.5%',
                  padding: '3%',
                  width: '70%',
                  borderWidth: 2,
                  alignSelf: 'center',
                  borderTopColor: '#000',
                  borderBottomColor: '#000',
                  borderLeftColor: '#FFF',
                  borderRightColor: '#FFF',
                  textAlignVertical: 'center',
                }}>
                2 of 3
              </Text>
            )}
            {this.state.selectedStartDate != null && (
              <Text
                style={{
                  position: 'relative',
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#FFF',
                  backgroundColor: '#000',
                  fontFamily: 'Roboto',
                  marginVertical: 10,
                  padding: '3%',
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
                2 of 3
              </Text>
            )}
          </ScrollView>
        ) : null}

        {this.state.step == 3 ? (
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="ios-arrow-back" size={30}></Icon>
              <Text
                style={{
                  fontSize: 25,
                  marginLeft: '5%',
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                Budget
              </Text>
            </View>
            <Text style={{marginTop: '5%', marginLeft: '5%'}}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero.
            </Text>

            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.setState({selectedBudget: 2})}>
                <Card
                  selected={this.state.selectedBudget == 2}
                  name="2 mins"
                  icon={Coins}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({selectedBudget: 5})}>
                <Card
                  selected={this.state.selectedBudget == 5}
                  name="5 mins"
                  icon={Coins}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({selectedBudget: 10})}>
                <Card
                  selected={this.state.selectedBudget == 10}
                  name="10 mins"
                  icon={Coins}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                position: 'relative',
                fontSize: 20,
                textAlign: 'center',
                color: '#FFF',
                backgroundColor: '#000',
                fontFamily: 'Roboto',
                marginTop: '-2.5%',
                padding: '3%',
                width: '70%',
                borderWidth: 2,
                alignSelf: 'center',
                borderTopColor: '#000',
                borderBottomColor: '#000',
                borderLeftColor: '#FFF',
                borderRightColor: '#FFF',
                textAlignVertical: 'center',
              }}
              onPress={() => this.confirmXP()}>
              Submit
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFF',
    paddingHorizontal: '5%',
    paddingTop: '5%',
    paddingBottom: '5%',
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
    width: Dimensions.get('window').width - 100,
    overflow: 'hidden',
  },
});

export default connect(mapStateToProps, {createExperience})(CreateRequest);
