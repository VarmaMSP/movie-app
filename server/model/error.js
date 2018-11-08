// @flow

export default class AppError extends Error {
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
