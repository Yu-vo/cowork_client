import React, { useState } from 'react'

export const AddPrice = ({ price, setPricePlace }) => {
  const [priceInput, setPriceInput] = useState(0)
  const [priceCurrency, setPriceCurrency] = useState('Руб/мин')
  const [priceDescription, setPriceDescription] = useState('')

  const handleChangeDescrition = event => {
    setPriceDescription(event.target.value)
    console.log(event.target.value)
  }
  const handleChangePrice = event => {
    setPriceInput(event.target.value)
  }
  const handleChangeCurrency = event => {
    setPriceCurrency(event.target.value)
  }
  const handleAddData = () => {
    setPricePlace(price => [
      ...price,
      {
        price: parseInt(priceInput, 10),
        currency: priceCurrency,
        description: priceDescription,
        key: priceInput + Math.floor(Math.random() * Math.floor(1000000)),
      },
    ])
  }
  const handleDeleteData = event => {
    event.persist()
    setPricePlace(price => price.filter(item => item.key != event.target.id))
    console.log(price)
  }
  const entered = price.map(price => {
    return (
      <div key={price.key}>
        <p>{price.description}</p>
        <p>{price.price + '  ' + price.currency}</p>
        <button type="button" onClick={handleDeleteData} id={price.key}>
          -
        </button>
      </div>
    )
  })
  const option = [
    { title: 'Руб/мин' },
    { title: 'Руб/час' },
    { title: 'Руб/день' },
    { title: 'Руб/нед' },
    { title: 'Руб/мес' },
  ]
  const priceOption = option.map(item => {
    return (
      <option key={item.title} value={item.title}>
        {item.title}
      </option>
    )
  })
  return (
    <div>
      <p>Введите краткое пояснение и цену</p>
      <input onChange={handleChangeDescrition} type="text"></input>
      <input
        onChange={handleChangePrice}
        id="pricePlace"
        type="number"
        placeholder="Цена"
        value={priceInput}
      ></input>
      <div>
        <select value={priceCurrency} onChange={handleChangeCurrency}>
          {priceOption}
        </select>
      </div>
      <button type="button" onClick={handleAddData}>
        +
      </button>
      {price && entered}
    </div>
  )
}
