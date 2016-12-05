import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';

export default class BoardDropArea extends Component {
  constructor(props) {
    super(props);
      this.state = {
        partOfCorrectWord: null,
        dropZoneValues: null
      };
    }
  setDropZoneValues(event) {
    this.props.addBoardDropZone(event.nativeEvent.layout, this.props.index)
  }

  render() {
    return (
      <View style={styles.boardDropArea} onLayout={this.setDropZoneValues.bind(this)} />
    )
  }
}


let styles = StyleSheet.create({
  boardDropArea: {
    width: GLOBAL.LETTERSIZE + 1,
    height: GLOBAL.LETTERSIZE + 1,
    backgroundColor: GLOBAL.COLORS.LIGHTPURPLE,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#fff'
  }
})
