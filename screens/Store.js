import React, {useState} from 'react';
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
import {useWalletConnect} from '@walletconnect/react-native-dapp';

function Store(props) {
  let [selectedBudget, setSelectedBudget] = useState(0);
  let [modalVisible, setModalVisible] = useState(false);

  const connector = useWalletConnect();
  console.log('connected: ' + connector.connected);

  return (
    <View style={styles.container}>
      <HeaderBack name="Store" navigation={props.navigation} />
      <Text style={{marginTop: '5%', marginLeft: '5%'}}>
        Buy XPs to{' '}
        <Text style={{fontWeight: 'bold'}}>create a new Experience</Text>, or to{' '}
        <Text style={{fontWeight: 'bold'}}>tip your host</Text> in real-time!
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
        <TouchableOpacity onPress={() => setSelectedBudget(20)}>
          <Card selected={selectedBudget == 20} name="20 XP" icon={Coins} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedBudget(50)}>
          <Card selected={selectedBudget == 50} name="50 XP" icon={Coins} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedBudget(100)}>
          <Card selected={selectedBudget == 100} name="100 XP" icon={Coins} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        disabled={selectedBudget == 0}
        onPress={() => setModalVisible(true)}>
        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            textAlign: 'center',
            color: '#FFF',
            backgroundColor: selectedBudget == 0 ? 'grey' : '#000',
            fontFamily: 'Roboto',
            marginTop: '-2.5%',
            padding: '3%',
            width: '70%',
            borderWidth: 2,
            alignSelf: 'center',
            borderTopColor: selectedBudget == 0 ? 'grey' : '#000',
            borderBottomColor: selectedBudget == 0 ? 'grey' : '#000',
            borderLeftColor: '#FFF',
            borderRightColor: '#FFF',
            textAlignVertical: 'center',
          }}>
          Buy
        </Text>
      </TouchableOpacity>
      <Overlay
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
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
            This will cost you €{(selectedBudget * 1.1).toFixed(2)}
          </Text>
          <Text> for up to {selectedBudget / 2} experiences</Text>
          <View style={{marginVertical: 20}}>
            <Button title="Checkout with PayPal" buttonStyle={styles.button} />
            <Button
              title="Pay in DAI"
              buttonStyle={styles.button}
              onPress={async () => {
                setModalVisible(false);
                try {
                  let connection = await connector.createSession({
                    chainId: 80001,
                  });
                  console.log(connection);
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
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
