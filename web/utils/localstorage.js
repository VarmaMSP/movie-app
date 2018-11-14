// @flow
import type { State } from 'types/store'

export const loadLoginData = () => {
  let loggedInUser
  try {
    loggedInUser = localStorage.getItem('logged-in-user')
  } catch (err) {
    console.log(err)
  }
  return {
    profile: {
      loggedInUser: loggedInUser
        ? JSON.parse(loggedInUser)
        : null
    }
  }
}

export const saveLoginData = (state: State) => {
  try {
    let loggedInUser = JSON.stringify(state.profile.loggedInUser)
    localStorage.setItem('logged-in-user', loggedInUser)
  } catch (err) {
    console.log(err)
  }
}
