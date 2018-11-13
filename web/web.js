// @flow
import type { Store } from 'redux'
import type { State } from 'types/store'
import type { Action, Dispatch } from 'types/action'

import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Layout, message } from 'antd'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Sidebar from 'components/sidebar'
import Profile from 'components/profile'
import LoginModal from 'components/login_modal'
import MovieDetails from 'components/movie_details'
import SearchResults from 'components/search_results'
import RedirectIfLoggedout from 'components/redirect_if_loggedout'
import reducers from 'reducers'
import { loadLoginData, saveLoginData } from 'utils/localStorage'

message.config({ maxCount: 4 })

const store: Store<State, Action, Dispatch> = createStore(reducers, (loadLoginData(): any), applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Layout>
        <Sidebar />
        <RedirectIfLoggedout />
        <Layout style={{ marginLeft: 220, height: '100vh', background: '#fff' }}>
          <Switch>
            <Route path='/login' component={LoginModal} />
            <Route path='/profile/:userId?' component={Profile} />
            <Route path='/movie/:movieId' component={MovieDetails} />
            <Route path='/results' component={SearchResults} />
            <Route component={() => (<h1>Page not found.</h1>)} />
          </Switch>
        </Layout>
      </Layout>
    </Router>
  </Provider>,
  (document.getElementById('app'): any)
)

store.subscribe(() => saveLoginData(store.getState()))

store.subscribe(() => console.log(store.getState()))
