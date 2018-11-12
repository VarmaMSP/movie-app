// @flow
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LoginModal from 'components/login_modal'

type Props = {|
  loggedIn: boolean
|}

const MainContent = ({ loggedIn }: Props) => (
  <>
    <Switch>
      <Route path='/login' component={LoginModal} />
      <Route path='/discover' component={Discover} />
      <Route component={NoMatch} />
    </Switch>
    { !loggedIn
      ? <Redirect to='/login' />
      : undefined
    }
  </>
)

const NoMatch = () => (
  <h1>Page not found.</h1>
)

const Discover = () => (
  <h1>Discover page</h1>
)

export default MainContent
