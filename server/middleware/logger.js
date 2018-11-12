export default (req, res, next) => {
  console.log(`${req.method}: ${req.originalUrl} ${JSON.stringify(req.body, undefined, 2)}`)
  next()
}
