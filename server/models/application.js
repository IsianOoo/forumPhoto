const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
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

const ApplicationModel = mongoose.model('Application', applicationSchema);
module.exports = ApplicationModel;
