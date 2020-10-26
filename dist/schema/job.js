"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobMutation = exports.JobQuery = undefined;

var _job = require("../models/job");

const JobQuery = {
  jobById: _job.JobTC.getResolver('findById'),
  jobByIds: _job.JobTC.getResolver('findByIds'),
  jobOne: _job.JobTC.getResolver('findOne'),
  jobMany: _job.JobTC.getResolver('findMany'),
  jobCount: _job.JobTC.getResolver('count'),
  jobConnection: _job.JobTC.getResolver('connection'),
  jobPagination: _job.JobTC.getResolver('pagination')
};
const JobMutation = {
  jobCreateOne: _job.JobTC.getResolver('createOne'),
  jobCreateMany: _job.JobTC.getResolver('createMany'),
  jobUpdateById: _job.JobTC.getResolver('updateById'),
  jobUpdateOne: _job.JobTC.getResolver('updateOne'),
  jobUpdateMany: _job.JobTC.getResolver('updateMany'),
  jobRemoveById: _job.JobTC.getResolver('removeById'),
  jobRemoveOne: _job.JobTC.getResolver('removeOne'),
  jobRemoveMany: _job.JobTC.getResolver('removeMany')
};
exports.JobQuery = JobQuery;
exports.JobMutation = JobMutation;