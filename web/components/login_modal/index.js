// @flow
import type { State } from 'types/store'
import type { ComponentType } from 'react'

import { connect } from 'react-redux'
import { getLoggedInUser } from 'selectors/user'
import LoginModal from 'components/login_modal/login_modal'

function mapStateToProps (state: State) {
  return {
    loggedIn: Boolean(getLoggedInUser(state))
  }
}

export default (connect(mapStateToProps)(LoginModal): ComponentType<{}>)
