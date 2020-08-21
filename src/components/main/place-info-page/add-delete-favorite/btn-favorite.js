import React from 'react'
import icon from '@assets/noun_Favorite.svg'

import './btn-favorite.css'

export const BtnFavorite = ({ btnState, setBtnState, setBtnStateActive }) => {
  const handleClick = () => {
    setBtnStateActive(true)
    setBtnState(state => !state)
  }
  return (
    <button
      className="btnFavorite"
      type="button"
      onClick={handleClick}
      style={
        btnState ? { backgroundColor: 'yellow' } : { backgroundColor: 'white' }
      }
    >
      <img src={icon} width="40px" alt=""></img>
    </button>
  )
}
