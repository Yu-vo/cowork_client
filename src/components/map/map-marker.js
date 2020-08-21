import React, { useState, useEffect } from 'react'
import { Marker } from 'react-map-gl'
import cafe from '../../assets/noun_Cafe_945724.svg'
import library from '../../assets/noun_Library_192179.svg'
import coworking from '../../assets/noun_Laptop_666863.svg'
import other from '../../assets/noun_Map Marker_33200.svg'
import { useSelector } from 'react-redux'

export const MapMarker = ({ handleOnClick }) => {
  const places = useSelector(store => store.places)
  const [marker, setMarker] = useState([])
  useEffect(() => {
    if (places) {
      setMarker(
        places.data.map(item => {
          return {
            ...item,
          }
        })
      )
    }
  }, [places])
  const image = form => {
    switch (form) {
      case 'Coworking':
        return coworking
      case 'Kafe':
        return cafe
      case 'Library':
        return library
      default:
        return other
    }
  }
  const markerItem = marker.map(item => {
    return (
      <Marker
        key={item.lat + item.long + 'long'}
        latitude={item.lat}
        longitude={item.long}
      >
        <img
          src={image(item.form_place)}
          width="50px"
          height="50px"
          alt=""
          onClick={() => handleOnClick(item)}
          style={{
            cursor: 'pointer',
            fill: '#d00',
            stroke: 'none',
            transform: `translate(${-50 / 2}px,${-50}px)`,
          }}
        ></img>
      </Marker>
    )
  })
  return markerItem
}
