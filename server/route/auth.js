import express from 'express'
import { body } from 'express-validator/check'

import user from 'model/user'
import validationMiddleware from 'middleware/validation'

function signup (req, res) {
  const { name, email, password } = req.body
  user.create((name: string), (email: string), (password: string)).then(
    result => res.status(201).json(result),
    err => res
      .status(err.respCode || 500)
      .set('Content-Type', 'application/json')
      .send(err.toString())
  )
}

function login (req, res) {
  const { email, password } = req.body
  user.get(email, password).then(
    result => {
      req.session.user = result
      res.status(200).json(result)
    },
    err => res
      .status(err.respCode || 500)
      .set('Content-Type', 'application/json')
      .send(err.toString())
  )
}

function logout (req, res) {
  req.session.destroy(() => {
    res.status(200).send()
  })
}

const router = express.Router()

router.post('/signup', [
  body('email').isEmail(),
  body('name').isLength({ min: 5 })
    .withMessage('must be at least 5 chars long'),
  body('password')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
    .matches(/\d/).withMessage('must contain a number'),
  validationMiddleware
], signup)

router.post('/login', [
  body('email').isEmail(),
  body('password')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
    .matches(/\d/).withMessage('must contain a number'),
  validationMiddleware
], login)

router.post('/logout', logout)

export default router
