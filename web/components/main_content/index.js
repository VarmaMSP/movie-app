import type { State } from 'types/store'

import { connect } from 'react-redux'
import { getLoggedInUser } from 'selectors/user'
import MainContent from 'components/main_content/main_content'

function mapStateToProps (state: State) {
  return {
    loggedIn: Boolean(getLoggedInUser(state))
  }
}

export default connect(mapStateToProps, undefined)(MainContent)
