import React from 'react';
import Board from './components/Board';
import Modal from './components/Modal';
import './styles/Game.css';

class Game extends React.Component {
  state = {
    xNextTic: true,
    rowInd: [0, 1, 2],
    squareInd: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    squareVal: Array(9).fill(null),
    isGameComplete: '',
    show: false
  }



  // Function activated when square is clicked
  clickedSquare = (key) => {
    const { xNextTic, squareVal } = this.state;
    squareVal[key] = !xNextTic?'o':'x';

    this.setState({ xNextTic: !xNextTic });

    this.gameCompleted();
  }



  //  Checks to see if there is a winner or draw or neither
  gameCompleted = () => {
    const { squareVal } = this.state;

    const possibilites = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Loops through win possibilites to verify winner
    for (let i = 0; i < possibilites.length; i++) {
      const [x, y, z] = possibilites[i];
      if (squareVal[x] && squareVal[x] === squareVal[y] && squareVal[x] === squareVal[z]) {
        this.setState({ isGameComplete: squareVal[x], show: true });

        alert(`Player '${this.state.isGameComplete.toUpperCase()}' wins!`);
        return;
      } else if (squareVal[x] !== squareVal[y] && squareVal[x] !== squareVal[z] && !squareVal.includes(null)) {
        alert('DRAW!');
        return;
      }
    }

    return null;
  }



  render() {
    return (
      <div className="Game">
        <Modal />
        <Board
          rowInd={this.state.rowInd}
          clickedSquare={this.clickedSquare}
          squareInd={this.state.squareInd}
          squareVal={this.state.squareVal}
        />
      </div>
    );
  }
}

export default Game;
