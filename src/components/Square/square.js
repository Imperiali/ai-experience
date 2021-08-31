import React from 'react';
import './square.css';
import {calculateWinner} from "../utils/calculateWinner";
import {useSuperBoard} from "../../hooks/superBoard";

const Square = (props) => {
  const { squareId, boardId } = props;

  const { board, xIsNext, updateTurn } = useSuperBoard(boardId)

  const handleClick = () => {
    if (calculateWinner(board.squares) || board.squares[squareId]) {
      return;
    }

    const squares = board.squares.slice()
    squares[squareId] = xIsNext ? 'X' : 'O';

    updateTurn(squares)
  }

  return (
    <button className="square" onClick={() => handleClick()}>
      {board.squares[squareId]}
    </button>
  )
}
export default Square;
