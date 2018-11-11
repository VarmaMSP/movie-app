// @flow
import React, { Component } from 'react'
import { Input, Button } from 'antd'

type State = {|
  name: string,
  email: string,
  password: string,
  passwordAgain: string
|}

export default class SignupForm extends Component<{}, State> {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordAgain: ''
    }
  }

  handleNameChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const name = e.target.value
      this.setState({ name: name.trim() })
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

  handlePasswordAgainChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const password = e.target.value
      this.setState({ passwordAgain: password.trim() })
    }
  }

  handleSubmit = () => {
    console.log(this.state)
  }

  render () {
    const { name, email, password, passwordAgain } = this.state
    return (
      <div className='signup-form'>
        <h2>{'Signup'}</h2>
        <br />
        <Input
          type='text'
          value={name}
          onChange={this.handleNameChange}
          addonBefore='name'
          placeholder='name'
        />
        <br /><br />
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
          placeholder='password'
        />
        <br /><br />
        <Input
          type='text'
          value={passwordAgain}
          onChange={this.handleEmailChange}
          placeholder='Re enter your password.'
        />
        <br /><br />
        <div className='submit-button'>
          <Button type='primary' size='default'>Signup</Button>
        </div>
      </div>
    )
  }
}
