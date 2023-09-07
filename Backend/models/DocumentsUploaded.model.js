const mongoose = require('mongoose')
const Schema = mongoose.Schema;




const documentsSchema = new Schema({

    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
    },

    document_type: {
        type: String
    },
    document_name: {
        type: String
    },
    document_url: {
        type: String
    },
    upload_date: {
        type: Date
    }
});


documentsSchema.methods.toJSON = function () {
    const documents = this;
    const documentsObject = documents.toObject();
    return documentsObject;
};


const documents = mongoose.model('document', documentsSchema);
module.exports = documents;