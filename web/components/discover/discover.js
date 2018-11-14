// @flow
import type { Movie } from 'types/Movie'
import type { RouterHistory } from 'react-router-dom'

import React, { Component } from 'react'
import { Spin, Col, Row, Card, message } from 'antd'

type Props = {|
  history: RouterHistory,
  movies: Array<Movie>,
  loading: boolean,
  errors: Array<string>,
  discover: () => void,
  clearErrors: () => void
|}

export default class Discover extends Component<Props> {
  handleMovieSelect = (movieId: number) => {
    const { history } = this.props
    return (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault()
      history.push(`/movie/${movieId}`)
    }
  }

  componentDidMount () {
    const { errors, clearErrors, discover } = this.props
    if (errors) clearErrors()
    discover()
  }

  componentDidUpdate () {
    const { errors, clearErrors } = this.props
    if (errors) {
      errors.forEach(err => message.error(err, 3))
      clearErrors()
    }
  }

  render () {
    const { loading, movies } = this.props
    if (movies.length === 0) {
      return loading
        ? <Spin size='large' style={{ height: '100vh', 'paddingTop': '45vh' }} />
        : null
    }

    let movieCols = movies.map(m => (
      <Col span={4} key={m.id}
        style={{ paddingLeft: 10, marginTop: 20 }}
      >
        <Card
          hoverable
          bordered={false}
          onClick={this.handleMovieSelect(m.id)}
          style={{ width: 160 }}
          cover={<img src={m.poster || 'http://via.placeholder.com/160x250?text=No%20Poster'} />}
        >
          <Card.Meta
            title={m.title}
          />
        </Card>
      </Col>
    ))
    let movieRows = []
    for (let i = 0; i < movieCols.length; i += 6) {
      movieRows.push(
        <Row key={i}>
          { movieCols.slice(i, i + 6) }
        </Row>
      )
    }

    return (
      <>
        <h2> &nbsp;&nbsp;&nbsp;Trending Movies </h2>
        { movies.length > 0
          ? movieRows
          : <h3> &nbsp;&nbsp;&nbsp;No movies found. </h3>
        }
      </>
    )
  }
}
