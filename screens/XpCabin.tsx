import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  processColor,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import requestCameraAndAudioPermission from '../components/Permission';
import styles from '../components/Style';

interface Props {}
/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
interface State {
  appId: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
}

export default class XpCabin extends Component<Props, State> {
  _engine?: RtcEngine;

  constructor(props) {
    super(props);
    this.state = {
      appId: process.env.REACT_APP_AGORA_KEY,
      channelName: 'channel-x',
      joinSucceed: false,
      peerIds: [],
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const {appId} = this.state;
    this._engine = await RtcEngine.create(appId);
    await this._engine.enableVideo();

    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const {peerIds} = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    // Join Channel using null token and channel name
    await this._engine?.joinChannel(null, this.state.channelName, null, 0);
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({peerIds: [], joinSucceed: false});
  };

  render() {
    return (
      <View style={styles.max}>
        <View style={styles.max}>
          {!this.state.joinSucceed && (
            <View>
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
                Ready?
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
                Press start to begin your experience{' '}
              </Text>

              <Image
                source={require('../assets/Logo.png')}
                style={styles.header}></Image>
            </View>
          )}
          {this._renderVideos()}
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              paddingTop: '5%',
            }}>
            <Icon name="timer" size={40} style={{color: '#000'}}></Icon>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000',
                fontSize: 20,
                marginTop: 5,
                marginRight: '30%',
              }}>
              10.00 mins left
            </Text>
            <Icon name="chat" size={40} style={{color: '#000'}}></Icon>
            <Icon name="microphone" size={40} style={{color: '#000'}}></Icon>
          </View>

          <View style={styles.buttonHolder}>
            {!this.state.joinSucceed && (
              <TouchableOpacity onPress={this.startCall} style={styles.button}>
                <Text style={styles.buttonText}> START </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={this.endCall} style={styles.button}>
              <Text style={styles.buttonText}> END </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const {joinSucceed} = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const {peerIds} = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
}
