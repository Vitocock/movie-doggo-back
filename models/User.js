const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  email : {
    type : String,
    lowercase : true,
    required : [true, "Email is required."]
  },
  username : {
    type : String,
    required : [true, "Username is required."]
  },
  password : {
    type : String,
    require : [true, "Password is required."],
    minLength : [8, "The password must have at least 8 characters"],
  },
  collections : Array,
  salt : {
    type : String,
    require : [true, "Salt is required."]
  }
}, { timestamps : true })
// timestamps agrega campos de creacion y de actualizacion

const User = model('User', userSchema)

module.exports = User