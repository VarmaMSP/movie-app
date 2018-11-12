// @flow
import React from 'react'
import { Modal, Row, Col } from 'antd'
import LoginForm from 'components/login_modal/login_form'
import SignupForm from 'components/login_modal/signup_form'

type Props = {|
  loggedIn: boolean
|}

const LoginModal = ({ loggedIn }: Props) => (
  <Modal
    visible={!loggedIn}
    closable={false}
    footer={null}
    width={800}
  >
    <Row>
      <Col span={12}><LoginForm /></Col>
      <Col span={12}><SignupForm /></Col>
    </Row>
  </Modal>
)

export default LoginModal
