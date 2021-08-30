import React, {useMemo, useReducer} from 'react';

export const SuperBoardContext = React.createContext()

const InitialState = {
  boards: Array(9).fill({
    squares: Array(9).fill(null),
    winner: null
  }),
  winner: null,
  stepNumber: 0, //determina em qual jogada o jogo esta
  xIsNext: true, //determina quem é o próximo a jogar X ou O
}

export const superBoardReducer = (state, action) => {
  switch (action.type) {
    case 'RESTART':
      return InitialState
    case 'SET_SUPER_WINNER':
      return {
        ...state,
        winner: action.winner
      }
    case 'SET_WINNER':
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index !== action.boardId) return board
          return {
            ...board,
            winner: state.xIsNext ? 'O' : 'X'
          }
        }),
      }
    case 'UPDATE_TURN':
      return {
        boards: state.boards.map((board, index) => {
            if (index !== action.boardId) return board
            return {
              ...board,
              squares: action.squares
            }
          }),
        stepNumber: state.stepNumber + 1,
        xIsNext: !state.xIsNext,
      }
    default:
      return state
  }
}
const SuperBoardProvider = ({ children}) => {
  const [state, dispatch] = useReducer(superBoardReducer, InitialState)
  const contextValue = useMemo(() => ({state, dispatch}), [state, dispatch])

  return <SuperBoardContext.Provider value={contextValue}>{children}</SuperBoardContext.Provider>
};

export default SuperBoardProvider;
