import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {mapStateToProps} from '../tools/util';
import {
  getPastExperiences,
  getUpcomingExperiences,
} from '../actions/experience';
import HostPastExperienceCard from '../components/HostPastExperienceCard';
import HostUpcomingExperienceCard from '../components/HostUpcomingExperienceCard';

class HostHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  async componentDidMount() {
    this.props.getPastExperiences();
    this.props.getUpcomingExperiences();
  }
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, paddingTop: '5%', backgroundColor: '#FFF'}}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <Text style={styles.heading}>Coming Soon</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: '5%',
            }}>
            {this.props.upcomingExperiences.length > 0 ? (
              <Carousel
                layout={'default'}
                ref={(ref) => (this.carousel = ref)}
                data={this.props.upcomingExperiences}
                sliderWidth={250}
                itemWidth={200}
                layoutCardOffset={10}
                renderItem={(item) => HostUpcomingExperienceCard(item)}
                activeSlideOffset={-10}
                onSnapToItem={(index) => this.setState({activeIndex: index})}
              />
            ) : (
              <Text style={{color: 'grey', margin: 20}}>
                there are no upcoming experiences available for now...
              </Text>
            )}
          </View>

          <Text style={styles.heading}>Completed Experience</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: '5%',
            }}>
            {this.props.pastExperiences.length > 0 ? (
              <Carousel
                layout={'default'}
                ref={(ref) => (this.carousel = ref)}
                data={this.props.pastExperiences}
                sliderWidth={250}
                itemWidth={200}
                layoutCardOffset={10}
                renderItem={(item) => HostPastExperienceCard(item)}
                activeSlideOffset={-10}
                onSnapToItem={(index) => this.setState({activeIndex: index})}
              />
            ) : (
              <Text style={{color: 'grey', margin: 20}}>
                there are no past experiences available for now...
              </Text>
            )}
          </View>
          <View style={{height: 100}} />
        </ScrollView>
        <View
          style={{
            alignSelf: 'center',
            width: '30%',
            backgroundColor: '#000',
            borderRadius: 10,
            paddingBottom: 30,
            marginBottom: -10,
            bottom: 0,
            position: 'absolute',
          }}>
          <Text style={styles.start}>Start</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('XpMarket')}>
            <Icon
              name="shop"
              size={30}
              color={'#FFF'}
              style={{alignSelf: 'center'}}></Icon>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: 20,
    marginTop: '5%',
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  start: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#000',
    color: '#FFF',
    borderRadius: 10,
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 3,
    fontFamily: 'Roboto',
    paddingTop: 10,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, {
  getPastExperiences,
  getUpcomingExperiences,
})(HostHome);
