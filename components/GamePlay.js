import React, { Component } from 'react';
import Letter from './Letter';
import BoardDropArea from './BoardDropArea';
import HomeScreen from './HomeScreen';
import Timer from './Timer';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Animated,
  PanResponder
} from 'react-native';

export default class GamePlay extends Component {
    constructor(props) {
      super(props);
        let allPieces = this.setUp()
        this.state = {
          availablePieces: allPieces,
          userHand: [],
          lettersOnBoard: [],
          gameStarted: false,
          dropZoneValues: [],
          heightOfLettersArea: null,
          boardDropAreas: {},
          numAreas: 300,
          loading: false
        }
      }
    setUp() {
      gamePieces = []
      for (let i = 0; i < Object.keys(GLOBAL.PIECES).length; i++) {
        let letter = Object.keys(GLOBAL.PIECES)[i]
        for (let j = 0; j < GLOBAL.PIECES[letter]; j++) {
          gamePieces.push(letter)
        }
      }
      return gamePieces
    }
    isDropZone(gesture){
      if (this.state.availablePieces.length < 4)
        return false

      let dz = this.state.dropZoneValues

      return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height
    }
    isBoardArea(gesture){
      let isBoardArea = false
      let boardDropAreas = this.state.boardDropAreas
      let yValues = Object.keys(boardDropAreas)
      for (let i = 0; i < yValues.length; i++) {
        let y = yValues[i]
        let xValues = boardDropAreas[y]

        for (let i = 0; i < xValues.length; i++){
          let x = xValues[i]
          let onDropArea = (gesture.moveY > y && gesture.moveY < y + GLOBAL.LETTERSIZE) && (gesture.moveX > x && gesture.moveX < x + GLOBAL.LETTERSIZE) // duplicate code here with method below
          if (onDropArea) { isBoardArea = true }
        }
      }
      return isBoardArea
    }
    placeLetterOnBoard(gesture){
      let boardDropAreas = this.state.boardDropAreas
      let placesLetterTouches = []
      let yValues = Object.keys(boardDropAreas)
      for (let i = 0; i < yValues.length; i++) {
        let y = parseInt(yValues[i])
        let xValues = boardDropAreas[y]

        for (let i = 0; i < xValues.length; i++){
          let x = xValues[i]
          let onDropArea = (gesture.moveY > y && gesture.moveY < y + GLOBAL.LETTERSIZE) && (gesture.moveX > x && gesture.moveX < x + GLOBAL.LETTERSIZE)
          if (onDropArea){
            placesLetterTouches.push([x, y])
          }
        }
      }
      // insert logic for deciding which area of the board the letter will be placed in.
      // if the place on the board is already occupied, x and y coordinates will be 0 (the letter will bounce back)
      // return object with x and y coordinates
      let selectedSpace = placesLetterTouches[0]
      return {x: selectedSpace[0], y: selectedSpace[1]}
    }
    passOutUserHand() {
      let indexesAndUserhand = this.choosePieces(14)
      this.removeByIndex(indexesAndUserhand[0])
      return indexesAndUserhand[1]
    }
    removeByIndex(indexArray){
      indexArray = indexArray.sort((a, b) => { return b - a })
      for (let i = indexArray.length - 1; i >= 0; i--){
        this.state.availablePieces.splice(indexArray[i], 1);
      }
    }
    removeFromHand(letter){
      let index = this.state.userHand.indexOf(letter)
      this.state.userHand.splice(index, 1)
    }
    choosePieces(numPieces){
      let max = this.state.availablePieces.length - 1
      let rand_nums = []
      let userHand = []
      for (let i = 0; rand_nums.length < numPieces; i++) {
        rand = Math.floor(Math.random() * max)
        if (!rand_nums.indexOf(rand) > -1) {
          rand_nums.push(rand)
          userHand.push(this.state.availablePieces[rand])
        }
      }
      return [rand_nums, userHand]
    }
    componentWillMount() {
      let userHand = this.passOutUserHand()
      this.setState({userHand: userHand})
    }
    exchangeForThree(counter, letter) {
      let availablePieces = this.state.availablePieces
      if (availablePieces.length > 1) {
        let indexesAndUserhand = this.choosePieces(3)
        this.removeByIndex(indexesAndUserhand[0])
        this.removeFromHand(letter)
        this.setState({
          availablePieces: availablePieces.concat([letter]),
          userHand: this.state.userHand.concat(indexesAndUserhand[1])
        })
      }
    }
    setDropZoneValues(event) { // referring to exchange area drop zone
      this.setState({dropZoneValues: event.nativeEvent.layout})
    }
    setHeightOfLettersArea(event) { this.setState({heightOfLettersArea: event.nativeEvent.layout.height}) }
    setUpBoardDropAreas() {
      let boardDropAreas = []
      let self = this

      for (let i = 0; i < this.state.numAreas; i++) {
        boardDropAreas.push(
          <BoardDropArea
            key={i}
            index={i}
            addBoardDropZone={self.addBoardDropZone.bind(self)}
          />
        )
      }
      return boardDropAreas
    }
    addBoardDropZone(zone, index) {
      let boardDropAreas = this.state.boardDropAreas
      if (boardDropAreas[zone.y]) {
        let current = boardDropAreas[zone.y]
        current.push(zone.x)
        boardDropAreas[zone.y] = current
      } else {
        boardDropAreas[zone.y] = [zone.x]
      }

      let loading = index == this.boardGameAreas - 1 ? false : true
      this.setState({boardDropAreas: boardDropAreas, loading: loading})
    }
    iterateThroughPieces(){
      let self = this
      let counter = 0

      return self.state.userHand.map((letter, counter) => {
        counter ++
        return self.piece(letter, counter)
      })
    }
    piece(letter, counter) {
      let self = this
      return (
        <Letter
          key={counter}
          letter={letter}
          isDropZone={self.isDropZone.bind(self)} // exchange area
          isBoardArea={self.isBoardArea.bind(self)} // board area with places for letter
          exchangeForThree={self.exchangeForThree.bind(self)}
          placeLetterOnBoard={self.placeLetterOnBoard.bind(self)}
        />
      )
    }
    render() {
      let self = this
      let counter = 0
      let pieces = this.state.userHand.map((letter, counter) => {
        counter ++
        return self.piece(letter, counter)
      })
      let boardDropAreas = this.setUpBoardDropAreas()

      return (
        <View style={{flex: 1}}>
          <View style={styles.board}>
            <View style={styles.containerForBoard}>
              {boardDropAreas}
            </View>
          </View>
          <View
            style={styles.container}
            onLayout={this.setHeightOfLettersArea.bind(this)}>
            {this.iterateThroughPieces()}
          </View>
          <View
            onLayout={this.setDropZoneValues.bind(this)}
            style={styles.exchangeArea}>
              <Text>Drop Letter Here to Exchange</Text>
          </View>
          <View style={styles.stats}>
            <View style={styles.statsElement}>
              <Timer />
            </View>
            <View style={styles.statsElement}>
              <Text style={{textAlign: 'center'}}>Points</Text>
            </View>
            <View style={styles.statsElement}>
              <Text style={{textAlign: 'center'}}>User Info</Text>
            </View>
          </View>
        </View>
      )
    }
}

let styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLORS.LIGHTPURPLE,
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
    bottom: 80,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  containerForBoard: {
    width: GLOBAL.DIMENSIONS.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  board: {
    marginTop: 65,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  exchangeArea: {
    height: 40,
    backgroundColor: GLOBAL.COLORS.TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    backgroundColor: GLOBAL.COLORS.YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    bottom:0,
    left:0,
    right:0,
    position: 'absolute'
  },
  statsElement: {
    width: GLOBAL.DIMENSIONS.WIDTH * .3
  }
});
