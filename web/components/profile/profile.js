// @flow
import type { Profile as ProfileT } from 'types/profile'

import React, { Component } from 'react'
import { Button, Row, Col, Spin, message, Input } from 'antd'
import { openDialog, onImageSelect } from 'utils/imageuploader'

type Props = {|
  profile: ?ProfileT,
  canEdit: boolean,
  loading: boolean,
  errors: Array<string>,
  getProfile: () => void,
  clearErrors: () => void,
  updateProfile: (string, string) => void
|}

type State = {|
  about: string,
  image: string
|}

export default class Profile extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      about: '',
      image: ''
    }
    onImageSelect((base64image) => this.setState({ image: base64image }))
  }

  componentDidMount () {
    const { errors, clearErrors, getProfile } = this.props
    if (errors) clearErrors()
    getProfile()
  }

  componentDidUpdate () {
    const { errors, clearErrors } = this.props
    if (errors) {
      errors.forEach(err => message.error(err, 3))
      clearErrors()
    }
  }

  handleAboutChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLTextAreaElement) {
      const about = e.target.value
      this.setState({ about })
    }
  }

  handleSubmit = () => {
    const about = this.state.about.trim()
    const image = this.state.image.trim()
    const { updateProfile } = this.props

    if (about.length === 0) {
      message.info('Please fill about.')
      return
    }
    if (image.length === 0) {
      message.info('Please upload image.')
      return
    }
    updateProfile(about, image)
  }

  render () {
    const { loading, profile, canEdit } = this.props
    if (!profile) {
      return loading
        ? <Spin size='large' style={{ height: '100vh', 'paddingTop': '45vh' }} />
        : null
    }

    const { about, image } = this.state
    const { name, email, avatar, about: aboutP, likes, dislikes } = profile
    return (
      <Row className='profile'>
        <Col span={4} offset={2}>
          <img className='avatar'
            src={avatar || image || 'http://via.placeholder.com/200?text=No%20Avatar'}
          />
          <br /><br />
          { canEdit
            ? <Button block onClick={openDialog}>Add avatar</Button>
            : undefined
          }
        </Col>
        <Col span={18} className='details'>
          <div id='name'>{name}</div>
          <div className='others'>{email}</div>
          <div className='others'>{`${likes} likes  ${dislikes} dislikes`}</div>
          {canEdit
            ? <Input.TextArea
              rows={4}
              className='about-input'
              placeholder='Write something about yourself'
              onChange={this.handleAboutChange}
              value={about}
            />
            : <div className='others'>{aboutP}</div>
          }
          {canEdit
            ? <div className='others'>
              <Button type='primary' onClick={this.handleSubmit}>
                {'Update your profile'}
              </Button>
            </div>
            : undefined
          }
        </Col>
      </Row>
    )
  }
}
