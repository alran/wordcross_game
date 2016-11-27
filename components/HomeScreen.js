import React, { Component } from 'react';
import Login from './Login'
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

GLOBAL = require('../modules/Global.js');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.isLoggedIn = this.isLoggedIn.bind(this)
  }
  isLoggedIn() {
    return false
    // check if user is logged in
  }

  render() {
    if (this.isLoggedIn()){
      return(<Login />)
    } else {
      return(
        <View style={{flex: 1}}>
          <View style={styles.content}>
            <TouchableHighlight onPress={Actions.gamePlay} style={styles.button}>
              <Text style={styles.buttonText}>Solo Game</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={Actions.gamePlay} style={styles.button}>
              <Text style={styles.buttonText}>Multiplayer Game</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={Actions.help} style={styles.button}>
              <Text style={styles.buttonText}>How To Play</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={Actions.profile} style={styles.button}>
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    }
  }
}

let styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GLOBAL.COLORS.LIGHTPURPLE
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    height: 50,
    backgroundColor: GLOBAL.COLORS.GREEN,
    borderRadius: 8,
    margin: 10,
    width: GLOBAL.DIMENSIONS.WIDTH * .9,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 24
  }
});
