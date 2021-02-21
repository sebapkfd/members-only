const mongoose = require('mongoose');
const {Schema} = mongoose;

const MsgSchema = new Schema(
    {
        title: {type: String, required: true, maxlength: 20, minlength: 1},
        text: {type: String, required: true, maxlength: 200, minlength: 1},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        timestamp: {type: String, required: true},
    }
)

module.exports = mongoose.model('Msg', MsgSchema);