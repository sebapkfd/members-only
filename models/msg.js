let mongoose = require('mongoose');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const MsgSchema = new Schema(
    {
        title: {type: String, required: true, maxlength: 20, minlength: 1},
        desc: {type: String, required: true, maxlength: 200, minlength: 1},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        timestamp: {type: String, required: true} //can be type Date
    }
)

module.exports = mongoose.model('Msg', MsgSchema);