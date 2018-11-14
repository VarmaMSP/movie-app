// @flow
import type { State } from 'types/store'
import type { ComponentType } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getLoggedInUser } from 'selectors/user'
import AppContent from 'components/app_content/app_content'

function mapStateToProps (state: State) {
  return {
    loggedIn: Boolean(getLoggedInUser(state))
  }
}

export default (withRouter(
  connect(mapStateToProps)(AppContent)
): ComponentType<{}>)
