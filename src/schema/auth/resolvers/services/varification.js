const verifyRequest = {
    name: "verifyRequest",
    type: "Succeed!",
    resolve: async ({context: {user}}) => {
        try {
            // await userService.verifyRequest(user);

            // userMail.verifyRequest(user, token);

            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const verify = {
    name: "verify",
    type: "AccessToken!",
    args: {token: "String!"},
    resolve: async ({args: {token}}) => {
        try {
            // const user = await UserModel.findOne({
            //   "account.verification.token": token,
            // });
            // if (!user) {
            //   return Promise.reject(new Error("Access Token is not valid or has expired."));
            // }
            //
            // user.set({
            //   account: {
            //     verification: {
            //       verified: true,
            //       token: null,
            //       expiresIn: null,
            //     },
            //   },
            // });
            //
            // await user.save();
            //
            // const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            //   expiresIn: process.env.JWT_EXPIRATION,
            // });

            // userMail.verify(user);

            // return { accessToken };
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default {verify, verifyRequest}