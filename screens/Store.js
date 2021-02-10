import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import Card from '../components/Card';

import Coins from '../assets/coins.png';
import {connect} from 'react-redux';
import {mapStateToProps} from '../tools/util';
import HeaderBack from '../components/HeaderBack';

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBudget: 0,
      modalVisible: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBack name="Store" navigation={this.props.navigation} />
        <Text style={{marginTop: '5%', marginLeft: '5%'}}>
          Buy XPs to{' '}
          <Text style={{fontWeight: 'bold'}}>create a new Experience</Text>, or
          to <Text style={{fontWeight: 'bold'}}>tip your host</Text> in
          real-time!
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
          <TouchableOpacity onPress={() => this.setState({selectedBudget: 20})}>
            <Card
              selected={this.state.selectedBudget == 20}
              name="20 XP"
              icon={Coins}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({selectedBudget: 50})}>
            <Card
              selected={this.state.selectedBudget == 50}
              name="50 XP"
              icon={Coins}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({selectedBudget: 100})}>
            <Card
              selected={this.state.selectedBudget == 100}
              name="100 XP"
              icon={Coins}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={this.state.selectedBudget == 0}
          onPress={() => this.setState({modalVisible: true})}>
          <Text
            style={{
              position: 'relative',
              fontSize: 20,
              textAlign: 'center',
              color: '#FFF',
              backgroundColor: this.state.selectedBudget == 0 ? 'grey' : '#000',
              fontFamily: 'Roboto',
              marginTop: '-2.5%',
              padding: '3%',
              width: '70%',
              borderWidth: 2,
              alignSelf: 'center',
              borderTopColor: this.state.selectedBudget == 0 ? 'grey' : '#000',
              borderBottomColor:
                this.state.selectedBudget == 0 ? 'grey' : '#000',
              borderLeftColor: '#FFF',
              borderRightColor: '#FFF',
              textAlignVertical: 'center',
            }}>
            Buy
          </Text>
        </TouchableOpacity>
        <Overlay
          isVisible={this.state.modalVisible}
          onBackdropPress={() => {
            this.setState({modalVisible: false});
          }}
          overlayStyle={{
            padding: 20,
            margin: 20,
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 8,
          }}>
          <View>
            <Text style={{fontSize: 16}}>
              This will cost you €{(this.state.selectedBudget * 1.1).toFixed(2)}
            </Text>
            <Text> for up to {this.state.selectedBudget / 2} experiences</Text>
            <View style={{marginVertical: 20}}>
              <Button
                title="Checkout with PayPal"
                buttonStyle={styles.button}
              />
              <Button title="Pay in DAI" buttonStyle={styles.button} />
            </View>
          </View>
        </Overlay>
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
  button: {
    margin: 20,
    backgroundColor: 'black',
  },
});
export default connect(mapStateToProps, {})(Store);
