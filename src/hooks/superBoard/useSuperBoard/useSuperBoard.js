import {useContext} from 'react';
import {SuperBoardContext} from "../superBoardProvider";
import {calculateWinner} from "../../../components/utils/calculateWinner";

const UseSuperBoard = (boardId) => {
  const { state: {boards, stepNumber, xIsNext, winner}, dispatch } = useContext(SuperBoardContext)

  const endGame = stepNumber === 81

  const calculateSuperWinner = () => {
    return calculateWinner(boards.map(board => board.winner))
  }

  return {
    boards,
    stepNumber,
    xIsNext,
    winner,
    endGame,
    board: boards[boardId],
    restart: () => dispatch({type: 'RESTART'}),
    updateTurn: (squares) => dispatch({type: 'UPDATE_TURN', squares, boardId}),
    setWinner: () => dispatch({type: 'SET_WINNER', boardId}),
    setSuperWinner: () => dispatch({type: 'SET_SUPER_WINNER', winner: calculateSuperWinner()}),
  }
};

export default UseSuperBoard;
