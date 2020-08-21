import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { state_search_reducer } from '../../../actions'

import { Button } from '@ui'
import { Spinner } from '@ui'

import { SearchLine } from './search-line'
import { PlaceList } from '../place-list/place-list'
import './search.css'
import { SearchExtra } from '@components/main/search/search-extra'
import { SearchCafe } from '@components/main/search/search-cafe'

import up from '@assets/up.svg'
import down from '@assets/down.svg'

export const Search = () => {
  const dispatch = useDispatch()
  const places = useSelector(store => store.places)
  const type = useSelector(store => store.type)
  const [defaultPlace, setDefaultPlace] = useState(null)

  const search_state = useSelector(store => store.state_search)

  const [activeExtraParameters, setActiveExtraParameters] = useState(false)
  const [check, setCheck] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [searchPlace, setSearchPlace] = useState(null)

  const [spinner, setSpinner] = useState(false)

  const [typePlace, setTypePlace] = useState(
    type
      ? type
      : [
          {
            id: 'cowork',
            value: false,
            name: 'Coworking',
            color: 'rgb( 249, 193, 188)',
          },
          {
            id: 'caffee',
            value: false,
            name: 'Cafe',
            color: 'rgb( 207, 224, 234)',
          },
          {
            id: 'library',
            value: false,
            name: 'Library',
            color: 'rgb( 189, 181, 206)',
          },
          {
            id: 'other',
            value: false,
            name: 'Another type of place',
            color: 'rgb( 186, 215, 204)',
          },
        ]
  )
  useEffect(() => {
    if (places) {
      typePlace.forEach(typePlace => {
        if (typePlace.value) {
          const place = places.data.filter(
            place => typePlace.name == place.form_place
          )
          setSearchPlace(search_state ? search_state : place)
          dispatch(state_search_reducer(defaultPlace))
          // setDefaultPlace(place)
        }
      })
    }
  }, [typePlace])
  useEffect(() => {
    if (check)
      setTypePlace([
        {
          id: 'cowork',
          value: false,
          name: 'Coworking',
          color: 'rgb( 249, 193, 188)',
        },
        {
          id: 'caffee',
          value: false,
          name: 'Cafe',
          color: 'rgb( 207, 224, 234)',
        },
        {
          id: 'library',
          value: false,
          name: 'Library',
          color: 'rgb( 189, 181, 206)',
        },
        {
          id: 'other',
          value: false,
          name: 'Another type of place',
          color: 'rgb( 186, 215, 204)',
        },
      ])
  }, [check])

  useEffect(() => {
    if (places && searchPlace) setDefaultPlace(places)
  }, [])

  const handleBtnSearch = event => {
    event.persist()
    setSpinner(true)
    setCheck(false)
    setTypePlace(typePlace =>
      typePlace.map(item => {
        if (item.value) {
          return { ...item, value: !item.value }
        } else if (event.target.id == item.id) {
          return { ...item, value: !item.value }
        } else return { ...item }
      })
    )
  }
  const handleActiveExtraParameters = () => {
    setActiveExtraParameters(value => !value)
  }
  const listtype = typePlace.map(item => {
    return (
      <li className="li-item-type" key={item.name + item.id}>
        <Button
          value={item.value}
          color={item.color}
          id={item.id}
          handleBtn={!item.value ? handleBtnSearch : null}
        >
          {item.name}
        </Button>
      </li>
    )
  })
  return (
    <>
      <div className="search-text">
        Cowork! - a service that will help you find your place.
      </div>
      {places ? (
        <>
          <ul className="type-place">{listtype}</ul>
          <div className="main-search">
            <SearchLine
              searchPlace={
                places &&
                searchPlace &&
                (searchPlace.length = places.data.length)
                  ? searchPlace
                  : defaultPlace
              }
              setSearchPlace={setSearchPlace}
              searchText={searchText}
              setSearchText={setSearchText}
              check={check}
              setCheck={setCheck}
              activeExtraParameters={activeExtraParameters}
            />
            <div className="btn-active" onClick={handleActiveExtraParameters}>
              {activeExtraParameters ? (
                <img src={up} alt="" width="20px"></img>
              ) : (
                <img src={down} alt="" width="20px"></img>
              )}
              Search by extra parameters
            </div>
            {activeExtraParameters && !typePlace[1].value && (
              <SearchExtra
                searchPlace={searchPlace}
                setSearchPlace={setSearchPlace}
              />
            )}
            {activeExtraParameters && typePlace[1].value && (
              <SearchCafe
                searchPlace={searchPlace}
                setSearchPlace={setSearchPlace}
              />
            )}
            <PlaceList
              places={searchPlace}
              typePlace={typePlace}
              spinner={spinner}
              setSpinner={setSpinner}
            />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}
