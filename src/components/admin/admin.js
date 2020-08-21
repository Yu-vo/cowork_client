import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom'

import { AddPlace } from './add-place/add-place'
import DeletePlace from './delete-place/delete-place'
// import UpdatePlace from './update-place/update-place'

import './admin.css'
import { DeleteUser } from '@components/admin/delete-user/delete-user'

export const Admin = () => {
  const links = [
    { name: 'Добавление  мест', to: '/admin-add', className: 'admin-add' },
    { name: 'Удаление  мест', to: '/admin-delete', className: 'admin-delete' },
    {
      name: 'Удаление пользователей и их информации',
      to: '/admin-user-delete',
      className: 'admin-user-delete',
    },
    // { name: 'Обновление', to: '/admin-update', className: 'admin-update' },
  ]
  const routes = [
    { component: <AddPlace />, path: '/admin-add' },
    { component: <DeletePlace />, path: '/admin-delete' },
    { component: <DeleteUser />, path: '/admin-user-delete' },
    // { component: <UpdatePlace />, path: '/admin-update' },
  ]
  const Links = links.map(link => (
    <Link key={link.to} to={link.to} className={link.className}>
      {link.name}
    </Link>
  ))

  const Routes = routes.map(route => (
    <Route key={route.path + 'adminn'} path={route.path}>
      {route.component}
    </Route>
  ))

  return (
    <Router>
      <div className="menu-admin">{Links}</div>
      <Switch>{Routes}</Switch>
    </Router>
  )
}
