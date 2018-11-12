// @flow
import React, { Component } from 'react'
import { Input, Button, message } from 'antd'

import { isValidEmail } from 'utils/utils'

type Props = {|
  loggedIn: boolean,
  loading: boolean,
  errors: ?Array<string>,
  signup: (string, string, string) => void,
  clearErrors: () => void
|}

type State = {|
  name: string,
  email: string,
  password: string,
  passwordAgain: string
|}

export default class SignupForm extends Component<Props, State> {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordAgain: ''
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
    const { signup } = this.props
    const { name, email, password, passwordAgain } = this.state

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      return
    }
    if (name.length < 5) {
      message.error('Name should be minimum of 5 characters long.')
      return
    }
    if (!isValidEmail(email)) {
      message.error('Email is not valid.')
      return
    }
    if (password.length < 6) {
      message.error('Password should be minimum of 6 characters long.')
      return
    }
    if (password !== passwordAgain) {
      message.error('Passowords do not match.')
      return
    }
    signup(name, email, password)
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
        />
        <br /><br />
        <Input
          type='email'
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
        <Input
          type='password'
          value={passwordAgain}
          onChange={this.handlePasswordAgainChange}
          placeholder='Re enter your password.'
        />
        <br /><br />
        <div className='submit-button'>
          <Button
            type='primary'
            size='default'
            onClick={this.handleSubmit}
          >
            Signup
          </Button>
        </div>
      </div>
    )
  }
}
