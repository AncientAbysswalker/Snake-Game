# Snake Game

![Example gif](https://raw.githubusercontent.com/AncientAbysswalker/Snake-Game/master/md/header.gif)

## Working Demo

A working demo can be found live here:

https://ancientabysswalker.github.io/Snake-Game/

## Implementation

A simple implementation of the classic snake game on an HTML Canvas using TypeScript.

My implementation uses a 2D array of game objects (class instances) to track the game - thus enforcing only one object per location. The snake is implemented with two classes - one class represents the individual snake segments (and associated variables), and the other class keeps track of the head and tail of the snake and governs movement. All game behavior for movement is governed by checking the location the snake is moving into and acting accordingly.

I decided to play around with some more interesting options once my base engine was complete and added the following features:

- Point values (and colors) vary for generated food pellets
- There are more than one possible map to load, with separate high-scores
- Multiplayer Mode that tallies wins for both players, making for high-intensity competative play!
- Ability to reset high-scores and multiplayer scores
