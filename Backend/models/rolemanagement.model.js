const mongoose = require('mongoose');
const constants = require('../config/constants')
const dateformat = require("../helper/dateformat.helper")



// Define the Department Schema
const rolemanagementSchema = new mongoose.Schema({


  userType:{
    type:String,
  },
  userTypeName:{
    type:String,
  },
  isActive:{
    type:Boolean,
    default:true
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
});


rolemanagement.methods.toJSON = function () {
  const rolemanagement = this;
  const rolemanagementObject = rolemanagement.toObject();
  return rolemanagementObject;
};


// Create the Department model
const rolemanagement = mongoose.model('rolemanagement', rolemanagementSchema);

module.exports = rolemanagement;
