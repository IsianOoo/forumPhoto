const mongoose = require('mongoose')
const {Schema} = mongoose

const commentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    content: {
        type: String,   
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now  
    }
});

const photoSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [commentSchema]

});

const PhotoModel = mongoose.model('Photo', photoSchema);

module.exports = PhotoModel;