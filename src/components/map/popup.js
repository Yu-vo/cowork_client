import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Popup } from 'react-map-gl'
import { ImageParam } from '@components/main/place-list/image-param'
import '@components/main/place-list/place-list.css'

export const Popupi = ({ item }) => {
  const [popupInfo, setPopupInfo] = useState(null)
  useEffect(() => {
    if (item) setPopupInfo(item)
  }, [item])
  const colorPlace = item => {
    switch (item) {
      case 'Coworking':
        return 'rgb(249, 193, 188)'
      case 'Kafe':
        return 'rgb(207, 224, 234)'
      case 'Library':
        return 'rgb(189, 181, 206)'
      case 'Another type of place':
        return 'rgb(186, 215, 204)'
      default:
        'rgb(0, 0, 0)'
    }
  }
  const renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.long}
          latitude={popupInfo.lat}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <Link to={`/place-info?id=${item.id_place}`} id={item.id_place}>
            <div
              className="title"
              style={{
                backgroundColor: `${colorPlace(item.form_place)}`,
                fontSize: '2em',
              }}
            >
              {item.title_place}
            </div>
            <img
              src={popupInfo.foto_data}
              alt="Фото"
              width="512px"
              height="384px"
            ></img>
            <p>Nearest metro: {popupInfo.metro_place}</p>
            <p>Address: {popupInfo.adress_place}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="icon">
                <ImageParam places={item} />
              </div>
              <div className="price" style={{ fontSize: '1.2em' }}>
                <div style={{ margin: '0', padding: '0' }}>
                  {item.price[0] ? (
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
                          '₽/day' /*item.price[0].currency*/}
                      </div>
                    )
                  ) : null}
                </div>
                {item.price[1] ? (
                  item.price[1].currency == 'Руб/нед' ? (
                    <div key={item.price[1].key}>
                      {item.price[0].price +
                        ' ' +
                        '₽/week' /*item.price[0].currency*/}
                    </div>
                  ) : (
                    <div key={item.price[0].key}>
                      {item.price[1].price +
                        ' ' +
                        '₽/day' /*item.price[0].currency*/}
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </Link>
        </Popup>
      )
    )
  }
  return <div>{renderPopup()}</div>
}
