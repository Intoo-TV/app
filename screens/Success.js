import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import {mapStateToProps} from '../tools/util';

class Success extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.header}></Image>
        <Text
          style={{
            position: 'relative',
            fontSize: 30,
            marginTop: '20%',
            textAlign: 'center',
            color: '#000',
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}>
          Success
        </Text>
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
          Write down your mnemonic and keep it safe
        </Text>

        <Text style={{marginHorizontal: '10%', marginTop: 20, fontSize: 20}}>
          {this.props.wallet && this.props.wallet.mnemonic
            ? this.props.wallet.mnemonic
            : ''}
        </Text>

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
          onPress={() => this.props.navigation.navigate('CreateProfile')}>
          Login
        </Text>
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
});

export default connect(mapStateToProps, {})(Success);
