// @flow
import type { State } from 'types/store'
import type { Dispatch } from 'types/action'
import type { ComponentType } from 'react'
import type { Location } from 'react-router-dom'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getLoggedInUser } from 'selectors/user'
import { logout } from 'actions/auth'
import { AuthTypes } from 'actions/types'
import { getErrors, isLoading } from 'selectors/api'
import Sidebar from 'components/sidebar/sidebar'

function mapStateToProps (state: State) {
  return {
    loggedIn: Boolean(getLoggedInUser(state)),
    loading: isLoading(state, [AuthTypes.LOGOUT]),
    errors: getErrors(state, [AuthTypes.LOGOUT])
  }
}

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    logout: () => dispatch(logout()),
    clearErrors: () => dispatch({ type: AuthTypes.LOGOUT + '_CLEAR', data: undefined })
  }
}

export default (withRouter(
  (connect(mapStateToProps, mapDispatchToProps)(Sidebar): ComponentType<{location: Location}>)
): ComponentType<{}>)
