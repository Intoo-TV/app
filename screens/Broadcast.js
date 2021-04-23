import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import {fetchStreamToken} from '../actions/experience';

import Header from '../components/Header';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ],
      {
        title: 'Cool Photo App Camera And Microphone Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default class Broadcast extends Component {
  state = {
    isPublish: false,
    publishBtnTitle: 'start publish',
    stream: false,
  };

  async componentDidMount() {
    let {experience} = this.props.route.params;
    let result = await fetchStreamToken(experience.id);
    console.log(result);
    this.setState({stream: result.stream});
  }

  render() {
    return (
      <View>
        {this.state.stream && this.state.stream.streamKey ? (
          <View>
            <NodeCameraView
              style={styles.nodeCameraView}
              ref={(vb) => {
                this.vb = vb;
              }}
              outputUrl={`rtmp://live.mux.com/app/f1ec3b4c-c4b6-106d-6eab-e3030d952a31`}
              camera={{cameraId: 1, cameraFrontMirror: true}}
              audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
              video={{
                preset: 12,
                bitrate: 400000,
                profile: 1,
                fps: 15,
                videoFrontMirror: false,
              }}
              autopreview={true}
            />
            <Button
              title="request permissions"
              onPress={requestCameraPermission}
            />
            <Button
              onPress={() => {
                if (this.state.isPublish) {
                  this.setState({
                    publishBtnTitle: 'Start Publish',
                    isPublish: false,
                  });
                  this.vb.stop();
                } else {
                  this.setState({
                    publishBtnTitle: 'Stop Publish',
                    isPublish: true,
                  });
                  this.vb.start();
                }
              }}
              title={this.state.publishBtnTitle}
              color="#841584"
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nodeCameraView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
