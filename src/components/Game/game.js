import React, {useEffect} from 'react';
import './game.css';
import Title from '../../assets/title.png';
import Logo from '../../assets/logo.png';
import SuperBoard from "../SuperBoard";
import {useSuperBoard} from "../../hooks/superBoard";
import {calculateWinner} from "../utils/calculateWinner";

const Game = () => {
  const { restart, boards, winner, endGame, stepNumber, xIsNext, availableMoves, lastMove, checkAvailableMoves, updateTurn } = useSuperBoard()

  const getRandomPlay = (moves) => {
    const max = moves.length
    let randomPlay = Math.floor(Math.random() * (max + 1))
    console.log('moves[randomPlay]', moves[randomPlay])
    if (!moves[randomPlay] || moves[randomPlay] === lastMove[1]) {
      console.log('lastMove', lastMove)
      return getRandomPlay(moves)
    }
    return moves[randomPlay]
  }

  const random = (board) => {
    let randomPlay = Math.floor(Math.random() * (board.length + 1))
    if (board[randomPlay] !== null) {
      return random(board)
    }
    return randomPlay
  }

  const simulateTurns = (board, firstMove = -1) => {
    const hasMoves = board.filter(square => !square).length > 0
    const hasWinner = calculateWinner(board)
    if (hasMoves && !hasWinner) {
      const numericBoard = board.map(square => {
        if (square === 'X') return 1
        else if (square === 'O') return 0
        return square
      })

      const turn = numericBoard.reduce((acc, cur) => {
        if (cur === 1) acc++
        else if (cur === 0) acc--
        return acc
      }) ? 'O' : 'X'

      const play = random(board)
      board[play] = turn
      firstMove = firstMove === -1 ? play : -1
      return simulateTurns(board, firstMove)
    }
    return [hasWinner, firstMove]
  }

  const iaTurn = () => {
    let _board = boards[lastMove[0]].squares.slice()

    const [winner, move] = simulateTurns(_board)

    console.log('winner', winner)
    console.log('move', move)

  }

  useEffect(() => {
    checkAvailableMoves()
    if (!xIsNext && stepNumber > 0){
      iaTurn()
    }
    // eslint-disable-next-line
  }, [xIsNext])

  return (
    <div className="game">
      <div>
        <img id="imgjogo" src={Logo} alt="Jogo da velha"/>
        <img width='100%' className='image-title' src={Title} alt="Jogo da velha"/>
      </div>
      <div>
        <SuperBoard/>
        {
          winner ?
            <div>
              <div>
                Ganhador: {winner}
              </div>
              <button className="historyButton" onClick={() => restart()}>Vá para o início do jogo</button>
            </div> :
            endGame &&
            <div>
              <h1>
                Deu velha!
              </h1>
              <button className="historyButton" onClick={() => restart()}>Vá para o início do jogo</button>
            </div>
        }
      </div>
    </div>
  );

}

export default Game;
