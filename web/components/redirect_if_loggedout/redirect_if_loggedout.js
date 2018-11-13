// @flow
import type { RouterHistory, Location } from 'react-router-dom'

import React, { Component } from 'react'

type Props = {|
  history: RouterHistory,
  location: Location,
  loggedIn: boolean
|}

export default class RedirectIfLoggedOut extends Component<Props> {
  componentDidMount () {
    const { location: { pathname }, history, loggedIn } = this.props
    if (pathname !== '/login' && !loggedIn) {
      history.replace('/login')
    }
    if (pathname === '/login' && loggedIn) {
      history.replace('/disocover')
    }
  }

  render () {
    return null
  }
}
