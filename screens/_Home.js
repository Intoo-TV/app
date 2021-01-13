import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from '../components/video/Video';

class _Home extends React.Component {
  render() {
    return <Video />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    alignSelf: 'center',
  },
});

export default _Home;
