// @flow
import React from 'react'
import { Modal, Row, Col } from 'antd'

import LoginForm from 'components/login_modal/login_form'
import SignupForm from 'components/login_modal/signup_form'

const LoginModal = () => {
  return (
    <Modal
      className='login-modal'
      visible
      closable={false}
      footer={null}
      width={800}
    >
      <Row>
        <Col span={12}>
          <LoginForm />
        </Col>
        <Col span={12}>
          <SignupForm />
        </Col>
      </Row>
    </Modal>
  )
}

export default LoginModal
