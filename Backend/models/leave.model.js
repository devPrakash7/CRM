const mongoose = require('mongoose');

// Schema for employee leave requests
const leaveSchema = new mongoose.Schema({

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String, // Pending, Approved, Rejected, etc.
    default: 'Pending',
  },
  comments: String,
  
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
