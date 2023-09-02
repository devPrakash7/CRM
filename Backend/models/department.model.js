const mongoose = require('mongoose');
const constants = require('../config/constants')
const dateformat = require("../helper/dateformat.helper")


// Define the Department Schema
const departmentSchema = new mongoose.Schema({

name: {
    type: String,
    unique: true, // Ensure department names are unique
  },
  description: String,
  location:String,
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
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


departmentSchema.methods.toJSON = function () {
  const department = this;
  const departmentObject = department.toObject();
  return departmentObject;
};


// Create the Department model
const Department = mongoose.model('department', departmentSchema);

module.exports = Department;
