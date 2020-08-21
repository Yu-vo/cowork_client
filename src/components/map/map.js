import React, { useState } from 'react'
import MapGL, { GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { MapMarker } from '@components/map/map-marker'
import { Popupi } from '@components/map/popup'
import { TOKEN } from '../../meta'

export const Maps = () => {
  const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px',
  }
  const [viewport, setViewPort] = useState({
    width: '100%',
    height: 900,
    latitude: 59.889095,
    longitude: 30.315868,
    zoom: 10,
  })
  const _onViewportChange = viewport => {
    const minLongitude = 30,
      maxLongitude = 31,
      minLatitude = 59.5,
      maxLatitude = 60
    if (viewport.longitude < minLongitude) {
      viewport.longitude = minLongitude
    } else if (viewport.longitude > maxLongitude) {
      viewport.longitude = maxLongitude
    } else if (viewport.latitude < minLatitude) {
      viewport.latitude = minLatitude
    } else if (viewport.latitude > maxLatitude) {
      viewport.latitude = maxLatitude
    }
    setViewPort({ ...viewport, transitionDuration: 0 })
  }
  const [popup, setPopup] = useState(null)
  const handleOnClick = data => {
    setPopup(data)
    console.log(data)
  }
  return (
    <div style={{ margin: '0 auto' }}>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={_onViewportChange}
      >
        <MapMarker handleOnClick={handleOnClick} />
        <Popupi item={popup} />
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  )
}
