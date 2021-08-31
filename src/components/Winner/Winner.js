import React from 'react';
import './Winner.css'
import classnames from "classnames";

const Winner = (props) => {
  const { winner, superWinner } = props

  const imageUrl = winner === 'X'
    ? 'https://contmoura.com.br/wp-content/uploads/2019/09/x-png-icon-8.png'
    : 'https://i.imgur.com/rCwsdBw.png'

  return <div className={classnames('image-wrapper', {
    'super': superWinner
  })}>
    <img width='100%' height='100%' className='image' src={imageUrl} alt={winner}/>
  </div>
};

export default Winner;
