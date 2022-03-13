import { UserTC } from "../../../models/user";

import { authMiddleware as middleware } from "../../../middlewares/auth/auth-middleware";
import { userValidator as validator } from "../../../middlewares/validators/user-validator";
import Resolvers from "./services";

for (const resolver in Resolvers) {
    UserTC.addResolver(Resolvers[resolver]);
}

const UserQuery = {
    // userById: UserTC.getResolver("findById", [middleware.isAuth, middleware.isAdmin]),
    // userByIds: UserTC.getResolver("findByIds", [middleware.isAuth, middleware.isAdmin]),
    // userOne: UserTC.getResolver("findOne", [middleware.isAuth, middleware.isAdmin]),
    userMany: UserTC.getResolver("findMany", [middleware.isAuth]),
    user: UserTC.getResolver("getUser", [middleware.isAuth]),
};

const UserMutation = {
    // userCreateOne: UserTC.getResolver("createOne", [middleware.isAuth, middleware.isAdmin]),
    // userCreateMany: UserTC.getResolver("createMany", [middleware.isAuth, middleware.isAdmin]),
    // userUpdateById: UserTC.getResolver("updateById", [middleware.isAuth, middleware.isValidated]),
    // userUpdateOne: UserTC.getResolver("updateOne", [middleware.isAuth, middleware.isAdmin]),
    // userUpdateMany: UserTC.getResolver("updateMany", [middleware.isAuth, middleware.isAdmin]),
    // userRemoveById: UserTC.getResolver("removeById", [middleware.isAuth, middleware.isAdmin]),
    // userRemoveOne: UserTC.getResolver("removeOne", [middleware.isAuth, middleware.isAdmin]),
    // userRemoveMany: UserTC.getResolver("removeMany", [middleware.isAuth, middleware.isAdmin]),
    updateUser: UserTC.getResolver("updateUser"), // switchLocale: UserTC.getResolver('switchLocale', [middlewares.isAuth])
};

export { UserQuery, UserMutation };
