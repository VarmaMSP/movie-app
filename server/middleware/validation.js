import { validationResult } from 'express-validator/check'

export default (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400)
    res.json({
      error: true,
      message: errors.array().map(
        ({ param, msg }) => `${param} ${msg}`
      )
    })
    return
  }
  next()
}
