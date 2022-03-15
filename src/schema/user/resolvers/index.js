import {UserTC} from "../../../models/user";

import {authentication, authorization} from "../../../middlewares";
// import Resolvers from "./services";
//
// for (const resolver in Resolvers) {
//     UserTC.addResolver(Resolvers[resolver]);
// }

const UserQuery = {
    userById: UserTC.getResolver("findById", [authentication.isAuth, authorization]),
    userByIds: UserTC.getResolver("findByIds", [authentication.isAuth, authorization]),
    userOne: UserTC.getResolver("findOne", [authentication.isAuth, authorization]),
    userMany: UserTC.getResolver("findMany", [authentication.isAuth, authorization]),
};

const UserMutation = {
    userCreateOne: UserTC.getResolver("createOne", [authentication.isAuth, authorization]),
    userCreateMany: UserTC.getResolver("createMany", [authentication.isAuth, authorization]),
    userUpdateById: UserTC.getResolver("updateById", [authentication.isAuth, authorization]),
    userUpdateOne: UserTC.getResolver("updateOne", [authentication.isAuth, authorization]),
    userUpdateMany: UserTC.getResolver("updateMany", [authentication.isAuth, authorization]),
    userRemoveById: UserTC.getResolver("removeById", [authentication.isAuth, authorization]),
    userRemoveOne: UserTC.getResolver("removeOne", [authentication.isAuth, authorization]),
    userRemoveMany: UserTC.getResolver("removeMany", [authentication.isAuth, authorization]),
};

export {UserQuery, UserMutation};