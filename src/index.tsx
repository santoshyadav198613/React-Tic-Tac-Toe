import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Button from "@material-ui/core/Button";
import * as serviceWorker from "./serviceWorker";
import AppBar from "./appBar";

// class Square extends React.Component<any, any> {

//     constructor(props: any) {
//         super(props);
//     }

//     render() {
//         return (
//             <button className="square" onClick={() => this.props.onClick() }>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props: any) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component<any, any> {
  // constructor(props: any) {
  //     super(props);
  //     this.state = {
  //         squares: Array(9).fill(null),
  //         xIsNext: true,
  //     }
  // }

  // handleClick(i: number) {
  //     const squares = this.state.squares.slice();
  //     if (calculateWinner(squares) || squares[i]) {
  //         return;
  //     }
  //     squares[i] = this.state.xIsNext ? 'X' : 'O';
  //     this.setState({
  //         squares: squares,
  //         xIsNext: !this.state.xIsNext,
  //     });
  // }

  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status: any;
    // if (winner) {
    //     status = 'Winner: ' + winner;
    // } else {
    //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step: any, move: any) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </Button>
        </li>
      );
    });

    let status: any;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <AppBar />

        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: any) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
