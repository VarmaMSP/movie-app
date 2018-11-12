// @flow
import client from 'client'
import { AuthTypes } from 'actions/types'
import { defaultApiThunk } from 'actions/utils'

export function login (email: string, password: string) {
  return defaultApiThunk(
    (a, b) => client.login(a, b),
    [email, password],
    AuthTypes.LOGIN_REQUEST,
    AuthTypes.LOGIN_SUCCESS,
    AuthTypes.LOGIN_FAILURE
  )
}

export function logout () {
  return defaultApiThunk(
    client.logout,
    [],
    AuthTypes.LOGOUT_REQUEST,
    AuthTypes.LOGOUT_SUCCESS,
    AuthTypes.LOGOUT_FAILURE
  )
}

export function signup (name: string, email: string, password: string) {
  return defaultApiThunk(
    (a, b, c) => client.signup(a, b, c),
    [name, email, password],
    AuthTypes.SIGNUP_REQUEST,
    AuthTypes.SIGNUP_SUCCESS,
    AuthTypes.SIGNUP_FAILURE
  )
}
