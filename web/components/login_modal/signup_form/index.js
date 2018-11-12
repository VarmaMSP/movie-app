// @flow
import type { State } from 'types/store'
import type { Dispatch } from 'types/action'

import { connect } from 'react-redux'
import { AuthTypes } from 'actions/types'
import { signup } from 'actions/entities/auth'
import { isLoading, getErrors } from 'selectors/api'
import SignupForm from 'components/login_modal/signup_form/signup_form'

function mapStateToProps (state: State) {
  return {
    loading: isLoading(state, [AuthTypes.SIGNUP]),
    errors: getErrors(state, [AuthTypes.SIGNUP])
  }
}

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    signup: (name: string, email: string, password: string) => dispatch(signup(name, email, password)),
    clearErrors: () => dispatch({ type: AuthTypes.SIGNUP + '_CLEAR', data: undefined })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
