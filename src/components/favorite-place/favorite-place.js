import React, { useRef } from 'react'
import { PlaceList } from '@components/main/place-list/place-list'
import { useSelector } from 'react-redux'

import './favorite-place.css'

export const FavoritePlaces = () => {
  const places = useSelector(store => store.places)
  const placesFavorite = useSelector(store => store.favorite_places)
  const placeslist = useRef(null)
  if (places && placesFavorite) {
    placeslist.current = places.data.filter(place =>
      placesFavorite.data.find(item => item.id_places == place.id_place)
    )
  }
  return placesFavorite &&
    placesFavorite.data &&
    placesFavorite.data.length != 0 ? (
    <>
      <h1 style={{ marginLeft: '10%' }}>Избранные места</h1>
      <PlaceList places={placeslist.current} />
    </>
  ) : (
    <>
      <h1 style={{ marginLeft: '10%' }}>Избранные места</h1>
      <p className="none-place">Мест добавлено не было</p>
    </>
  )
}
