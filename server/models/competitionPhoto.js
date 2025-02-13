const mongoose = require('mongoose');

const competitionPhotoSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: {
        data: Buffer,
        contentType: String
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    competitionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true }
});

module.exports = mongoose.model('CompetitionPhoto', competitionPhotoSchema);