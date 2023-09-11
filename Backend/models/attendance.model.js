const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const dateFormat = require("../helper/dateformat.helper")
const constants = require('../config/constants')


const attendanceSchema = new Schema({

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
    },
    // clockIn: {
    //   type: Date,
    //   required: true,
    // },
    // clockOut: {
    //   type: Date,
    // },
    attendance_type: {
        type:String,
        default: constants.ATTENDANCE_STATUS.PRESENT // 'present', 'absent', etc.
    },
    location:{
      type:String
    }

  });


  attendanceSchema.methods.toJSON = function () {
    const attendance = this;
    const attendanceObject = attendance.toObject();
    return attendanceObject;
  };


  const attendance = mongoose.model('attendance', attendanceSchema);
  module.exports = attendance;