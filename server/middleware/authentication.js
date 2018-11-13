export default (req, res, next) => {
  if (!req.session.user) {
    res.status(401).json({
      error: true,
      message: ['Not Authorized, please login.']
    })
    return
  }
  next()
}
