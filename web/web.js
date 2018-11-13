// @flow
import type { Store } from 'types/store'

import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Layout, message } from 'antd'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'

import Sidebar from 'components/sidebar'
import Profile from 'components/profile'
import Discover from 'components/discover'
import LoginModal from 'components/login_modal'
import MovieDetails from 'components/movie_details'
import SearchResults from 'components/search_results'
import RedirectIfLoggedout from 'components/redirect_if_loggedout'
import reducers from 'reducers'
import { loadLoginData, saveLoginData } from 'utils/localstorage'

message.config({ maxCount: 4 })

const store: Store = createStore(reducers, (loadLoginData(): any), applyMiddleware(thunk))

store.subscribe(() => saveLoginData(store.getState()))

const AppContent = withRouter(() => (
  <>
    <RedirectIfLoggedout />
    <Switch>
      <Route path='/login' component={LoginModal} />
      <Route path='/profile/:userId?' component={Profile} />
      <Route path='/movie/:movieId' component={MovieDetails} />
      <Route path='/discover' component={Discover} />
      <Route path='/results' component={SearchResults} />
      <Redirect to='/discover' />
    </Switch>
  </>
))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Layout>
        <Sidebar />
        <Layout style={{ marginLeft: 220, height: '100vh', background: '#fff' }}>
          <AppContent />
        </Layout>
      </Layout>
    </Router>
  </Provider>,
  (document.getElementById('app'): any)
)
