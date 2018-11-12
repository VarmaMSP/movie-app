// @flow

export type User = {|
  id: number,
  name: string,
  email: string
|}

export type Profile = {|
  userId: number,
  name: string,
  email: string,
  avatar: ?string,
  about: ?string,
  likes: number,
  dislikes: number
|}

export type ProfileState = {|
  byId: {[userId:number]: Profile},
  loggedInUser: ?User
|}
