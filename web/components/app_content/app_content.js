// @flow
import type { Location } from 'react-router-dom'

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Profile from 'components/profile'
import Discover from 'components/discover'
import LoginModal from 'components/login_modal'
import MovieDetails from 'components/movie_details'
import SearchResults from 'components/search_results'

type Props = {|
  location: Location,
  loggedIn: boolean
|}

const AppContent = ({ location: { pathname }, loggedIn }: Props) => {
  const redirect = pathname !== '/login' && !loggedIn
    ? <Redirect to='/login' />
    : pathname === '/login' && loggedIn
      ? <Redirect to='/' />
      : undefined

  return (
    <>
      { redirect }
      <Switch>
        <Route exact path='/' component={Discover} />
        <Route exact path='/login' component={LoginModal} />
        <Route exact path='/results' component={SearchResults} />
        <Route exact path='/movie/:movieId' component={MovieDetails} />
        <Route exact path='/profile/:userId?' component={Profile} />
        <Redirect to='/' />
      </Switch>
    </>
  )
}

export default AppContent
