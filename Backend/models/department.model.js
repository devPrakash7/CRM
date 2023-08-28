const mongoose = require('mongoose');
const constants = require('../config/constants')

// Define the Department Schema
const departmentSchema = new mongoose.Schema({

departmentName: {
    type: String,
    unique: true, // Ensure department names are unique
  },
  description: String,
  status:{
    type:String,
    default:constants.DEPARTMENT_STATUS[1]
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
  deleted_at :{
      type:String,
      default:null
  }
});


departmentSchema.methods.toJSON = function () {
  const department = this;
  const departmentObject = department.toObject();
  return departmentObject;
};


// Create the Department model
const Department = mongoose.model('department', departmentSchema);

module.exports = Department;
