const mongoose = require('mongoose');

const competitionPhotoSchema = new mongoose.Schema({
    competitionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competition',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String },
    image: {
        data: Buffer,
        contentType: String
    },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const CompetitionPhoto = mongoose.model('CompetitionPhoto', competitionPhotoSchema);
module.exports = CompetitionPhoto;
