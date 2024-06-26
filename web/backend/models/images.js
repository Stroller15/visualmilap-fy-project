const mongoose = require('mongoose');
const { Schema } = mongoose;

const imagesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    image:{
        type: String
    }
    
});

module.exports = mongoose.model('images', imagesSchema)