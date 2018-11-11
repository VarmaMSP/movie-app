// @flow

import React, { Component } from 'react'
import { Input, Button } from 'antd'

type State = {|
  email: string,
  password: string
|}

export default class LoginForm extends Component<{}, State> {
  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const email = e.target.value
      this.setState({ email: email.trim() })
    }
  }

  handlePasswordChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const password = e.target.value
      this.setState({ password: password.trim() })
    }
  }

  handleSubmit = () => {
    console.log(this.state)
  }

  render () {
    const { email, password } = this.state
    return (
      <div className='login-form'>
        <h2>{'Login'}</h2>
        <br />
        <Input
          type='text'
          value={email}
          onChange={this.handleEmailChange}
          addonBefore='email'
          placeholder='email'
        />
        <br /><br />
        <Input
          type='password'
          value={password}
          onChange={this.handlePasswordChange}
          addonBefore='password'
        />
        <br /><br />
        <div className='submit-button'>
          <Button type='primary' size='default'>login</Button>
        </div>
      </div>
    )
  }
}
