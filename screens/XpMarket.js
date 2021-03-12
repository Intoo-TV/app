import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import {getNewExperiences} from '../actions/experience';
import {connect} from 'react-redux';
import {mapStateToProps} from '../tools/util';
import TinderCard from '../components/TinderCard';

class XpMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  async componentDidMount() {
    this.props.getNewExperiences();
  }

  render() {
    return (
      <ScrollView style={{flex: 1, paddingTop: '5%', backgroundColor: '#FFF'}}>
        <Header navigation={this.props.navigation} />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
            alignContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Carousel
            layout={'tinder'}
            ref={(ref) => (this.carousel = ref)}
            data={this.props.upcomingExperiences}
            sliderWidth={350}
            itemWidth={300}
            layoutCardOffset={10}
            renderItem={(item) => TinderCard(item)}
            activeSlideOffset={10}
            activeSlideAlignment={'end'}
            onSnapToItem={(index) => this.setState({activeIndex: index})}
          />
        </View>

        <View style={{marginTop: 20}}>
          <View style={{alignSelf: 'center', flex: 1, flexDirection: 'row'}}>
            <Icon
              onPress={() => {
                this.carousel.snapToNext();
              }}
              name="thumbs-down"
              size={70}
              color={'#000'}
              style={{alignSelf: 'baseline'}}></Icon>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('XpDetails', {
                  experience: this.props.upcomingExperiences[
                    this.state.activeIndex
                  ],
                })
              }>
              <Image
                source={require('../assets/logob.png')}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginHorizontal: '5%',
                }}></Image>
            </TouchableOpacity>
            <Icon
              onPress={() => {
                this.carousel.snapToNext();
              }}
              name="thumbs-up"
              size={70}
              color={'#000'}
              style={{alignSelf: 'baseline'}}></Icon>
          </View>
        </View>
      </ScrollView>
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
  card: {
    backgroundColor: '#ccc',
    height: 500,
    width: 120,
  },
});

export default connect(mapStateToProps, {
  getNewExperiences,
})(XpMarket);
