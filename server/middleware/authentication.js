export default (req, res, next) => {
  if (!req.session.user) {
    res.status(404).json({
      error: true,
      message: 'Not Authorized'
    })
    return
  }
  next()
}
