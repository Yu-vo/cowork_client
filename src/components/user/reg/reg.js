import React, { useState } from 'react'

import './reg.css'

export const Registr = ({ setRedirect }) => {
  const [dataUser, setdataUser] = useState({
    userName: '',
    login: '',
    password: '',
  })
  const onClick = event => {
    event.preventDefault()
    if (
      dataUser.userName.length > 3 &&
      dataUser.login.length > 3 &&
      dataUser.password.length > 3
    ) {
      fetch('http://localhost:3000/getallusers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          const logBuf = response.data.filter(
            element => element.login == dataUser.login
          )
          const nameBuf = response.data.filter(
            element => element.user_name == dataUser.userName
          )
          nameBuf.length > 0 && logBuf.length > 0
            ? alert('Измените имя и логин, такие уже существуют')
            : nameBuf.length > 0
            ? alert('Измените имя, такое уже существует')
            : logBuf.length > 0
            ? alert('Измените логин, такой уже существует')
            : (submitForm(dataUser), setdataUser(''), setRedirect(true))
        })
    } else alert('Все поля должны иметь минимум 4 символа')
  }

  const onChange = event => {
    event.persist()
    setdataUser(dataUser => {
      return { ...dataUser, [event.target.name]: event.target.value }
    })
  }

  const submitForm = userData => {
    console.log(userData)
    fetch('http://localhost:3000/reg', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }
  return (
    <div className="form">
      <div>Регистрация</div>
      <input
        className="userName"
        name="userName"
        type="text"
        value={dataUser.userName}
        onChange={onChange}
        placeholder=" Имя"
      />
      <input
        className="login"
        name="login"
        type="text"
        value={dataUser.login}
        onChange={onChange}
        placeholder=" Логин"
      />
      <input
        className="password"
        name="password"
        type="password"
        value={dataUser.password}
        onChange={onChange}
        placeholder=" Пароль"
      />
      <button className="btn" name="reg" onClick={onClick}>
        Зарегистрироваться
      </button>
    </div>
  )
}
