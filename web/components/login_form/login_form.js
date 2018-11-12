// @flow

import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import { isValidEmail } from 'utils/utils'

type Props = {|
  loggedIn: boolean,
  loading: boolean,
  errors: ?Array<string>,
  login: (string, string) => void,
  clearErrors: () => void
|}

type State = {|
  email: string,
  password: string
|}

export default class LoginForm extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

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
    const { login } = this.props
    const { email, password } = this.state

    if (email.length === 0 || password.length === 0) {
      return
    }
    if (!isValidEmail(email)) {
      message.error('Email is not valid.')
      return
    }
    console.log(email, password)
    login(email, password)
  }

  render () {
    const { loading } = this.props
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
          <Button
            loading={loading}
            type='primary'
            size='default'
            onClick={this.handleSubmit}
          >
            login
          </Button>
        </div>
      </div>
    )
  }
}
