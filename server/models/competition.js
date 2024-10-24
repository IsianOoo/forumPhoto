const mongoose = require('mongoose');
const { Schema } = mongoose;

const competitionSchema = new Schema({
    title: String,
    description: String,
    endDate: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CompetitionModel = mongoose.model('Competition', competitionSchema);
module.exports = CompetitionModel;
