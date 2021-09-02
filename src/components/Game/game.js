import React, {useEffect} from 'react';
import './game.css';
import Title from '../../assets/title.png';
import Logo from '../../assets/logo.png';
import SuperBoard from "../SuperBoard";
import {useSuperBoard} from "../../hooks/superBoard";

const Game = () => {
  const { restart, winner, endGame, stepNumber, xIsNext, availableMoves, checkAvailableMoves, updateTurn } = useSuperBoard()

  const getRandomPlay = (max) => {
    let randomPlay = Math.floor(Math.random() * (max + 1))
    if (!availableMoves[randomPlay]) {
      return getRandomPlay(max)
    }
    return availableMoves[randomPlay]
  }

  useEffect(() => {
    checkAvailableMoves()
    if (!xIsNext && stepNumber > 0){
      const [boardId, squareId] = getRandomPlay(availableMoves?.length)
      updateTurn(boardId, squareId)
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
