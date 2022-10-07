const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()

const verifyPassword = (password, password2) => {
  if (password.length <= 8 ) {
    return "Password must have at least 8 characters."
  } 
  if (password.length >= 20) {
    return "Password mustn't have more than 20 characters."
  }
  if (password !== password2) {
    return "Passwords doesn't match."
  }
}

const isUser = async (username) => {
  const usedUsername = await User.findOne({ username })
  if (usedUsername) return `The username "${username}" has already been taken.`
}

const verifyEmail = async (email) => {
  if (!email.match(/^[\w-\.]+@[\w-\.]+\.[\w]{2,4}$/g)) {
    return "Invalid Email."
  }
  const usedEmail = await User.findOne({ email })
  if (usedEmail) return `The email "${email}" has already been taken.`
}

const signJwt = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_STR)
}

const register = async ( data ) => {
  const { password, email, password2, username } = data
  
  const invalidPassword = verifyPassword(password, password2)
  const invalidEmail = await verifyEmail(email)
  const invalidUser = await isUser(username)
  
  if (invalidPassword) return { success : false, message : invalidPassword };
  if (invalidEmail) return { success : false, message : invalidEmail };
  if (invalidUser) return { success : false, message : invalidUser}


  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const userData = { password : hashed, email, username, salt }
    const user = await User.create(userData)
    user.save()

    const jwt = signJwt(user._id)
    return { success : true, message : jwt }

  } catch (e) {
    return { success : false, message : "An error has ocurred, please try again later." }
  } 
}

const login = async (data) => {
  const { email, password } = data

  try { 
    const user = await User.findOne({ email })
    if (!user) return { success : false, message : "Invalid email or password." }

    const matchPassword = bcrypt.compare(password, user.password)
    if (!matchPassword) return { success : false, message : "Invalid email or password." }

    const jwt = signJwt(user._id)
    return { success : true, message : jwt }

  } catch (e) {
    return { success : false, message : "An error has ocurred, please try again later." }
  }

}

module.exports.register = register
module.exports.login = login