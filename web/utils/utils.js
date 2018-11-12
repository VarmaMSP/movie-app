// @flow

// Most rated answer for how to validate a email address.
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export function isValidEmail (email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
  return re.test(email)
}
