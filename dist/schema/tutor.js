"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorMutation = exports.TutorQuery = undefined;

var _tutor = require("../models/tutor");

const TutorQuery = {
  tutorById: _tutor.TutorTC.getResolver('findById'),
  tutorByIds: _tutor.TutorTC.getResolver('findByIds'),
  tutorOne: _tutor.TutorTC.getResolver('findOne'),
  tutorMany: _tutor.TutorTC.getResolver('findMany'),
  tutorCount: _tutor.TutorTC.getResolver('count'),
  tutorConnection: _tutor.TutorTC.getResolver('connection'),
  tutorPagination: _tutor.TutorTC.getResolver('pagination')
};
const TutorMutation = {
  tutorCreateOne: _tutor.TutorTC.getResolver('createOne'),
  tutorCreateMany: _tutor.TutorTC.getResolver('createMany'),
  tutorUpdateById: _tutor.TutorTC.getResolver('updateById'),
  tutorUpdateOne: _tutor.TutorTC.getResolver('updateOne'),
  tutorUpdateMany: _tutor.TutorTC.getResolver('updateMany'),
  tutorRemoveById: _tutor.TutorTC.getResolver('removeById'),
  tutorRemoveOne: _tutor.TutorTC.getResolver('removeOne'),
  tutorRemoveMany: _tutor.TutorTC.getResolver('removeMany')
};
exports.TutorQuery = TutorQuery;
exports.TutorMutation = TutorMutation;