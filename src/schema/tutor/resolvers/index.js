import {TutorTC} from "../../../models/tutor";

// import Resolvers from "./services";
//
// for (const resolver in Resolvers) {
//     TutorTC.addResolver(Resolvers[resolver]);
// }

const TutorQuery = {
    tutorById: TutorTC.getResolver("findById"),
    tutorByIds: TutorTC.getResolver("findByIds"),
    tutorOne: TutorTC.getResolver("findOne"),
    tutorMany: TutorTC.getResolver("findMany"),
    tutorCount: TutorTC.getResolver("count"),
    tutorConnection: TutorTC.getResolver("connection"),
    tutorPagination: TutorTC.getResolver("pagination"),
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
};

export {TutorQuery, TutorMutation};
