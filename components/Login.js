import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

GLOBAL = require('../modules/Global.js');


export default class Login extends Component {
  constructor(props) {
    super(props)
      this.state = {
        user: null
      }
    this.login = this.login.bind(this)
  }
  login() {
    console.log('trying to login')
  }

  render() {
    let _this = this
    let user = this.state.user

    return (
      <View style={{flex: 1}}>
        <View style={styles.background}>
          <Image
            source={require('../images/background.png')}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.loginContainer}>
          <TouchableHighlight onPress={this.login} style={styles.button}>
            <Text>Login with Facebook</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    width: GLOBAL.DIMENSIONS.WIDTH,
    height: GLOBAL.DIMENSIONS.HEIGHT,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'stretch',
  },
  button: {
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
    height: 50,
    backgroundColor: GLOBAL.COLORS.YELLOW
  }
})
