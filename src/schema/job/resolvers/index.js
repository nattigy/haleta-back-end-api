import { JobTC } from "../../models/job";
import { PaymentTC } from "../../models/payment";
import { TutorTC } from "../../models/tutor";

import Resolvers from "./resolvers";

for (const resolver in Resolvers) {
    JobTC.addResolver(Resolvers[resolver]);
}

const JobQuery = {
    jobById: JobTC.getResolver("findById"),
    jobByIds: JobTC.getResolver("findByIds"),
    jobOne: JobTC.getResolver("findOne"),
    jobMany: JobTC.getResolver("findMany"),
    jobCount: JobTC.getResolver("count"),
    jobConnection: JobTC.getResolver("connection"),
    jobPagination: JobTC.getResolver("pagination"),
    jobsInfo: JobTC.getResolver("jobsInfo"),
    jobPayments: JobTC.addRelation("payments", {
        resolver: () => PaymentTC.getResolver("findByIds"),
        prepareArgs: {
            _ids: (source) => source.payments,
        },
        projection: { payments: 1 },
    }),
    previouslyAssignedTutors: JobTC.addRelation("previouslyAssignedTutors", {
        resolver: () => TutorTC.getResolver("findByIds"),
        prepareArgs: {
            _ids: (source) => source.previouslyAssignedTutors,
        },
        projection: { previouslyAssignedTutors: 1 },
    }),
    jobTutor: JobTC.addRelation("assignedTutor", {
        resolver: () => TutorTC.getResolver("findById"),
        prepareArgs: {
            _id: (source) => source.assignedTutor,
        },
        projection: { assignedTutor: 1 },
    }),
};

const JobMutation = {
    jobCreateOne: JobTC.getResolver("createOne"),
    jobCreateSubJob: JobTC.getResolver("jobCreateSubJob"),
    jobCreateMany: JobTC.getResolver("createMany"),
    jobUpdateById: JobTC.getResolver("updateById"),
    jobUpdateOne: JobTC.getResolver("updateOne"),
    jobUpdateMany: JobTC.getResolver("updateMany"),
    jobRemoveById: JobTC.getResolver("removeById"),
    jobRemoveOne: JobTC.getResolver("removeOne"),
    jobRemoveMany: JobTC.getResolver("removeMany"),
    jobsFix: JobTC.getResolver("jobsFix"),
    jobAssignTutor: JobTC.getResolver("jobAssignTutor"),
    jobRemoveTutor: JobTC.getResolver("jobRemoveTutor"),
    jobStart: JobTC.getResolver("jobStart"),
    makePayment: JobTC.getResolver("makePayment"),
    startNextMonth: JobTC.getResolver("startNextMonth"),
};

export { JobQuery, JobMutation };
