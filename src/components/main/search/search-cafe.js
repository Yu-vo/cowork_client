import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import './search-cafe.css'
export const SearchCafe = ({ searchPlace, setSearchPlace }) => {
  const [priceSearch, setPriceSearch] = useState(50)
  const handlePriceSearch = event => {
    setPriceSearch(event.target.value)
  }
  const handleSubmit = () => {
    let quantity = 0
    let findPlace = []
    searchPlace.forEach((place) /*место*/ => {
      quantity = 0
      place.service_cafe.forEach((item) /*услуга*/ => {
        if (parseInt(item.price, 10) <= parseInt(priceSearch, 10)) {
          quantity++
        }
      })
      findPlace.push({ place: place, quantity: quantity })
    })

    setSearchPlace(
      findPlace.sort((a, b) => b.quantity - a.quantity).map(item => item.place)
    )
  }
  return (
    <div className="cafe-parameters">
      <p className="text-search-cafe">
        Выберите сколько максимально готовы потратить за единицу товара(чашку
        кофе, чайник чая и тд.)
      </p>
      <input
        className="range"
        type="range"
        value={priceSearch}
        step={10}
        min={50}
        max={2000}
        onChange={handlePriceSearch}
      ></input>
      <p>
        {priceSearch}
        {'руб'}
      </p>
      <button className="btn-search-cafe" type="button" onClick={handleSubmit}>
        Применить
      </button>
    </div>
  )
}
