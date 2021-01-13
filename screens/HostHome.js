import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {SocialIcon} from 'react-native-elements';

import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Entypo';

export default class HostHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Alex P.',
          text: 'Experience Title',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.',
        },
        {
          title: 'Alex P.',
          text: 'Experience Title',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.',
        },
        {
          title: 'Alex P.',
          text: 'Experience Title',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.',
        },
        {
          title: 'Alex P.',
          text: 'Experience Title',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.',
        },
        {
          title: 'Alex P.',
          text: 'Experience Title',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.',
        },
      ],
    };
  }

  _renderItem({item, index}) {
    return (
      <View>
        <View
          style={{
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 10,
            width: 200,
          }}>
          <View
            style={{
              borderRadius: 10,
              width: 200,
              paddingBottom: 10,
              marginLeft: 0,
              marginRight: 10,
              elevation: 3,
              borderColor: '#000',
              borderWidth: 0.1,
              shadowRadius: 30,
              backgroundColor: '#FFF',
              shadowOffset: {width: 50, height: 50},
              shadowColor: 'black',
              shadowOpacity: 0.7,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/alex.jpg')}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginTop: '5%',
                  marginLeft: '5%',
                  borderColor: '#000',
                  borderWidth: 1,
                }}></Image>
              <Text
                style={{
                  fontSize: 17.5,
                  marginLeft: 10,
                  marginTop: '10%',
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                {item.title}
              </Text>
            </View>

            <Text
              style={{
                marginLeft: '5%',
                marginTop: '5%',
                color: '#000',
                fontWeight: 'bold',
              }}>
              {item.text}
            </Text>
            <Text style={{marginLeft: '5%', marginTop: '5%', color: '#000'}}>
              {item.description}
            </Text>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Icon
                name="database"
                size={15}
                color={'#000'}
                style={{marginLeft: '5%'}}></Icon>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                5 XP
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 5,
                  marginTop: 5,
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                #Label
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 5,
                  marginTop: 5,
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                #Label
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 5,
                  marginTop: 5,
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                #Label
              </Text>
            </View>
          </View>
        </View>
        <Text style={{marginLeft: 10, color: '#000', fontWeight: 'bold'}}>
          Date-Time
        </Text>
      </View>
    );
  }

  _renderCompletedItem({item, index}) {
    return (
      <View>
        <View
          style={{
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 10,
            width: 200,
            backgroundColor: '#000',
          }}>
          <View
            style={{
              borderRadius: 10,
              width: 200,
              paddingBottom: 10,
              marginLeft: 0,
              marginRight: 10,
              elevation: 3,
              borderColor: '#000',
              borderWidth: 0.1,
              shadowRadius: 30,
              backgroundColor: '#000',
              shadowOffset: {width: 50, height: 50},
              shadowColor: 'black',
              shadowOpacity: 0.7,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/alex.jpg')}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginTop: '5%',
                  marginLeft: '5%',
                  borderColor: '#000',
                  borderWidth: 1,
                }}></Image>
              <Text
                style={{
                  fontSize: 17.5,
                  marginLeft: 10,
                  marginTop: '10%',
                  color: '#FFF',
                  fontWeight: 'bold',
                }}>
                {item.title}
              </Text>
              <Icon
                name="check"
                size={35}
                color={'#FFF'}
                style={{marginLeft: '5%', marginTop: 25}}></Icon>
            </View>

            <Text
              style={{
                marginLeft: '5%',
                marginTop: '5%',
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              {item.text}
            </Text>
            <Text style={{marginLeft: '5%', marginTop: '5%', color: '#FFF'}}>
              {item.description}
            </Text>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Icon
                name="database"
                size={15}
                color={'#FFF'}
                style={{marginLeft: '5%'}}></Icon>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                  color: '#FFF',
                  fontWeight: 'bold',
                }}>
                5 XP
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 5,
                  marginTop: 5,
                  color: '#FFF',
                  fontWeight: 'bold',
                }}>
                #Label
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 5,
                  marginTop: 5,
                  color: '#FFF',
                  fontWeight: 'bold',
                }}>
                #Label
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 5,
                  marginTop: 5,
                  color: '#FFF',
                  fontWeight: 'bold',
                }}>
                #Label
              </Text>
            </View>
          </View>
        </View>
        <Text
          onPress={() => this.props.navigation.navigate('XpCabin')}
          style={{marginLeft: 10, color: '#000', fontWeight: 'bold'}}>
          Date-Time
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{flex: 1, paddingTop: '5%', backgroundColor: '#FFF'}}>
        <View style={{flexDirection: 'row', marginLeft: '5%'}}>
          <Icon name="menu" size={20} color={'#000'}></Icon>
          <Icon
            name="home"
            size={20}
            style={{marginLeft: 25, color: '#000'}}></Icon>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 5,
              color: '#000',
              fontWeight: 'bold',
            }}>
            Home
          </Text>
          <Icon
            name="bell"
            size={20}
            color={'#000'}
            style={{marginLeft: '40%'}}></Icon>
          <Icon
            name="database"
            size={20}
            color={'#000'}
            style={{marginLeft: '5%'}}></Icon>
          <Text style={{fontSize: 20, marginLeft: 5, color: '#000'}}>500</Text>
        </View>
        <Text
          style={styles.heading}
          onPress={() => this.props.navigation.navigate('XpCabin')}>
          Coming Soon
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '5%',
          }}>
          <Carousel
            layout={'default'}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={250}
            itemWidth={200}
            layoutCardOffset={10}
            renderItem={this._renderItem}
            activeSlideOffset={-10}
            onSnapToItem={(index) => this.setState({activeIndex: index})}
          />
        </View>

        <Text style={styles.heading}>Completed Experience</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '5%',
          }}>
          <Carousel
            layout={'default'}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={250}
            itemWidth={200}
            layoutCardOffset={10}
            renderItem={this._renderCompletedItem}
            activeSlideOffset={-10}
            onSnapToItem={(index) => this.setState({activeIndex: index})}
          />
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: '30%',
            backgroundColor: '#000',
            borderRadius: 10,
            paddingBottom: 30,
            paddingTop: 10,
            marginBottom: -10,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('XpMarket')}>
            <Icon
              name="shop"
              size={30}
              color={'#FFF'}
              style={{alignSelf: 'center'}}></Icon>
          </TouchableOpacity>
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
});
