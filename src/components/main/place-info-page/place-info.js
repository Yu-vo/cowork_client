import React, { useRef, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { favorite_reducer } from '../../../actions'

import './place-info.css'
import './comment-visible.css'
import { ImageParam } from '@components/main/place-list/image-param'
import { Comment } from '@components/main/place-info-page/comment'
import { CommentVisible } from '@components/main/place-info-page/comment-visible'
import { MapPlace } from '@components/main/place-info-page/place-map/place-map'
import { BtnFavorite } from '@components/main/place-info-page/add-delete-favorite/btn-favorite'

export const PlaceInfo = () => {
  const places = useSelector(store => store.places)
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const place = useRef('')
  const liTimeWork = useRef('')
  const price = useRef('')
  const priceCafe = useRef('')
  const select_menu = ['Price', 'Schedule', 'Location']
  const [selectState, setSelectState] = useState(null)

  const [btnState, setBtnState] = useState(false)
  const [btnStateActive, setBtnStateActive] = useState(false)
  const [updateComments, setUpdateComments] = useState(false)

  const [rating, setRating] = useState(0)

  const favorite_places = useSelector(store => store.favorite_places)
  useEffect(() => {
    // console.log(favorite_places)
    // console.log(place.current.id_place)
    // console.log(favorite_places.data.includes(place.current.id_place))
    if (favorite_places && place.current.id_place) {
      console.log('-------------------------')
      if (
        favorite_places.data.find(
          item => item.id_places == place.current.id_place
        )
      ) {
        console.log('работаеттттттттттт')
        setBtnState(true)
      }
    }
  }, [])
  useEffect(() => {
    if (btnStateActive && btnState && places && user)
      fetch('http://localhost:3000/addfavorite', {
        method: 'POST',
        body: JSON.stringify({
          user: user[1],
          place: place.current.id_place,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(
        fetch('http://localhost:3000/getfavorite', {
          method: 'POST',
          body: JSON.stringify({ id_users: user[1] }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(response => {
            console.log(response)
            dispatch(favorite_reducer(response))
          })
          .catch(err => console.log(err))
      )
    if (btnStateActive && !btnState && places && user)
      fetch('http://localhost:3000/deletefavorite', {
        method: 'POST',
        body: JSON.stringify({
          user: user[1],
          place: place.current.id_place,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(
        fetch('http://localhost:3000/getfavorite', {
          method: 'POST',
          body: JSON.stringify({ id_users: user[1] }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(response => {
            console.log(response)
            dispatch(favorite_reducer(response))
          })
          .catch(err => console.log(err))
      )
  }, [btnState])
  const handleSelectMenu = event => {
    setSelectState(event)
  }
  const select = select_menu.map(item => (
    <li className="select-li" key={item} onClick={() => handleSelectMenu(item)}>
      {item}
    </li>
  ))
  if (places) {
    place.current = places.data.find(item => {
      if (item.id_place == window.location.search.split('=')[1]) return item
    })

    liTimeWork.current = Object.getOwnPropertyNames(
      place.current.working_day
    ).map(value => {
      const key = value
      const val = place.current.working_day[value]
      switch (value) {
        case 'mon':
          return <li key={key}>Понедельник: {val} </li>
        case 'tue':
          return <li key={key}>Вторник: {val} </li>
        case 'ven':
          return <li key={key}>Среда: {val} </li>
        case 'tho':
          return <li key={key}>Четверг: {val} </li>
        case 'fri':
          return <li key={key}>Пятница: {val} </li>
        case 'sat':
          return <li key={key}>Суббота: {val} </li>
        case 'sun':
          return <li key={key}>Воскресенье: {val} </li>
        default:
          return 0
      }
    })
    price.current = place.current.price.map(item => {
      return (
        <div
          key={item.key}
          style={{ borderLeft: 'solid 15px grey', paddingLeft: '5px' }}
        >
          <p>{item.description}</p>
          <p>{item.price + item.currency}</p>
        </div>
      )
    })
    const unique = array => {
      const result = []
      array.forEach(item => {
        if (!result.includes(item.headline)) result.push(item.headline)
      })
      console.log(result)
      return result
    }
    const parametersCafe = headline => {
      return place.current.service_cafe
        .filter(item => headline == item.headline)
        .map(item => (
          <li key={item.key}>
            {item.parameters} - {item.price + ' руб'}{' '}
          </li>
        ))
    }
    priceCafe.current = unique(place.current.service_cafe).map(item => (
      <div key={'hedline' + item}>
        <h3>{item}</h3>
        <ul>{parametersCafe(item)}</ul>
      </div>
    ))
  }
  console.log(place.current)
  const stars = stars => {
    let rating = 0
    if (stars)
      stars.data.forEach(item => {
        rating += item.rating
      })
    rating /= stars.data.length
    setRating(rating ? rating.toFixed(1) : 0)
  }
  return (
    <div className="body-info-place">
      <div className="top-info-place">
        <h1>{place.current.title_place}</h1>
        {user && (
          <BtnFavorite
            btnState={btnState}
            setBtnState={setBtnState}
            setBtnStateActive={setBtnStateActive}
          />
        )}
      </div>
      <div>
        <h3>
          <div className="rating-mini">
            <span className="active"></span>
          </div>
          {rating}
        </h3>
      </div>
      <div>
        <div className="top-parameters">
          <div className="web">
            <p>
              Веб-сайт и соцсети:{' '}
              <a href={'http://www.' + place.current.web}>
                {place.current.web}
              </a>
            </p>
          </div>
          <div className="adress">
            <p>Адрес: {place.current.adress_place}</p>
          </div>
          <div className="metro">
            <p>Ближайшее метро: {place.current.metro_place}</p>
          </div>
          <img src={place.current.foto_data} alt="Фото" width="100%"></img>
        </div>
        <div>
          <h2>Описание</h2>
          <p>{place.current.description}</p>
        </div>
        <ul className="select-list">{select}</ul>
        {places && selectState == 'Price' ? (
          <>
            <div>{priceCafe.current}</div>
            <div>{price.current}</div>
          </>
        ) : selectState == 'Schedule' ? (
          <div>
            <ul>{liTimeWork.current}</ul>
          </div>
        ) : selectState == 'Location' ? (
          <MapPlace />
        ) : null}
        <div>
          {place.current.form_place != 'Кафе' && <h2>Услуги</h2>}
          <ImageParam places={place.current} name={true} />
        </div>
      </div>
      {user && places && (
        <Comment
          setUpdateComments={setUpdateComments}
          id_place={place.current.id_place}
          id_user={user[1]}
        />
      )}
      <h2>Отзывы</h2>
      {places && (
        <CommentVisible
          updateComments={updateComments}
          id_place={place.current.id_place}
          stars={stars}
        />
      )}
    </div>
  )
}
