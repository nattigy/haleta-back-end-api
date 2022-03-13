import { UserTC } from "../../../models/user";

// import { authMiddleware as middleware } from "../../../middlewares/auth/auth-middleware";
// import { userValidator as validator } from "../../../middlewares/validators/user-validator";
import Resolvers from "./services";

for (const resolver in Resolvers) {
    UserTC.addResolver(Resolvers[resolver]);
}

const AuthMutation = {
    signIn: UserTC.getResolver("signIn"),
    signUp: UserTC.getResolver("signUp"),
    // signUp: UserTC.getResolver("signUp", [middleware.isGuest, validator.signUp]),
    // signUp: UserTC.getResolver("signUp", [middleware.isPhoneVerified, middleware.isGuest, validator.signUp]),
    // logout: UserTC.getResolver('logout', [middleware.isAuth]),
    // verifyRequest: UserTC.getResolver("verifyRequest", [middleware.isAuth, middleware.isUnverified]),
    // verify: UserTC.getResolver("verify"),
    // resetPassword: UserTC.getResolver("resetPassword", [middleware.isGuest, validators.resetPassword]),
    // newPassword: UserTC.getResolver("newPassword", [middleware.isGuest, validators.newPassword]),
    // changePassword: UserTC.getResolver("changePassword", [middleware.isAuth, validators.changePassword]),
};

export { AuthMutation };
