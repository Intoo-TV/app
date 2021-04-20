import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Logo from '../assets/Logo.png';

export default class ExpLive extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            position: 'relative',
            fontSize: 40,
            marginTop: '20%',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
          }}>
          Congratulations
        </Text>
        <Text
          style={{
            position: 'relative',
            fontSize: 20,
            margin: 'auto',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            marginTop: '2.5%',
            width: '70%',
            alignSelf: 'center',
          }}>
          Your experience is now live{' '}
        </Text>
        <View style={styles.header}>
          <QRCode
            value={this.props.route.params.url}
            size={200}
            logo={Logo}
            logoMargin={10}
            logoSize={100}
            getRef={(ref) => (this.svg = ref)}
          />
        </View>

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
          onPress={() => this.props.navigation.navigate('Option')}>
          Back to profile
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFF',
  },
  header: {
    marginTop: '20%',
    alignSelf: 'center',
  },
});
