import React, { useState } from 'react'

export const AddExtraParametrsCafe = ({ parametersCafe, setParametrsCafe }) => {
  const [inputHeadline, setInputHeadline] = useState('')
  const [inputParameters, setInputParameters] = useState('')
  const [inputPrice, setInputPrice] = useState('')
  const [headline, setHeadline] = useState([])
  // input
  const handleHeadline = event => {
    setInputHeadline(event.target.value)
  }
  const handleParameters = event => {
    setInputParameters(event.target.value)
  }
  const handlePrice = event => {
    setInputPrice(event.target.value)
  }
  // 1
  const handleAddHeadline = event => {
    event.persist()
    setHeadline(headline => [
      ...headline,
      {
        headline: inputHeadline,
        key: Math.floor(Math.random() * Math.floor(1000000)),
      },
    ])
    setInputHeadline('')
  }
  // 2
  const handleListParameters = event => {
    event.persist()
    setParametrsCafe(headline => [
      ...headline,
      {
        headline: event.target.name,
        parameters: inputParameters,
        price: inputPrice,
        key: Math.floor(Math.random() * Math.floor(1000000)),
      },
    ])
  }
  // 2
  let listOption
  const renderList = headline => {
    listOption = parametersCafe
      .filter(item => item.headline == headline)
      .map(item => {
        return (
          <div key={item.key}>
            {item.parameters} - {item.price + ' руб'}
          </div>
        )
      })
  }
  // 1
  const listParameters = headline.map(item => {
    return (
      <div key={item.key}>
        <h3>{item.headline}</h3>
        {renderList(item.headline)}
        {listOption}
        <input type="text" onChange={handleParameters}></input>
        <input type="number" onChange={handlePrice}></input>
        <button
          type="button"
          onClick={handleListParameters}
          name={item.headline}
        >
          Добавить
        </button>
      </div>
    )
  })

  return (
    <div>
      <p>Введите заголовок</p>
      <input
        type="text"
        onChange={handleHeadline}
        value={inputHeadline}
      ></input>
      <button type="button" onClick={handleAddHeadline}>
        Добавить
      </button>
      <div>{listParameters}</div>
    </div>
  )
}
