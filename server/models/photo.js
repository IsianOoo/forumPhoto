const mongoose = require('mongoose')
const { Schema } = mongoose

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

const photoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const PhotoModel = mongoose.model('Photo', photoSchema);

module.exports = PhotoModel;