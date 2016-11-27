import React, { Component } from 'react';
import { StyleSheet, NavigatorIOS } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import GamePlay from './GamePlay';
import HomeScreen from './HomeScreen'
import Help from './Help'
import Profile from './Profile'

export default class Wordcross extends Component {

  render() {
    return (
      <Router navigationBarStyle={styles.navBar}>
        <Scene key="root">
          <Scene key="home" component={HomeScreen} title="WordCross" initial={true} />
          <Scene key="gamePlay" component={GamePlay} />
          <Scene key="help" component={Help} />
          <Scene key="profile" component={Profile} />
        </Scene>
      </Router>
    )
  }
}

let styles = StyleSheet.create({
  navBar: {
    backgroundColor: GLOBAL.COLORS.YELLOW
  }
})
