import React, { useState } from 'react'

import './search-extra.css'

export const SearchExtra = ({ searchPlace, setSearchPlace }) => {
  const [extraParameters, setExtraParameters] = useState({
    0: { title: 'the Internet', id: '0', value: false, bd: 'internet' },
    1: {
      title: 'Storage of things',
      id: '1',
      value: false,
      bd: 'save_item',
    },
    2: {
      title: '24 hour work',
      id: '2',
      value: false,
      bd: 'round_clock',
    },
    3: {
      title: 'Works seven days a week',
      id: '3',
      value: false,
      bd: 'not_weekend',
    },
    4: {
      title: 'Conference hall',
      id: '4',
      value: false,
      bd: 'conference_hall',
    },
    5: {
      title: 'Zoning space',
      id: '5',
      value: false,
      bd: 'zoning',
    },
    6: {
      title: 'Fixed workplace',
      id: '6',
      value: false,
      bd: 'static_seat',
    },
    7: { title: 'Kitchen', id: '7', value: false, bd: 'kitchen' },
    8: {
      title: 'Food court',
      id: '8',
      value: false,
      bd: 'food_court',
    },
    9: {
      title: 'Coffee and cookies',
      id: '9',
      value: false,
      bd: 'coffee_cookies',
    },
    10: { title: 'Cooler', id: '10', value: false, bd: 'cooler' },
    11: { title: 'Printer', id: '11', value: false, bd: 'printer' },
    12: { title: 'Projector', id: '12', value: false, bd: 'projector' },
    13: {
      title: 'TV',
      id: '13',
      value: false,
      bd: 'television',
    },
    14: {
      title: 'Personal computers',
      id: '14',
      value: false,
      bd: 'PC',
    },
    15: {
      title: 'Specialized equipment',
      id: '15',
      value: false,
      bd: 'specialized_equipment',
    },
    16: { title: 'Secretary', id: '16', value: false, bd: 'secretary' },
    17: {
      title: 'Specialized services',
      id: '17',
      value: false,
      bd: 'specialized_service',
    },
    18: {
      title: 'Leisure',
      id: '18',
      value: false,
      bd: 'leisure',
    },
    19: {
      title: 'Writing instruments',
      id: '19',
      value: false,
      bd: 'writing_supplies',
    },
  })
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
  const handleSearchBtn = () => {
    const findPlace = []
    let quantity
    if (searchPlace && searchPlace.length > 0)
      searchPlace.forEach(place => {
        quantity = 0
        for (let key in place) {
          for (let key_1 in extraParameters) {
            if (
              key == extraParameters[key_1].bd &&
              place[key] == extraParameters[key_1].value &&
              place[key]
            ) {
              quantity++
            }
          }
        }
        findPlace.push({ quantity: quantity, place: place.id_place })
      })
    else alert('Выберите тип коворкинг-зоны')
    findPlace
      .sort((a, b) => b.quantity - a.quantity)
      .filter(item => item.quantity != 0)

    setSearchPlace(places =>
      findPlace.map(
        id =>
          places.filter(place => {
            if (id.place == place.id_place) return place
          })[0]
      )
    )
  }
  const extraOptions = Object.values(extraParameters).map(item => {
    return (
      <li key={item.title + 'extraOp'} className="li-list-parameters">
        <label
          className="item-list"
          style={
            item.value
              ? {
                  border: 'solid 1px blue',
                  backgroundColor: 'rgb(233,239,243)',
                }
              : { border: 'solid 1px grey', backgroundColor: 'white' }
          }
        >
          <input
            style={{ visibility: 'hidden' }}
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
  return (
    <div className="extra-search-param">
      <ul className="list-parameters">{extraOptions}</ul>
      <button
        className="btn-parameters"
        type="button"
        onClick={handleSearchBtn}
      >
        Apply
      </button>
    </div>
  )
}
