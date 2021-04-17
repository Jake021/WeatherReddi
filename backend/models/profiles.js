const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PROFILE_SCHEMA = new Schema({
    profile_name: {type: String, required: true, trim: true, minlength: 3},
    temp_gte: {type: Number, required: false},
    temp_lte: {type: Number, required: false},
    snowFall: {type: Number, required: false},
    rainFall: {type: Number, required: false},
    humidity_gte: {type: Number, required: false},
    humidity_lte: {type: Number, required: false},
    severeWeather: {type: Boolean, default: false},
    condition: {type: String}
});

const Profile = mongoose.model('Profile', PROFILE_SCHEMA);

module.exports = Profile;
