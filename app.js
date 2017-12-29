import Board from "/modules/Board.js";
import View from "/modules/View.js";

for(let i = 0; i < 100000; i++) {

  // Set up board. First fill it with pins, and then remove the one you want.
  var board = new Board();
  board.fillWithPins();
  board.removePin(0,4); // Syntax (x-coordinate, y-coordinate). The coordinates start at 0
   
  snapshot = board.doSimulation(); // Do the simulation and return a snapshot of the game. This snapshot can later be sent to the a view.

  let numberOfPins = board.countPins();

  if(numberOfPins == 1) {
    break;
  }

}

// Send simulation result to view-tool to display it.
let view = new View(snapshot);
view.start();
