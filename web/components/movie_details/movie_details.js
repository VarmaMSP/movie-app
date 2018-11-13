// @flow
import type { Movie } from 'types/movie'
import type { CastMember } from 'types/actor'

import React, { Component } from 'react'
import { Spin, message, Row, Col, Button, Card } from 'antd'

type Props = {|
  movie: ?Movie,
  cast: Array<CastMember>,
  canBookmart: boolean,
  loading: boolean,
  errors: Array<string>,
  bookmart: ('LIKE' | 'DISLIKE') => void,
  getDetails: () => void,
  clearErrors: () => void
|}

export default class MovieDetails extends Component<Props> {
  componentDidMount () {
    const { errors, clearErrors, getDetails } = this.props
    if (errors) clearErrors()
    getDetails()
  }

  componentDidUpdate () {
    const { errors, clearErrors } = this.props
    if (errors) {
      errors.forEach(err => message.error(err, 3))
      clearErrors()
    }
  }

  render () {
    const { loading, movie, cast, canBookmart, bookmart } = this.props
    if (!movie || !cast) {
      return loading
        ? <Spin size='large' style={{ height: '100vh', 'paddingTop': '45vh' }} />
        : null
    }
    return (
      <>
        <Row className='movie-details'>
          <Col span={5}>
            <img className='movie-poster' src={movie.poster} />
          </Col>
          <Col span={16}>
            <div className='title'>{movie.title}</div>
            <div className='details'>{`${movie.releaseDate.slice(0, 4)} • ${movie.language}`}</div>
            <div>{movie.overview}</div>
            <div className='rating'>{`${movie.rating} / 10`}</div>
            { canBookmart
              ? <div className='bookmart'>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => bookmart('LIKE')}
                >
                  Like
                </Button>
                <Button
                  onClick={() => bookmart('DISLIKE')}
                >
                  Dislike
                </Button>
              </div>
              : undefined
            }
          </Col>
        </Row>
        <br /><br />
        <Row>
          <Col span={5} />
          {
            cast.map(c => (
              <Col span={3} key={c.id}>
                <Card
                  bordered={false}
                  style={{ width: 120 }}
                  cover={<img src={c.poster} />}
                >
                  <Card.Meta
                    title={c.name}
                    description={c.character}
                  />
                </Card>
              </Col>
            ))
          }
        </Row>
      </>
    )
  }
}
