const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const dateFormat = require("../helper/dateformat.helper")



const attendanceSchema = new Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
    },
    date: {
        type:String,
        default:dateFormat.set_current_timestamp();
    },
    status: String // 'present', 'absent', etc.

  });


  attendanceSchema.methods.toJSON = function () {
    const attendance = this;
    const attendanceObject = attendance.toObject();
    return attendanceObject;
  };


  const attendance = mongoose.model('attendance', attendanceSchema);
  module.exports = attendance;