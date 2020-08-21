import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Navbar } from '@components/main/navbar/navbar'
import { Maps } from '@components/map/map'
import { Auth } from '@components/user/auth/auth'
import { Registr } from '@components/user/reg/reg'
import { Admin } from '@components/admin/admin'
import { withGeo } from '@components/geolocated/geolocated'
import { Search } from '@components/main/search/search'

import { PlaceInfo } from './place-info-page/place-info'
import { FavoritePlaces } from '@components/favorite-place/favorite-place'

export const Main = () => {
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    setRedirect(false)
  }, [redirect])
  const history = createBrowserHistory()
  if (window.location.pathname !== '/') {
    history.replace('/')
  }
  return (
    <Router history={history}>
      {redirect && <Redirect to="/" />}
      <Navbar />
      <Switch>
        <Route path="/" component={Search} exact />
        <Route path="/map" component={Maps} />
        <Route path="/geo" component={withGeo} />
        <Route path="/reg">
          <Registr setRedirect={setRedirect} />
        </Route>
        <Route path="/auth">
          <Auth setRedirect={setRedirect} />
        </Route>
        <Route path="/admin" component={Admin} />
        <Route path="/favorite" component={FavoritePlaces} />
        <Route path="/place-info" component={PlaceInfo} />
      </Switch>
    </Router>
  )
}
