// @flow
import bcrypt from 'bcrypt'
import validate from 'validate'

export class AppError extends Error {
  respCode: number
  debug: string
  path: string

  constructor (respCode: number, userMsg: string, debugMsg: string, path: string) {
    super(userMsg)
    this.respCode = respCode
    this.debug = debugMsg
    this.path = path
  }

  getRespCode (): number {
    return this.respCode
  }

  toString (): string {
    return this.message
  }

  toJson (): {[string]: any} {
    return {
      error: true,
      message: this.message
    }
  }
}

export function hashPassword (password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 5, (err, hash) => {
      if (err) return reject(err)
      resolve(hash)
    })
  })
}

export function comparePassword (password: string, hash: string): Promise<void> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        return reject(new AppError(
          500, 'Unable to verify password, Something went wrong',
          err.toString(), 'model.user.comparePassword'
        ))
      }
      if (!res) {
        return reject(new AppError(
          400, 'Incorrect password.',
          '', 'model.user.comparePassword'
        ))
      }
      resolve()
    })
  })
}

export function validateEmail (email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const err = validate({ from: email }, { from: { email: true } })
    if (err) {
      return reject(new AppError(
        400, 'Please enter a vaild email',
        '', 'model.user.validateEmail'
      ))
    }
    resolve()
  })
}
