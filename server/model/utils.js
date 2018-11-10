// @flow
import bcrypt from 'bcrypt'

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

  toString (): string {
    return JSON.stringify({
      error: true,
      message: this.message
    })
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
        console.log(err)
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

export async function saveImage (): Promise<string> {
  return 'to be implemented'
}
