export default class View {
  constructor(snapshots) {
    this.snapshots = snapshots;
    this.currentSnapshot = 0;
  }
  
  start() {
  document.getElementById('previous-step-button').addEventListener('click', () => this.showPreviousStep());
  document.getElementById('next-step-button').addEventListener('click', () => this.showNextStep());
  
  this.refresh();
  }
  
  refresh() {
    this.draw(this.snapshots[this.currentSnapshot]);
    document.getElementById('step').innerHTML = this.currentSnapshot + 1;
  }
  
  showPreviousStep() {
    this.currentSnapshot--;
    this.refresh();
  }
  
  showNextStep() {
    console.log('Next');
    this.currentSnapshot++;
    this.refresh();
  }
  
  draw(snapshot) {
    
    let board = snapshot.board;
    let move = snapshot.move;
    
    for(let i = 0; i < board.positions.length; i++) {
      let position = document.getElementById(board.positions[i].x + '_' + board.positions[i].y);
  
      position.classList.remove('with-pin', 'without-pin', 'start', 'goal');
  
      if(board.positions[i].pin) {
        position.classList.add('with-pin');
        position.classList.remove('without-pin');
        
      } else {
        position.classList.remove('with-pin');
        position.classList.add('without-pin');
      }
    }
    
    let start = document.getElementById(move.start.x + '_' + move.start.y);
    let goal = document.getElementById(move.goal.x + '_' + move.goal.y);
    
    start.classList.add('start');
    goal.classList.add('goal');
    
  }
  
  
}