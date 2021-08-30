import React, {useState} from 'react';
import Board from '../Board';
import './game.css';
import Title from '../../assets/title.png';
import Logo from '../../assets/logo.png';
import HistoryTitle from '../../assets/historyTitle.png';

//determina o ganhador do jogo
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

const Game = () => {
  const [state, setState] = useState({
        history: [{ //histórico de jogadas vários array contento a o valor que foi adicionado no square X ou O
          squares: Array(9).fill(null),
        }],
        stepNumber: 0, //determina em qual jogada o jogo esta
        xIsNext: true, //determina quem é o próximo a jogar X ou O
  })

  //evento click do mouse do Square
  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1); //retorna uma cópia do array
    const current = history[history.length - 1]; //pega o array corrente do history
    const squares = current.squares.slice(); //faz uma cópia do objeto que esta no array current

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = state.xIsNext ? 'X' : 'O';

    setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  }


  const jumpTo = (step) => {
    setState({
      ...state,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Vá para a jogada #' + move :
      'Vá para o início do jogo';
    return (
      <li key={move}>
        <button className="historyButton" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'GANHADOR: ' + winner;
  } else {
    status = 'PRÓXIMO JOGADOR: ' + (state.xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div>
        <img id="imgjogo" src={Logo} alt="Jogo da velha" />
        <img src={Title} alt="Jogo da velha" />
      </div>
      <div>
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div><h1>{status}</h1></div>
      <div>
        <img src={HistoryTitle} alt="histórico de jogadas" />
        <ol>{moves}</ol>
      </div>
    </div>
  );

}
export default Game;
