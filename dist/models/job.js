"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobTC = exports.Job = exports.JobSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const JobSchema = exports.JobSchema = new _mongoose.Schema({
  customerName: {
    type: String // required: true,

  },
  phoneNumber: {
    type: Number // required: true,

  },
  location: {
    type: String,
    // required: true,
    lowercase: true
  },
  serverType: {
    type: String // required: true,

  },
  learningDays: [String],
  startTime: {
    type: String // required: true,

  },
  hoursPerDay: {
    type: Number // required: true,

  },
  pricePerHour: {
    type: Number // required: true,

  },
  tutorGender: {
    type: String,
    // required: true,
    trim: true
  },
  gradeLevel: {
    type: Number // required: true,

  },
  subjects: [String],
  dateStarted: Date,
  payments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  assignedTutor: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Tutor'
  }
}, {
  collection: 'jobs'
});
JobSchema.plugin(_mongooseTimestamp2.default);
JobSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const Job = exports.Job = _mongoose2.default.model('Job', JobSchema);

const JobTC = exports.JobTC = (0, _graphqlComposeMongoose.composeWithMongoose)(Job);