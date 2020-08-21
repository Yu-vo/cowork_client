import React from 'react'

export const AddExtraParametrs = ({ extraParameters, setExtraParameters }) => {
  const handleClickParametrs = event => {
    event.persist()
    let bool
    event.target.value == false || event.target.value == 'false'
      ? (bool = true)
      : (bool = false)
    setExtraParameters(state => ({
      ...state,
      [event.target.id]: {
        title: event.target.name,
        id: event.target.id,
        value: bool,
        bd: extraParameters[event.target.id].bd,
      },
    }))
  }

  const extraOptions = Object.values(extraParameters).map(item => {
    return (
      <li key={item.title + 'extraOpt'}>
        <label>
          <input
            type="checkbox"
            onClick={handleClickParametrs}
            name={item.title}
            id={item.id}
            value={item.value}
          />
          {item.title}
        </label>
      </li>
    )
  })

  return <ul>{extraOptions}</ul>
}
