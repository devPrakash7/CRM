const mongoose = require('mongoose');


// Schema for employee leave requests
const leaveSchema = new mongoose.Schema({

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
  },
  leaveType: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  status: {
    type: String,
    enum:["Pending" , "Approved" , "Rejected"], // Pending, Approved, Rejected, etc.
    default: 'Pending',
  },
  Approved_by:{
    type:String,
    default:null
  },
  comments: String,
  updated_at: String
});


leaveSchema.methods.toJSON = function () {
  const leave = this;
  const leaveObject = leave.toObject();
  return leaveObject;
};


const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
