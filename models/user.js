const mongoose = require('mongoose');
const {Schema} = mongoose;

//Pass should be encrypted
const UserSchema = new Schema(
    {
        username: {type: String, required: true, maxlength: 20, minlength: 1},
        password: {type: String, required: true, maxlength: 100, minlength: 1},
        status: {type: String, required: true, maxlength: 20, minlength: 1}
    }
)

module.exports = mongoose.model('User', UserSchema);