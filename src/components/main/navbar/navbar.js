import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  install_user,
  favorite_reducer,
  type_reducer,
  state_search_reducer,
} from '../../../actions'
import './navbar.css'
import logo from '@assets/logo.svg'
// import { history } from '@components/app'

export const Navbar = () => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false)
  const links = [
    { name: 'COWORK', to: '/', className: 'nav-image', img: logo },
    { name: 'View on map', to: '/map', className: 'nav-map' },
    // { name: 'О нас', to: '/about' },
  ]
  // useEffect(() => {
  //   if (window.location.path !== '/') {
  //     // window.location.replace('http://localhost:8081/')
  //   }
  // }, [])
  const handleExit = () => {
    localStorage.removeItem('token')
    dispatch(install_user(null))
    dispatch(favorite_reducer(null))
    // dispatch(type_reducer(null))
    // dispatch(state_search_reducer(null))
    setRedirect(true)
    // setRedirect(false)
  }
  const menuProfile =
    user != null && user[0] == 'admin' ? (
      <>
        <li>
          <Link to="/admin">Меню админа</Link>
        </li>
        <li>
          <Link to="/favorite">Избранные места</Link>
        </li>
        <li style={{ cursor: 'pointer' }} onClick={handleExit}>
          Выход
        </li>
      </>
    ) : user && user[0] ? (
      <>
        <li>
          <Link to="/favorite">Избранные места</Link>
        </li>
        <li style={{ cursor: 'pointer' }} onClick={handleExit}>
          Выход
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/auth">Авторизация</Link>
        </li>
        <li>
          <Link to="/reg">Регистрация</Link>
        </li>
      </>
    )
  const menuMain = links.map(link => (
    <li key={link.to}>
      <Link to={link.to} className={link.className}>
        {link.name}
        {link.to == '/' && (
          <img className="image" src={link.img} alt="Коворкай"></img>
        )}
      </Link>
    </li>
  ))
  return (
    <>
      {redirect && <Redirect from="/reg" to="/" />}
      <ul className="navbar">
        {menuMain}
        <li className="nav-admin">
          Profile{user && user[0] ? ':' + user[0] : ''}
          <ul className="profile-menu">{menuProfile}</ul>
        </li>
      </ul>
    </>
  )
}
