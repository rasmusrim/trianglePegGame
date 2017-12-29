import Board from "/modules/Board.js";
import View from "/modules/View.js";

var snapshots;
var minPins;

var tmpBoard = new Board();

//for(let j = 0; j < tmpBoard.positions.length; j++) {

  minPins = 10;

  for(let i = 0; i < 100000; i++) {
  
    var board = new Board();
    board.fillWithPins();
    //board.removePin(tmpBoard.positions[j].x,tmpBoard.positions[j].y);
    board.removePin(0,4);
    
    snapshots = board.doSimulation();
    
    let numberOfPins = board.countPins();
    
    if(numberOfPins < minPins) {
      
      minPins = numberOfPins;
    }
    
    if(numberOfPins == 1) {
      break;
    }

  }
  
  //console.log(tmpBoard.positions[j].x + ", " + tmpBoard.positions[j].y + " - " + minPins);
//}


let view = new View(snapshots);
view.start();
