const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  }
  ,
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,

  },
  phone_number: {
    type: Number,
  },
  password: {
    type: String,
    min: 6,
    max: 12,
    required: true
  },


  date_created: {
    type: Date,
    default: Date.now
  },
  bio: {
    type: String,
    default: ""
  },

  picture: {
    type: String,
  },

  role: {
    type: String,
    enums: ["User", "Admin"],
    default: "User",
    required: true
  },

  savedPets: {
    type: [Schema.Types.ObjectId],
    ref: 'Pet'
  },
  adoptedPets: {
    type: [Schema.Types.ObjectId],
    ref: 'Pet'
  },
  fosteredPets: {
    type: [Schema.Types.ObjectId],
    ref: 'Pet'
  },
});


userSchema.statics.findUserByEmail = async function (email) {
  try {
    const emailLowerCase = email.toLowerCase();
    const user = await this.findOne({ email: emailLowerCase })
    return user;
  }
  catch (err) {
    console.log(err)
  }
}


userSchema.statics.createUser = async function (newUser) {
  try {
    const register = await this.create(newUser)
    return register;
  }
  catch (err) {
    console.log(err)
  }
}

userSchema.statics.findAll = async function (params) {
  try {
    const allUsers = await this.find()
      .sort({ name: 1 })
      .skip(params.page > 0 ? ((params.page - 1) * params.limit) : 0)
      .limit(params.limit)
    return allUsers;
  }
  catch (err) {
    console.log(err)
  }
}


module.exports = mongoose.model('User', userSchema)



