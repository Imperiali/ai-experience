import React from 'react';
import './square.css';
import {calculateWinner} from "../utils/calculateWinner";
import {useBoard} from "../../hooks/board";

const Square = (props) => {
  const { squareId } = props;

  const {history, xIsNext, updateTurn, stepNumber} = useBoard()

  const handleClick = () => {
    const current = history[history.length - 1]; //pega o array corrente do history
    const squares = current.squares.slice(); //faz uma cópia do objeto que esta no array current

    if (calculateWinner(squares) || squares[squareId]) {
      return;
    }

    squares[squareId] = xIsNext ? 'X' : 'O';

    updateTurn(squares)
  }

  const current = history[stepNumber];

  return (
    <button className="square" onClick={handleClick}>
      {current.squares[squareId]}
    </button>
  )
}
export default Square;
