// @flow

export class AppError extends Error {
  code: number
  errors: Array<string>

  constructor (code: number, errors: Array<string>) {
    super(errors[0])
    this.code = code
    this.errors = errors
  }

  toString (): string {
    return JSON.stringify(this.errors)
  }
}

export class AuthError extends Error {
  errors: Array<string>

  constructor (errors: Array<string>) {
    super(errors[0])
    this.errors = errors
  }
}
