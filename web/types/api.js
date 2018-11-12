// @flow

export type ApiState = {|
  loading: { [string]: boolean },
  error: { [string]: Array<string> }
|}
