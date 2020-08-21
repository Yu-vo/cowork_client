import React from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { type_reducer, state_search_reducer } from '../../../actions'

import './place-list.css'
import { ImageParam } from './image-param'
import { Spinner } from '@ui'

export const PlaceList = ({ places, typePlace, spinner }) => {
  const dispatch = useDispatch()
  let liPlace = []
  const colorPlace = item => {
    switch (item) {
      case 'Coworking':
        return 'rgb(249, 193, 188)'
      case 'Cafe':
        return 'rgb(207, 224, 234)'
      case 'Library':
        return 'rgb(189, 181, 206)'
      case 'Another type of place':
        return 'rgb(186, 215, 204)'
      default:
        'rgb(0, 0, 0)'
    }
  }
  const handleClick = () => {
    if (typePlace) dispatch(type_reducer(typePlace))
    dispatch(state_search_reducer(places))
  }

  if (places) {
    let priceList = null
    liPlace = places.map(item => {
      item.price.length > 0
        ? (priceList = item.price ? (
            item.price[0].currency == 'Руб/нед' ? (
              <div key={item.price[0].key}>
                {item.price[0].price +
                  ' ' +
                  '₽/week' /*item.price[0].currency*/}
              </div>
            ) : (
              <div key={item.price[0].key}>
                {item.price[0].price +
                  ' ' +
                  '₽/hour' /*item.price[0].currency*/}
              </div>
            )
          ) : null)
        : (priceList = '')
      return (
        <li className="li" key={item.id_place}>
          <Link
            to={`/place-info?id=${item.id_place}`}
            id={item.id_place}
            onClick={handleClick}
          >
            <div
              className="title"
              style={{
                backgroundColor: `${colorPlace(item.form_place)}`,
              }}
            >
              {item.title_place}
            </div>
            <div className="icon">
              <ImageParam places={item} />
            </div>
            <div className="main">
              <img
                src={item.foto_data}
                alt="Фото"
                width="100%"
                // height="500px"
              ></img>
              <div className="position">
                <div>
                  <div>
                    <p>Nearest metro: {item.metro_place}</p>
                  </div>
                  <div>
                    <p>Address: {item.adress_place}</p>
                  </div>
                </div>
                <div className="price">{priceList}</div>
              </div>
            </div>
          </Link>
        </li>
      )
    })
  }

  return (
    <>
      {liPlace.length > 0 ? (
        <ul className="list">{liPlace ? liPlace : spinner && <Spinner />}</ul>
      ) : places ? (
        <div className="none-place">Нет совпадений по поисковому запросу</div>
      ) : (
        <div className="none-place">
          Выберете тип коворкинг-зоны и выполните поиск
        </div>
      )}
    </>
  )
}
