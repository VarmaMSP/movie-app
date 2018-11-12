// @flow
import type { Location } from 'react-router-dom'

import React from 'react'
import { Redirect } from 'react-router-dom'

type Props = {|
  location: Location,
  loggedIn: boolean
|}

const RedirectIfLoggedOut = ({ location: { pathname: path }, loggedIn }: Props) => {
  if (path !== '/login' && !loggedIn) {
    return <Redirect to='/login' />
  }
  if (path === '/login' && loggedIn) {
    return <Redirect to='/discover' />
  }
  return null
}

export default RedirectIfLoggedOut
