import React from 'react'
import { useDispatch } from 'react-redux'
import './app.css'
import { Main } from './main/main'

import { get_places, install_user, favorite_reducer } from '../actions'
// import { getData } from './getdata'
// import { getUser } from './getuser'

// export const history = createBrowserHistory()
export const App = () => {
  const dispatch = useDispatch()
  fetch('http://localhost:3000/getuser', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(res => {
      dispatch(install_user(res.data.user_name, res.data.id_users))
      fetch('http://localhost:3000/getfavorite', {
        method: 'POST',
        body: JSON.stringify({ id_users: res.data.id_users }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          dispatch(favorite_reducer(response))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  fetch('http://localhost:3000/getplaces', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => dispatch(get_places(res)))
    .catch(err => console.log(err))
  return <Main />
}
