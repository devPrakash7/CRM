const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constants = require("../config/constants");
const dateFormat = require("../helper/dateformat.helper");
const { JWT_SECRET } = require("../keys/keys");
const Schema = mongoose.Schema;


//Define user schema
const userSchema = new Schema({

  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  mobileNumber: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    minlength: 8,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department', 
    default:null
  },
  hireDate: {
    type: String,
    default: dateFormat.set_current_timestamp(),
  },
  jobTitle: String,
  user_type: {
    type: Number, // admin-1 , 3-employee , 2-manager
    default: 3,
  },
  age:{
    type:Number
  },
  gender:{
    type:String,
  },
  status: {
    type: Number,
    default: constants.STATUS.ACTIVE,
  },
  tokens: {
    type: String,
  },
  refresh_tokens: {
    type: String,
  },
  refresh_tokens_expires: {
    type: Number,
    default: null,
  },
  verify_token: {
    type: Boolean,
    default: false,
  },
  tempTokens: {
    type: String,
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type:  String,
  },
  deleted_at: {
    type:  String,
    default: null,
  },
});

userSchema.index({
  email: 1,
});

//Checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//Output data to JSON
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return userObject;
};

//Checking for user credentials
userSchema.statics.findByCredentials = async function (
  email,
  password,
  user_type
) {
  const user = await User.findOne({
    $or: [{ email: email }, { user_name: email }],
    user_type: user_type,
    deleted_at: null,
  });

  if (!user) {
    return 1;
  }

  if (!user.validPassword(password)) {
    return 2;
  }

  return user;
};

//Generating auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign(
    {
      _id: user._id.toString(),
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
  // user.tokens = user.tokens.concat({
  //     token
  // });
  user.tokens = token;
  user.updated_at = await dateFormat.set_current_timestamp();
  user.refresh_tokens_expires = await dateFormat.add_time_current_date(
    1,
    "days"
  );
  await user.save();
  return token;
};

userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const refresh_tokens = await jwt.sign(
    {
      _id: user._id.toString(),
    },
    JWT_SECRET
  );
  // user.tokens = user.tokens.concat({
  //     token
  // });
  user.refresh_tokens = refresh_tokens;
  user.updated_at = await dateFormat.set_current_timestamp();
  await user.save();
  return refresh_tokens;
};

//Define user model
const User = mongoose.model("employee", userSchema);
module.exports = User;
