import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {TextInput} from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';
import DatePicker from 'react-native-date-picker';

export default class XpCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      start: new Date(),
      end: new Date(),
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onTime2Change = this.onTime2Change.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  onTimeChange(start) {
    this.setState({
      start: start,
    });
  }

  onTime2Change(end) {
    this.setState({
      end: end,
    });
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  componentDidMount() {}

  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="ios-arrow-back" size={30}></Icon>
          <Text
            style={{
              fontSize: 25,
              marginLeft: '5%',
              color: '#000',
              fontWeight: 'bold',
            }}>
            XP Market
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
          onDateChange={this.onDateChange}
          selectedDayColor={'#000'}
          selectedDayTextColor={'#FFF'}
          height={300}
          width={300}
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{textAlign: 'center'}}>From</Text>
            <DatePicker
              date={this.state.start}
              onDateChange={this.onTimeChange}
              mode="time"
              style={{width: 150}}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={{textAlign: 'center'}}>To</Text>
            <DatePicker
              date={this.state.end}
              onDateChange={this.onTime2Change}
              mode="time"
              style={{width: 150}}
            />
          </View>
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
            marginBottom: '1%',
          }}>
          Terms and Conditions
        </Text>
        <Text
          style={{
            position: 'relative',
            fontSize: 15,
            marginTop: '1%',
            textAlign: 'left',
            marginLeft: '5%',
            color: '#000',
            fontFamily: 'Roboto',
            fontWeight: '200',
            marginBottom: '5%',
          }}>
          Hereby you accept Intoo Terms and conditions{' '}
        </Text>

        {this.state.start == null && (
          <Text
            style={{
              position: 'relative',
              fontSize: 20,
              textAlign: 'center',
              color: '#000',
              fontFamily: 'Roboto',
              marginTop: '2.5%',
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
            onPress={() => this.props.navigation.navigate('Places')}>
            Accept
          </Text>
        )}
        {this.state.start != null && (
          <Text
            style={{
              position: 'relative',
              fontSize: 20,
              textAlign: 'center',
              color: '#FFF',
              backgroundColor: '#000',
              fontFamily: 'Roboto',
              marginTop: 10,
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
            onPress={() => this.props.navigation.navigate('Budget')}>
            Accept
          </Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  header: {
    height: 20,
    width: '30%',
    marginTop: '10%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cards: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 100,
    height: '10%',
    overflow: 'hidden',
  },
});
