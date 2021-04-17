const Profile = require('../models/profiles');

exports.createProfile = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const profile = new Profile({
    profile_name: req.body.profile_name,
    temp_gte: req.body.temp_gte,
    temp_lte: req.body.temp_lte,
    snowFall: req.body.snowFall,
    rainFall: req.body.rainFall,
    humidity_gte: req.body.humidity_gte,
    humidity_lte: req.body.humidity_lte,
    severeWeather: req.body.severeWeather
  });
  profile
    .save()
    .then(createdProfile => {
      res.status(201).json({
        message: 'Profile added successfully',
        profile: {
          ...createdProfile,
          id: createdProfile._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating Profile failed!'
      });
    });
};

exports.updateProfile = (req, res, next) => {
  const profile = new Profile({
    _id: req.body.id,
    profile_name: req.body.profile_name,
    temp_gte: req.body.temp_gte,
    temp_lte: req.body.temp_lte,
    snowFall: req.body.snowFall,
    rainFall: req.body.rainFall,
    humidity_gte: req.body.humidity_gte,
    humidity_lte: req.body.humidity_lte,
    severeWeather: req.body.severeWeather
  });
  Profile.updateOne({ _id: req.params.id, creator: req.userData.userId }, profile)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update profile!"
      });
    });
};

exports.getProfiles = (req, res, next) => {
  Profile.find()
    .then(profiles => res.json(profiles))
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.getProfile = (req, res, next) => {
  Profile.findById(req.params.id)
    .then(profile => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ message: 'Profile not found!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching profile failed!'
      });
    });
};

exports.deleteProfile = (req, res, next) => {
  Profile.deleteOne({ _id: req.params.id})
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: 'Deletion successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching post failed!'
      });
    });
};