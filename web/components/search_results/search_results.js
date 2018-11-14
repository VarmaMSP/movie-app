// @flow
import type { RouterHistory } from 'react-router-dom'
import type { Movie } from 'types/Movie'
import type { Profile } from 'types/profile'

import React, { Component } from 'react'
import { Spin, Col, Row, Card, message } from 'antd'

type Props = {|
  searchQuery: string,
  history: RouterHistory,
  movies: Array<Movie>,
  profiles: Array<Profile>,
  loading: boolean,
  errors: Array<string>,
  search: (string) => void,
  clearErrors: () => void
|}

type State = {|
  searchQuery: string
|}

export default class SearchResults extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      searchQuery: props.searchQuery
    }
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State) {
    const { searchQuery, search } = nextProps
    if (searchQuery !== prevState.searchQuery) {
      search(searchQuery)
      return { searchQuery }
    }
    return null
  }

  componentDidMount () {
    const { errors, clearErrors, searchQuery, search } = this.props
    if (errors) clearErrors()
    search(searchQuery)
  }

  componentDidUpdate () {
    const { errors, clearErrors } = this.props
    if (errors) {
      errors.forEach(err => message.error(err, 3))
      clearErrors()
    }
  }

  handleMovieSelect = (movieId: number) => {
    const { history } = this.props
    return (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault()
      history.push(`/movie/${movieId}`)
    }
  }

  handleProfileSelect = (userId: number) => {
    const { history } = this.props
    return (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault()
      history.push(`/profile/${userId}`)
    }
  }

  render () {
    const { loading, movies, profiles } = this.props
    if (movies.length === 0 && profiles.length === 0) {
      return loading
        ? <Spin size='large' style={{ height: '100vh', 'paddingTop': '45vh' }} />
        : null
    }

    const moviesR = movies.map(m => (
      <Col span={4} key={m.id}
        style={{ marginLeft: '40px', marginRight: '-30px', marginTop: '20px' }}
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

    const profilesR = profiles.map(p => (
      <Col span={4} key={p.userId}
        style={{ marginLeft: '40px', marginRight: '-30px', marginTop: '20px' }}
      >
        <Card
          hoverable
          bordered={false}
          onClick={this.handleProfileSelect(p.userId)}
          style={{ width: 160 }}
          cover={<img src={p.avatar || 'http://via.placeholder.com/160x160?text=No%20Avatar'} />}
        >
          <Card.Meta
            title={p.name}
          />
        </Card>
      </Col>
    ))

    return (
      <>
        <h2> &nbsp;&nbsp;&nbsp;Movies </h2>
        { movies.length > 0
          ? <Row>{moviesR}</Row>
          : <h3> &nbsp;&nbsp;&nbsp;No movies found. </h3>
        }
        <br /><br />
        <h2> &nbsp;&nbsp;&nbsp;Profiles </h2>
        { profiles.length > 0
          ? <Row>{profilesR}</Row>
          : <h3> &nbsp;&nbsp;&nbsp;No Profiles found. </h3>
        }
      </>
    )
  }
}
