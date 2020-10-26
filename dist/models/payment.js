"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentTC = exports.Payment = exports.PaymentSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PaymentSchema = exports.PaymentSchema = new _mongoose.Schema({
  month: {
    type: String,
    trim: true // required: true,

  },
  deposited: {
    type: Boolean,
    // required: true,
    default: false
  },
  tutorPaid: {
    type: Boolean,
    // required: true,
    default: false
  },
  amount: {
    type: Boolean // required: true,

  },
  refNumber: {
    type: String // required: true,

  },
  bankAccountName: {
    type: String // required: true,

  },
  depositedAt: {
    type: Date // required: true,

  },
  paidAt: {
    type: Date // required: true,

  },
  nextPayment: {
    type: Date // required: true,

  },
  job: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }
}, {
  collection: 'payments'
});
PaymentSchema.plugin(_mongooseTimestamp2.default);
PaymentSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const Payment = exports.Payment = _mongoose2.default.model('Payment', PaymentSchema);

const PaymentTC = exports.PaymentTC = (0, _graphqlComposeMongoose.composeWithMongoose)(Payment);