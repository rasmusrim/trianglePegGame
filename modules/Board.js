import Position from "/modules/Position.js";
import Move from "/modules/Move.js";


export default class Board {
	constructor() {
		this.positions = [];
		this.positions.push(new Position(0, 0));
  	this.positions.push(new Position(0, 1));
  	this.positions.push(new Position(0, 2));
  	this.positions.push(new Position(0, 3));
  	this.positions.push(new Position(0, 4));
    
   	this.positions.push(new Position(1, 0));
   	this.positions.push(new Position(1, 1));
   	this.positions.push(new Position(1, 2));
   	this.positions.push(new Position(1, 3));

   	this.positions.push(new Position(2, 0));
   	this.positions.push(new Position(2, 1));
   	this.positions.push(new Position(2, 2));

   	this.positions.push(new Position(3, 0));
   	this.positions.push(new Position(3, 1));

   	this.positions.push(new Position(4, 0));

  }
  
  addPin(x, y) {
    let position = this.getPosition(x, y);
    position.pin = true;
  }

  removePin(x, y) {
    let position = this.getPosition(x, y);
    position.pin = false;
  }

  fillWithPins() {
    for(let i = 0; i < this.positions.length; i++) {
      this.addPin(this.positions[i].x, this.positions[i].y);
    }
  }
  
  getPosition(x, y) {
      for(let i = 0; i < this.positions.length; i++) {
        if(this.positions[i].x == x && this.positions[i].y == y) {
          return this.positions[i];
        }
      }
      
      return false;

  }
  
    
  getValidMovesForPosition(position) {
    let moves = [
      new Move(new Position(position.x - 2, position.y), new Position(position.x - 1, position.y)),
      new Move(new Position(position.x - 2, position.y + 2), new Position(position.x - 1, position.y + 1)),
      new Move(new Position(position.x, position.y + 2), new Position(position.x, position.y + 1)),
      new Move(new Position(position.x + 2, position.y), new Position(position.x + 1, position.y)),
      new Move(new Position(position.x + 2, position.y - 2), new Position(position.x + 1, position.y - 1)),
      new Move(new Position(position.x, position.y - 2), new Position(position.x, position.y - 1))
    ];
    
    
    let validMoves = [];
    
    for(let i = 0; i < moves.length; i++) {

      if(this.isValidPosition(moves[i].goal) &&
         !this.getPosition(moves[i].goal.x, moves[i].goal.y).pin &&
         this.getPosition(moves[i].step.x, moves[i].step.y).pin
         ) {
        
        
        validMoves.push(moves[i]);
      }
    }
    
    
    
    return validMoves;
    
  }
  
  static getMaxY(x) {
    return x * -1 + 4;
  }

  isValidPosition(position) {
    
    if(position.x < 0 || position.y < 0) {
      return false;
    }
    
    if(position.x > 4) {
      return false;
    }
    
    if(position.y > Board.getMaxY(position.x)) {
      return false;
    }
    
    return true;
    
    
  }

  getAllPossibleMoves() {
      let allPossibleMoves = [];
      
      for(let i = 0; i < this.positions.length; i++) {
        if(!this.positions[i].pin) {
          continue;
        }
        
        let validMoves = this.getValidMovesForPosition(this.positions[i]);
      
        for(let j = 0; j < validMoves.length; j++) {
          validMoves[j].start = this.positions[i];
          allPossibleMoves.push(validMoves[j]);
      }
    }
    
    return allPossibleMoves;
  
  }
  
  countPins() {
    let pins = 0;
    
    for(let i = 0; i < this.positions.length; i++) {
      if(this.positions[i].pin) {
        pins++;
      }
    }
    
    return pins;
  }


  doMove(move) {
    this.removePin(move.start.x, move.start.y);
    this.removePin(move.step.x, move.step.y);
    this.addPin(move.goal.x, move.goal.y);

    
  }
  
  doSimulation() {
    let snapshots = [];
  
    while(true) {
      let allPossibleMoves = this.getAllPossibleMoves();
      if(allPossibleMoves.length === 0) {
        break;
      }
      
      let randomMove = allPossibleMoves[Math.floor(Math.random() * allPossibleMoves.length)];
  
      this.doMove(randomMove);
      
      let snapshot = { board: JSON.parse(JSON.stringify(this)),
                       move: JSON.parse(JSON.stringify(randomMove)) };
      
      snapshots.push(snapshot);
    }

  return snapshots;
    
  }


}
