import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import search_icon from '@assets/noun_Search_274721.svg'
import './search-line.css'

export const SearchLine = ({
  searchPlace,
  setSearchPlace,
  setSearchText,
  searchText,
  check,
  setCheck,
  activeExtraParameters,
}) => {
  const allPlaces = useSelector(store => store.places)
  const [arrayWord, setArrayWord] = useState([])

  const handleChange = event => {
    setSearchText(event.target.value)
  }
  const handleBlur = () => {
    let str
    if (searchText.length > 0) {
      str = searchText.replace(/\s{2,}/g, ' ')
      setArrayWord(str.split(' '))
    }
  }
  const handleCheck = () => {
    setCheck(value => !value)
  }
  const handleClick = () => {
    let findPlace = []
    if (searchText.length > 0) {
      if (searchPlace && searchPlace.length > 0) {
        check
          ? allPlaces.data.forEach(place =>
              arrayWord.forEach(word => {
                if (
                  place.title_place.toLowerCase().indexOf(word.toLowerCase()) !=
                    -1 ||
                  place.adress_place
                    .toLowerCase()
                    .indexOf(word.toLowerCase()) != -1 ||
                  place.metro_place.toLowerCase().indexOf(word.toLowerCase()) !=
                    -1
                )
                  findPlace.push(place.id_place)
              })
            )
          : searchText.length > 0 && searchPlace
          ? searchPlace.forEach(place =>
              arrayWord.forEach(word => {
                if (
                  place.title_place.toLowerCase().indexOf(word.toLowerCase()) !=
                    -1 ||
                  place.adress_place
                    .toLowerCase()
                    .indexOf(word.toLowerCase()) != -1 ||
                  place.metro_place.toLowerCase().indexOf(word.toLowerCase()) !=
                    -1
                )
                  findPlace.push(place.id_place)
              })
            )
          : null
        const bufPlace = findPlace.sort()
        let buf = []
        let j = 0
        let q = 0
        for (let i = 0; i < bufPlace.length; i++) {
          i = j
          q = 0
          for (; j < bufPlace.length; j++, q++) {
            if (bufPlace[j] != bufPlace[i]) {
              buf.push({ quantity: q, place: bufPlace[i] })
              break
            }
            if (bufPlace.length - 1 == j)
              buf.push({ quantity: q + 1, place: bufPlace[i] })
          }
        }
        buf.sort((a, b) => a.quantity - b.quantity)
        check
          ? setSearchPlace(
              buf.map(
                id =>
                  allPlaces.data.filter(place => id.place == place.id_place)[0]
              )
            )
          : setSearchPlace(places =>
              buf.map(
                id =>
                  places.filter(place => {
                    if (id.place == place.id_place) return place
                  })[0]
              )
            )
      } else
        alert('Выберите тип коворкинг-зоны или нажмите "Искать по всем местам"')
    } else alert('Поисковая строка пустая')
  }
  return (
    <div className="search">
      <label>
        <span
          className="all-search"
          style={
            activeExtraParameters
              ? {
                  backgroundColor: 'grey',
                  pointerEvents: 'none',
                }
              : check
              ? {
                  backgroundColor: 'green',
                }
              : { backgroundColor: 'white' }
          }
        >
          Search all places
          <input
            type="checkbox"
            onChange={handleCheck}
            checked={check}
            // style={

            // { visibility: 'hidden' }
            // activeExtraParameters
            //   ? {
            //       pointerEvents: 'none',
            //     }
            //   : null

            // }
          ></input>
        </span>
      </label>
      <div className="search-line">
        <input
          className="search-input"
          type="text"
          placeholder="Enter street, place name or nearest metro"
          onBlur={handleBlur}
          onChange={handleChange}
          value={searchText}
          style={
            activeExtraParameters
              ? { backgroundColor: 'grey', pointerEvents: 'none' }
              : { backgroundColor: 'white' }
          }
        />
        <button
          onClick={handleClick}
          type="button"
          className="btn"
          style={
            activeExtraParameters
              ? { backgroundColor: 'grey', pointerEvents: 'none' }
              : { backgroundColor: 'white' }
          }
        >
          <img src={search_icon} width="40px" alt=""></img>
        </button>
      </div>
    </div>
  )
}
