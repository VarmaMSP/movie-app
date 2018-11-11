// @flow

type MovieStatus =
    'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled'

export type Movie = {|
  id: number,
  title: string,
  language: string,
  poster: ?string,
  backdrop: ?string,
  status: MovieStatus,
  rating: number,
  releaseDate: string,
  runtime: number,
  opinion?: 'LIKE' | 'DISLIKE'
|}

export type MovieState = {|
  byId: {[number]: Movie},
  searchResults: {
    [query:string]: {
      [page:number]: Array<number>
    }
  }
|}
