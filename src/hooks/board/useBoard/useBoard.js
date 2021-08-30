import {useContext} from 'react';
import {BoardContext} from "../boardProvider";
import {calculateWinner} from "../../../components/utils/calculateWinner";

const UseBoard = () => {
  const { state: {history, stepNumber, xIsNext}, dispatch } = useContext(BoardContext)

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const endGame = stepNumber === 9

  return {
    history,
    stepNumber,
    xIsNext,
    winner,
    endGame,
    current,
    restart: () => dispatch({ type: 'RESTART' }),
    updateTurn: (squares) => dispatch({ type: 'UPDATE_TURN', squares })
  }
};

export default UseBoard
