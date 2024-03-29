import React from 'react';
import './square.css';
import {calculateWinner} from "../utils/calculateWinner";
import {useSuperBoard} from "../../hooks/superBoard";

const Square = (props) => {
  const { squareId, boardId } = props;

  const { board, updateTurn } = useSuperBoard(boardId)

  const handleClick = () => {
    if (calculateWinner(board.squares) || board.squares[squareId]) {
      return;
    }

    updateTurn(boardId, squareId)
  }

  return (
    <button className="square" onClick={() => handleClick()}>
      {board.squares[squareId]}
    </button>
  )
}
export default Square;
