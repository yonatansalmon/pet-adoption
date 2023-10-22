const User = require('../models/userSchema')

async function userExists(req, res, next) {
  try {
    const { email } = req.body
    const user = await User.findUserByEmail(email.toLowerCase())
    if (!user) {
      const err = new Error("This email doesn't match a registered user")
      err.statusCode = 400
      return next(err)
    }
    req.body.user = user
    next()
  } catch (err) {
    console.log(err)
  }
}


module.exports = { userExists }