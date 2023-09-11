const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const menuSchema = new Schema({
    
    Menu: {
        type: String,
    },
    UserType: {
        type: [
            Number
        ]
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
    isActive: {
        type: Boolean,
        default:true
    }
}
);


menuSchema.methods.toJSON = function () {
    const menu = this;
    const menuObject = menu.toObject();
    return menuObject;
};


const menu = mongoose.model('menu', menuSchema);
module.exports = menu;