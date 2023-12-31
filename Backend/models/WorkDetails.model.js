const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const dateFormat = require("../helper/dateformat.helper")



const WorkDetailsSchema = new Schema({

    task_name: {
        type:String
    },
    start_date: {
        type:String,
        default: dateFormat.set_current_timestamp()
    },
    end_date:{
      type:String,
      default:null
    },
    status:{
        type:String,
        default:"inprogress"
    },
    priority:{
        type:String
    },
    assigned_by:{
        type:String
    },
    assigned_to:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'employee',
        },
      ],
    description:String,
    comments:[{
        type:mongoose.Mixed
    }],

  });


  WorkDetailsSchema.methods.toJSON = function () {
    const WorkDetails = this;
    const WorkDetailsObject = WorkDetails.toObject();
    return WorkDetailsObject;
  };


  const WorkDetails = mongoose.model('WorkDetails',WorkDetailsSchema);
  module.exports = WorkDetails;