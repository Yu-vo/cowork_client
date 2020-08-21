import React, { useState } from 'react'
import MapGL, { GeolocateControl, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import cafe from '../../../assets/noun_Cafe_945724.svg'
export const AddGeodata = ({ setEvent }) => {
  const TOKEN =
    'pk.eyJ1IjoieXVyYXZvaXQiLCJhIjoiY2s3enRyMDQwMDlzajNrcGd0NmR2NG83cSJ9.IuepPO9Dwfjc9It7d1yyjw'
  const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px',
  }
  const [viewport, setViewPort] = useState({
    width: '100%',
    height: 900,
    latitude: 59.939095,
    longitude: 30.315868,
    zoom: 10,
  })
  const [marker, setMarker] = useState({ lat: 59.939055, long: 30.315465 })

  const onViewportChange = viewport =>
    setViewPort({ ...viewport, transitionDuration: 0 })

  const logDragEvent = event => {
    setEvent({ long: event.lngLat[0], lat: event.lngLat[1] })
  }

  const onMarkerDragEnd = event => {
    logDragEvent(event)
    setMarker({ long: event.lngLat[0], lat: event.lngLat[1] })
  }
  return (
    <MapGL
      {...viewport}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v10"
      onViewportChange={onViewportChange}
    >
      <div>Захват маркера происходит двойным щелчком</div>
      <Marker
        key="59.939055"
        latitude={marker.lat}
        longitude={marker.long}
        offsetTop={-20}
        offsetLeft={-10}
        draggable={true}
        onDragEnd={onMarkerDragEnd}
      >
        <img src={cafe} width="50px" height="50px" alt=""></img>
      </Marker>
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
    </MapGL>
  )
}
