import React, {useEffect} from 'react';
import './game.css';
import Title from '../../assets/title.png';
import Logo from '../../assets/logo.png';
import SuperBoard from "../SuperBoard";
import {useSuperBoard} from "../../hooks/superBoard";
import {calculateWinner} from "../utils/calculateWinner";

const Game = () => {
  const { restart, boards, winner, endGame, stepNumber, xIsNext, lastMove, checkAvailableMoves, updateTurn } = useSuperBoard()

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

  const scoreManager = (board, scores, winner) => {
    if(winner === 'O') {
      board.forEach((player, pos) => {
        if (player === 'O') scores[pos] += 1
        if (player === 'X') scores[pos] -= 1
      })
    } else if (winner === 'X') {
      board.forEach((player, pos) => {
        if (player === 'O') scores[pos] -= 1
        if (player === 'X') scores[pos] += 1
      })
    }
    return scores
  }

  const classification = (board, trials) => {
    let scores = Array(9).fill(0)
    for (let i = 0; i < trials; i++) {
      const _board = board.slice()
      const [ winner ] = simulateTurns(_board)
      scores = scoreManager(_board, scores, winner)
    }
    return scores
  }

  const bestMove = (moves, board, scores) => {
    let _scores = scores.slice()
    _scores.forEach((score, move) => {
      if (!(move in moves)) _scores[move] = -1
      if (board[move] === 'X') _scores[move] = -1
    })
    return _scores.indexOf(Math.max(..._scores))
  }

  const iaTurn = () => {
    let [ boardId ] = lastMove

    let hasMoves = boards[boardId].squares.filter(square => !square).length > 0

    if (calculateWinner(boards[boardId].squares) || !hasMoves) {

      let _board = boards.map(board => {
        let winner = board.winner ? board.winner : null
        const isDraw = board.squares.filter(Boolean).length > 9

        return winner || isDraw
      } ).slice()

      console.log('_board', _board)

      const scores = classification(_board, 20)

      let moves = _board.map((move, pos) => {
        if (move) return pos
      })

      boardId = bestMove(moves, _board, scores)
    }

    console.log('boardId', boardId)

    let _board = boards[boardId].squares.slice()

    const scores = classification(_board, 20)

    let moves = _board.map((move, pos) => {
      if (move) return pos
    })


    const move = bestMove(moves, _board, scores)

    updateTurn(boardId, move)
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
