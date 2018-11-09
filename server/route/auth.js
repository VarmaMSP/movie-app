import express from 'express'
import user from 'model/user'

const router = express.Router()

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  user.find(email, password).then(
    result => res.status(200).json(result),
    err => res.status(err.getRespCode()).json(err.toJson())
  )
})

router.post('/signup', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  user.create(name, email, password).then(
    result => res.status(200).json(result),
    err => res.status(err.getRespCode()).json(err.toJson())
  )
})

export default router
