import React from 'react'

export const Button = ({ color, children, id, handleBtn, value }) => {
  return (
    <button
      type="button"
      onClick={handleBtn}
      id={id}
      value={value}
      style={
        value
          ? {
              backgroundColor: `${color}`,
              padding: '25px',
              width: '400px',
              border: `13px solid ${color}`,
              fontSize: '25px',
            }
          : {
              backgroundColor: 'white',
              padding: '25px',
              width: '400px',
              border: `13px solid ${color}`,
              fontSize: '25px',
            }
      }
    >
      {children}
    </button>
  )
}
