"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlCompose = require("graphql-compose");

var _user = require("./user");

var _tutor = require("./tutor");

var _job = require("./job");

var _payment = require("./payment");

var _db = require("../utils/db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
const schemaComposer = new _graphqlCompose.SchemaComposer();
schemaComposer.Query.addFields({ ..._user.UserQuery,
  ..._tutor.TutorQuery,
  ..._job.JobQuery,
  ..._payment.PaymentQuery
});
schemaComposer.Mutation.addFields({ ..._user.UserMutation,
  ..._tutor.TutorMutation,
  ..._job.JobMutation,
  ..._payment.PaymentMutation
});
exports.default = schemaComposer.buildSchema();