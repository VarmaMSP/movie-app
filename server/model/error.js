// @flow

export default class AppError extends Error {
  respCode: number
  path: string

  constructor (respCode: number, message: string, path: string) {
    super(message)
    this.respCode = respCode
    this.path = path
  }

  getRespCode (): number {
    return this.respCode
  }

  toString (): string {
    return this.message
  }

  toJson (): {[string]: any} {
    let msg: string
    switch (this.respCode) {
      case 500:
        msg = 'Something went wrong, Cannot Fetch given item.'
        break
      case 404:
        msg = 'Invalid Request.'
        break
      default:
        msg = 'Something went wrong.'
    }
    return {
      error: true,
      message: msg
    }
  }
}
