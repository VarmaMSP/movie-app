// @flow

export type Actor = {|
  id: number,
  name: string,
  poster: ?string
|}

export type CastMember = {|
  ...Actor,
  character: string
|}

export type ActorState = {|
  byId: {[number]: Actor},
  cast: {
    [movieId:number]: Array<{|
      id: number,
      character: string,
    |}>
  }
|}
