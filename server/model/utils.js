// @flow
import bcrypt from 'bcrypt'
import path from 'path'
import { outputFile } from 'image-data-uri'

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
      message: [this.message]
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

export async function saveImage (base64URI: ?string): Promise<?string> {
  const filename = `${Math.random().toString(36).substring(7)}.png`
  try {
    await outputFile(base64URI, path.resolve(__dirname, '..', '..', 'docs', 'static', 'img', filename))
  } catch (err) {
    throw new AppError(
      500, 'Something went wrong, could not save avatar.',
      '', 'utils.saveImage'
    )
  }
  return '/img/' + filename
}
