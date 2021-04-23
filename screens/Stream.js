import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {mapStateToProps} from '../tools/util';

class Stream extends Component {
  render() {
    let {experience} = this.props.route.params;
    return (
      <WebView
        source={{
          uri: `https://web-page-pi.vercel.app/index.html?experienceID=${experience.id}&token=${this.props.auth.token}`,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps, {})(Stream);
