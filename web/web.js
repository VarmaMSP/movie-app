// @flow
import type { Store } from 'types/store'

import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Layout, message } from 'antd'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'

import reducers from 'reducers'
import Sidebar from 'components/sidebar'
import AppContent from 'components/app_content'
import { loadLoginData, saveLoginData } from 'utils/localstorage'

const store: Store = createStore(reducers, (loadLoginData(): any), applyMiddleware(thunk))

store.subscribe(() => saveLoginData(store.getState()))

message.config({ maxCount: 4 })

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Sidebar />
        <Layout style={{ marginLeft: 220, paddingLeft: 40, height: '100vh', background: '#fff' }}>
          <AppContent />
        </Layout>
      </Layout>
    </BrowserRouter>
  </Provider>,
  (document.getElementById('app'): any)
)
