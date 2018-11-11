// @flow

export type User = {|
  name: string,
  email: string
|}

export type Profile = {|
  userId: number,
  name: string,
  email: string,
  avatar: ?string,
  about: ?string
|}

export type ProfileState = {|
  byId: {[userId:number]: Profile},
  loggedinProfile: ?number
|}
