"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorTC = exports.Tutor = exports.TutorSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TutorSchema = exports.TutorSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    trim: true // required: true,

  },
  middleName: {
    type: String,
    trim: true // required: true,

  },
  lastName: {
    type: String,
    trim: true // required: true,

  },
  profilePic: {
    type: String // required: true,

  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true // required: true,

  },
  phoneNumber: {
    type: Number // required: true,

  },
  education: {
    type: String // required: true,

  },
  university: {
    type: String // required: true,

  },
  currentJobStatus: {
    type: String // required: true,

  },
  pitch: {
    type: String // required: true,

  },
  price: {
    type: Number // required: true,

  },
  bankAccountNumber: {
    type: Number // required: true,

  },
  bankAccountName: {
    type: String // required: true,

  },
  serviceType: {
    type: String // required: true,

  },
  subjects: {
    type: [String] // required: true

  },
  gradeLevels: {
    type: [Number] // required: true

  },
  location: {
    type: [String],
    lowercase: true // required: true

  },
  jobs: {
    type: [{
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }]
  }
}, {
  collection: 'tutors'
});
TutorSchema.plugin(_mongooseTimestamp2.default);
TutorSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const Tutor = exports.Tutor = _mongoose2.default.model('Tutor', TutorSchema);

const TutorTC = exports.TutorTC = (0, _graphqlComposeMongoose.composeWithMongoose)(Tutor);