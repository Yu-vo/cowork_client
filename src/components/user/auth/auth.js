import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { install_user, favorite_reducer } from '../../../actions'

export const Auth = ({ setRedirect }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    login: '',
    password: '',
  })
  const onClick = event => {
    event.preventDefault()
    getUserData()
  }
  const onChange = event => {
    event.persist()
    setData(data => {
      return { ...data, [event.target.name]: event.target.value }
    })
  }
  const getUserData = () => {
    fetch('http://localhost:3000/auth', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'applicat ion/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          if (!localStorage.getItem('token')) {
            localStorage.setItem('token', res.token)
          } else {
            localStorage.removeItem('token')
            localStorage.setItem('token', res.token)
          }
          localStorage.setItem('token', res.token)

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
        } else alert('Логин или пароль введены не правильно')

        dispatch(install_user(res.data.user_name, res.data.id_users))
        setRedirect(true)
      })
      .catch(err => console.log(err))
  }
  return (
    <form className="form">
      <div>Авторизация</div>
      <input
        name="login"
        type="text"
        value={data.login}
        onChange={onChange}
        placeholder=" Логин"
      />
      <input
        name="password"
        type="password"
        value={data.password}
        onChange={onChange}
        placeholder=" Пароль"
      />
      <button className="btn" onClick={onClick} name="reg">
        Войти
      </button>
    </form>
  )
}
