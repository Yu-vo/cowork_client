import React, { useEffect, useState, useRef } from 'react'
import mapboxgl, { GeolocateControl } from 'mapbox-gl'
import * as Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
mapboxgl.accessToken =
  'pk.eyJ1IjoieXVyYXZvaXQiLCJhIjoiY2s3enRyMDQwMDlzajNrcGd0NmR2NG83cSJ9.IuepPO9Dwfjc9It7d1yyjw '

export const MapPlace = () => {
  const [viewport, setViewPort] = useState({
    width: '100%',
    height: 900,
    latitude: 59.889095,
    longitude: 30.315868,
    zoom: 10,
  })
  let mapContainer = useRef()
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
    })
    map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'top-left'
    )
    let directions = new Directions({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
    })
    map.on('load', function() {
      directions.setOrigin([30.3154759725082, 59.9101501810682])
      // directions.addWaypoint(0, [59.9101501810682, 30.3154759725082])
      // directions.addWaypoint(1, [-0.12416858, 51.50779757])
      directions.setDestination([30.05282, 59.57278])
    })
    console.log(map.addControl(directions, 'top-left'))
  }, [])
  return (
    <div>
      <div
        ref={el => (mapContainer = el)}
        style={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          width: '100%',
          height: 900,
        }}
      />
    </div>
  )
}
