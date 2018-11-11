// @flow
import React from 'react'
import { Menu, Icon, Input, Layout } from 'antd'

const Sidebar = () => {
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
        <Menu mode='vertical' defaultSelectedKeys={['1']}>
          <Menu.Item key=''>
            <Icon type='compass' />
            <span className='nav-text'>Discover Movies</span>
          </Menu.Item>
          <Menu.Item key='2'>
            <Icon type='user' />
            <span className='nav-text'>Your Profile</span>
          </Menu.Item>
        </Menu>
      </div>
    </Layout.Sider>
  )
}

export default Sidebar
