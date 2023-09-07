const mongoose = require('mongoose');



// Define the Department Schema
const rolemanagementSchema = new mongoose.Schema({

  userType:{
    type:String,
  },
  role:{
    type:String
  },
  email:{
    type:String,
  },
  name:String,
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


rolemanagementSchema.methods.toJSON = function () {
  const rolemanagement = this;
  const rolemanagementObject = rolemanagement.toObject();
  return rolemanagementObject;
};


// Create the Department model
const rolemanagement = mongoose.model('rolemanagement', rolemanagementSchema);

module.exports = rolemanagement;
