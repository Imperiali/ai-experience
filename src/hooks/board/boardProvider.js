import React, {useMemo, useReducer} from 'react';

export const BoardContext = React.createContext()

const initialState = {
  history: [{ //histórico de jogadas vários array contento a o valor que foi adicionado no square X ou O
    squares: Array(9).fill(null),
  }],
  stepNumber: 0, //determina em qual jogada o jogo esta
  xIsNext: true, //determina quem é o próximo a jogar X ou O
}

export const boardReducer = (state, action) => {
  switch (action.type) {
    case 'RESTART':
      return initialState
    case 'UPDATE_TURN':
      return {
        history: state.history.concat([{
          squares: action.squares,
        }]),
        stepNumber: state.history.length,
        xIsNext: !state.xIsNext,
      }
    default:
      return state
  }
}
const BoardProvider = ({ children}) => {
  const [state, dispatch] = useReducer(boardReducer, initialState)
  const contextValue = useMemo(() => ({state, dispatch}), [state, dispatch])

  return <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>
};

export default BoardProvider;
