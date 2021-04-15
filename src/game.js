import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick = {() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props){
    return (
      <button className="square" onClick = {props.onClick}>
        {props.value}
      </button>
    );
   
}
class Board extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     squares: Array(9).fill(null),
  //     xturn: true}

  // }
  
  renderSquare(i) {
    return <Square value={this.props.squares[i]}
    onClick={()=>this.props.onClick(i)}
    />;
  }
  reset_Board()
  {
    this.setState({squares: Array(9).fill(null),
      xturn: true});
    
  }
  
  render() {
    // const winner= calculateWinner(this.state.squares);
    // let status;
    
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
        {/* <button onClick = {() => this.props.reset_Board()}> {"Restart Game"}</button> */}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={history:[{squares: Array(9).fill(null)}], 
  xturn: true,
  stepnum: 0}
  
  }

  handleClick(i)
  {
    const hist= this.state.history.slice(0,this.state.stepnum+1);;
    const current= hist[hist.length-1];
    const sq= current.squares.slice();
    
    if(calculateWinner(sq) || sq[i]){
      return;}
    sq[i]=this.state.xturn ? 'X' : 'O';

    this.setState({
      history: hist.concat([{squares: sq}]),
      xturn: !this.state.xturn,
      stepnum: hist.length
    });
  }
  reset_Board()
  {
    this.setState({history:[{squares: Array(9).fill(null)}], 
                  xturn: true,
                  stepnum: 0});
  }
  jumpTo(step)
  {
    this.setState({stepnum: step,
    xturn: (step%2)=== 0,
  })
  }
  render() {
    const history= this.state.history;
    const current= history[this.state.stepnum];
    const winner= calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key = {move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status
    if(winner)
    {
      status = "Winner: " + winner +  " !!! Start New Match !!!";
    }
    else
    {
      status='Player Turn: ' + (this.state.xturn ? 'X' : 'O');
    }
    let allfill = checknull(current.squares);
    if(allfill && !winner)
    {
      status="Game Draw !!! Restart Match "
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
          onClick={(i) => this.handleClick(i)}/>
        </div>
        
        <div className="game-info">
          <div className="status">{status}</div>
          <div>
          <button onClick = {() => this.reset_Board()}>
            {"Restart Game"}
          </button>
        </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function checknull(squares)
{
  for(let i=0;i<squares.length; i++)
  {
      if(squares[i]==null)
      {
        return false;
      }
  }
  return true;
}

export default Game