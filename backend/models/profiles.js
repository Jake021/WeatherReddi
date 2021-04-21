const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PROFILE_SCHEMA = new Schema({
    profile_Name: {type: String, required: true, trim: true, minlength: 3},
    max_temp: {type: Number, required: false},
    min_temp: {type: Number, required: false},
    snowFall: {type: Number, required: false},
    rainFall: {type: Number, required: false},
    max_humidity: {type: Number, required: false},
    min_humidity: {type: Number, required: false},
    Extreme: {type: Boolean, default: false},
    condition: {type: String}
});

const Profile = mongoose.model('Profile', PROFILE_SCHEMA);

module.exports = Profile;
