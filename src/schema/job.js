import { JobTC } from '../models/job';

const JobQuery = {
    jobById: JobTC.getResolver('findById'),
    jobByIds: JobTC.getResolver('findByIds'),
    jobOne: JobTC.getResolver('findOne'),
    jobMany: JobTC.getResolver('findMany'),
    jobCount: JobTC.getResolver('count'),
    jobConnection: JobTC.getResolver('connection'),
    jobPagination: JobTC.getResolver('pagination'),
};

const JobMutation = {
    jobCreateOne: JobTC.getResolver('createOne'),
    jobCreateMany: JobTC.getResolver('createMany'),
    jobUpdateById: JobTC.getResolver('updateById'),
    jobUpdateOne: JobTC.getResolver('updateOne'),
    jobUpdateMany: JobTC.getResolver('updateMany'),
    jobRemoveById: JobTC.getResolver('removeById'),
    jobRemoveOne: JobTC.getResolver('removeOne'),
    jobRemoveMany: JobTC.getResolver('removeMany'),
};

export { JobQuery, JobMutation };