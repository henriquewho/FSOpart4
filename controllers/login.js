/* 
A 'login' in the frontend will cause a http post at /api/login, sending username
and password. We'll get the user from the db. We'll check if the password is correct, 
by comparing the passed pwd and the one from the db with bcrypt.compare. 
If not, return error. Otherwise, create obj userForToken and use it to create the token
with jsonwebtoken, id'ing the logged user. 
The post route will respond with status 200 and an object with: 
- token         - username      - name of the user 
*/

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({error: 'invalid username or password'})
  }

  const userForToken = {
    username: user.username, id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
