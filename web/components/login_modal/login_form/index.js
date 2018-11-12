// @flow
import type { State } from 'types/store'
import type { Dispatch } from 'types/action'

import { connect } from 'react-redux'
import { AuthTypes } from 'actions/types'
import { login } from 'actions/entities/auth'
import { isLoading, getErrors } from 'selectors/api'
import LoginForm from 'components/login_modal/login_form/login_form'

function mapStateToProps (state: State) {
  return {
    loading: isLoading(state, [AuthTypes.LOGIN]),
    errors: getErrors(state, [AuthTypes.LOGIN])
  }
}

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    login: (email: string, password: string) => dispatch(login(email, password)),
    clearErrors: () => dispatch({ type: AuthTypes.LOGIN + '_CLEAR', data: undefined })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
