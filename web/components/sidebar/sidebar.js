// @flow
import type { Location } from 'react-router-dom'

import React, { Component } from 'react'
import { Menu, Icon, Input, Layout, Button, message } from 'antd'

type Props = {|
  location: Location,
  loggedIn: boolean,
  loading: boolean,
  errors: ?Array<string>,
  logout: () => void,
  clearErrors: () => void
|}

export default class Sidebar extends Component<Props> {
  componentDidMount () {
    const { errors, clearErrors } = this.props
    if (errors) clearErrors()
  }

  componentDidUpdate () {
    const { errors, clearErrors } = this.props
    if (errors) {
      errors.forEach(err => message.error(err, 3))
      clearErrors()
    }
  }

  render () {
    const { location, loggedIn, logout, loading } = this.props
    const activeMenu = location.pathname === '/discover'
      ? ['1'] : location.pathname === '/profile'
        ? ['2'] : []
    return (
      <Layout.Sider
        className='sidebar'
        theme='light'
        width={220}
      >
        <div className='logo'>
          {'Movie App'}
        </div>
        <Input.Search
          className='search-input'
          placeholder='Search...'
          onSearch={console.log}
        />
        <div className='menu'>
          <Menu mode='vertical' selectedKeys={activeMenu}>
            <Menu.Item key='1'>
              <Icon type='compass' />
              <span className='nav-text'>Discover Movies</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='user' />
              <span className='nav-text'>Your Profile</span>
            </Menu.Item>
          </Menu>
        </div>
        <div className='logout-button'>
          { loggedIn
            ? <Button
              block
              loading={loading}
              onClick={logout}
              type='danger'
            >
                Logout
            </Button>
            : undefined
          }
        </div>
      </Layout.Sider>
    )
  }
}
