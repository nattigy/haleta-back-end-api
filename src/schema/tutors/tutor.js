import { TutorTC } from "../../models/tutor";
import { JobTC } from "../../models/job";

import Resolvers from "./resolvers";

for (const resolver in Resolvers) {
  TutorTC.addResolver(Resolvers[resolver]);
}

const TutorQuery = {
  tutorById: TutorTC.getResolver("findById"),
  tutorByIds: TutorTC.getResolver("findByIds"),
  tutorOne: TutorTC.getResolver("findOne"),
  tutorMany: TutorTC.getResolver("findMany"),
  tutorCount: TutorTC.getResolver("count"),
  tutorConnection: TutorTC.getResolver("connection"),
  tutorPagination: TutorTC.getResolver("pagination"),
  tutorJobs: TutorTC.addRelation("jobs", {
    resolver: () => JobTC.getResolver("findByIds"),
    prepareArgs: {
      _ids: (source) => source.jobs,
    },
    projection: { jobs: 1 },
  }),
  currentClients: TutorTC.addFields({
    currentClients: {
      type: "Int",
      resolve: (tutor) => (tutor ? tutor.jobs ? tutor.jobs.length : 0 : 0),
    },
  }),
};

const TutorMutation = {
  tutorCreateOne: TutorTC.getResolver("createOne"),
  tutorCreateMany: TutorTC.getResolver("createMany"),
  tutorUpdateById: TutorTC.getResolver("updateById"),
  tutorUpdateOne: TutorTC.getResolver("updateOne"),
  tutorUpdateMany: TutorTC.getResolver("updateMany"),
  tutorRemoveById: TutorTC.getResolver("removeById"),
  tutorRemoveOne: TutorTC.getResolver("removeOne"),
  tutorRemoveMany: TutorTC.getResolver("removeMany"),
  resetTutors: TutorTC.getResolver("resetTutors"),
};

export { TutorQuery, TutorMutation };
