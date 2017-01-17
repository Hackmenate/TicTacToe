import React, { Component } from 'react';
import './styles/App.css';
import Box from './app_components/Box.jsx';

let displayCharacters = {
  false: 'X',
  true: 'O',
  null: 'n'
}

let checkRow = (row) => {
    let result = row.reduce((acc, cell) => cell !== null && cell === acc ? cell : undefined)
    return result !== undefined ? null : result;
}

let checkRows = (board) => {
  for (let row of board) {
    let rowResult = checkRow(row);
    if (rowResult !== undefined) {
      return rowResult;
    }
  }
  return null;
}

let checkColumns = (board) => {
  for (var i = 0; i < board[0].length; i++) {
    let columnResult = checkRow(board.map(row => row[i]));
    if (columnResult !== undefined) {
      return columnResult;
    }
  }
  return null;
}

let checkDiagonals = (board) => {
  let majorDiagonal = board.map((row, index) => row[index]);
  let minorDiagonal = board.map((row, index) => row[row.length - 1 - index]);
  let checkMajor = checkRow(majorDiagonal);
  let checkMinor = checkRow(minorDiagonal);
  return checkMajor !== null ? checkMajor : checkMinor;
}

let checkBoard = (board) => {
  let rows = checkRows(board);
  let columns = checkColumns(board);
  let diagonals = checkDiagonals(board);

  if (rows !== null) return rows;
  if (columns !== null) return columns;
  else return diagonals;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [null, null, null].map(row => [null, null, null]),
      whoseTurn: false
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.checkWin();
  }

  clickHandler (row, column) {
    let { whoseTurn, board } = this.state;
    let newBoard = Object.assign(board);
    newBoard[row][column] = whoseTurn;

    this.setState({
      board: newBoard,
      whoseTurn: !whoseTurn
    })
  }

  checkWin () {
    let win = checkBoard(this.state.board);
    if (win !== null) {
      alert (`player ${ win ? "2" : "1" } wins!`);
    }
  }

  render() {
    let { state: { board }, clickHandler } = this;
    return (
      <div className="App">
        { [0, 1, 2].map(row => {
          return <div className="ttt-row" key={ row }>
            {
              [0, 1, 2].map(column => {
                let display = displayCharacters[board[row][column]];
                return <Box value={ display } clickHandler={ () => clickHandler(row, column) } key={ row * 3 + column } />
              })
            }
          </div>
        }) }
      </div>
    );
  }
}

export default App;
