# Wordcross [work-in-progress]

Wordcross is a React Native word game app with a Rails 5 backend API. Players combine letters into words, with each word being connected to every other word by at least one letter (similar to the look of a crossword puzzle). In the solo version of the game, players compete against their own high scores, calculated via a combination of word quality and time spent completing the round. In the multiplayer version, players pull from the same letter collection and race to complete their words first.

##Technologies

React Native

##Background

Gameplay was inspired by the offline game Bananagrams.

## Work in Progress / To Do

- [ ] Use sockets to enable multiplayer games
- [ ] Write logic for points and scoring in solo mode
- [ ] Facebook OAuth
- [ ] Fill out help / how-to section
- [ ] Tweak Animation so that when letter is placed on board, it latches into place in specific square on board
- [ ] Use dictionary to check played words
- [ ] Highlight words that are incorrectly spelled
