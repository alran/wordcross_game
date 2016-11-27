import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
} from 'react-native';

GLOBAL = require('../modules/Global.js');

export default class Letter extends Component {
  constructor(props) {
    super(props);
      this.state = {
        showTile: true,
        pan: new Animated.ValueXY()
      }
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null,{
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }]),
        onPanResponderRelease: (e, gesture) => {
          this.state.pan.flattenOffset()
          if (this.props.isDropZone(gesture)){ //exchange drop zone
            this.props.exchangeForThree(this.props.counter, this.props.letter)
            this.setState({showTile: false})
          } else if (this.props.isBoardArea(gesture)) {
            let newCoordinates = this.props.placeLetterOnBoard(gesture)
            console.log('here are the new coordinates: ', newCoordinates)
            // is the value in the pan an offset not the absolute?
            // Animated.spring(
            //   this.state.pan,
            //   {toValue: {x: 0, y: 0}}
            // ).start();
            // Animated.event([null,{
            //   dx: this.state.pan.x,
            //   dy: this.state.pan.y
            // }])
            console.log('pan', this.state.pan)
            // insert logic for moving the letter piece to the exact coordinates of the board drop area
          } else {
            Animated.spring(
              this.state.pan,
              {toValue: {x: 0, y: 0}}
            ).start();
          }
        },
        onPanResponderGrant: (e, gestureState) => {
          this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
          this.state.pan.setValue({x: 0, y: 0});
        }
      });
  }

  render() {
    if (this.state.showTile) {
      return(
        <View key={this.props.counter}>
          <Animated.View {...this.panResponder.panHandlers} style={[this.state.pan.getLayout(), styles.letterPieces]}>
            <Text> {this.props.letter} </Text>
          </Animated.View>
        </View>
      )
    }

    return (<View />)
  }
}


let styles = StyleSheet.create({
  letterPieces: {
    margin: 5,
    width: GLOBAL.LETTERSIZE,
    height: GLOBAL.LETTERSIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLORS.BEIGE
  }
});
