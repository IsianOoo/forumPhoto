const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationVotesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    competitionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competition',
        required: true
    },
    photoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
        required: true
    },


});

const ApplicationVotesModel = mongoose.model('ApplicationVotes', applicationVotesSchema);
module.exports = ApplicationVotesModel;
