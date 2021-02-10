import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';

import Coins from '../assets/coins.png';
import {createAccessToEvent} from '../contracts';
import {connect} from 'react-redux';
import {mapStateToProps} from '../tools/util';

class Budget extends React.Component {
  constructor(props) {
    super(props);
    let {experience} = this.props.route.params;
    this.state = {
      loading: false,
      selectedBudget: experience.budget ? experience.budget : 0,
      experience,
    };
  }

  ConfirmXP = async () =>
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
            this.setState({loading: true});
            console.log('Submitted');
            await createAccessToEvent(
              this.state.experience.tokenID,
              this.state.experience.url,
              this.props.wallet.address,
            );
            // this.props.navigation.navigate('ExpLive');
          },
        },
      ],
      {cancelable: false},
    );

  render() {
    return (
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
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero.
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
          <TouchableOpacity onPress={() => this.setState({selectedBudget: 0})}>
            <Card
              selected={this.state.selectedBudget == 0}
              name="2 mins"
              icon={Coins}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({selectedBudget: 1})}>
            <Card
              selected={this.state.selectedBudget == 1}
              name="5 mins"
              icon={Coins}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({selectedBudget: 2})}>
            <Card
              selected={this.state.selectedBudget == 2}
              name="10 mins"
              icon={Coins}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={this.state.loading}
          onPress={() => this.ConfirmXP()}>
          <Text
            style={{
              position: 'relative',
              fontSize: 20,
              textAlign: 'center',
              color: '#FFF',
              backgroundColor: this.state.loading ? 'grey' : '#000',
              fontFamily: 'Roboto',
              marginTop: '-2.5%',
              padding: '3%',
              width: '70%',
              borderWidth: 2,
              alignSelf: 'center',
              borderTopColor: this.state.loading ? 'grey' : '#000',
              borderBottomColor: this.state.loading ? 'grey' : '#000',
              borderLeftColor: '#FFF',
              borderRightColor: '#FFF',
              textAlignVertical: 'center',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
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
    height: '10%',
    overflow: 'hidden',
  },
});
export default connect(mapStateToProps, {})(Budget);
