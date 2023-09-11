const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 

const PayrollmanagementSchema = new Schema({

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
    },
     salary: {
        type:Number
    },
    payroll_period: {
        type: Date,
    },
    deductions: {
      tax: {
        type: Number
     },
      insurance: {
        type: Number
     }
   },
   total_earnings:{
        type:Number
    },
    total_deductions:{
        type:Number
    },
    net_pay:{
        type:Number
    },
    description:String,
    bonuses:[{
        type:mongoose.Mixed
    }],
    status:{
      type:String,
      default:"pending"
    }

  });


  PayrollmanagementSchema.methods.toJSON = function () {
    const Payrollmanagement = this;
    const PayrollmanagementObject = Payrollmanagement.toObject();
    return PayrollmanagementObject;
  };

 
  const Payrollmanagement = mongoose.model('Payrollmanagement', PayrollmanagementSchema);
  module.exports = Payrollmanagement;                                                                                                                                 