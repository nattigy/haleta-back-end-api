import jwt from "jsonwebtoken";
import {UserModel} from "../../../../models/user";

const signIn = {
    name: "signIn",
    type: "AccessToken!",
    args: {
        phoneNumber: "String!",
        password: "String!",
    },
    resolve: async ({
                        args: {
                            phoneNumber,
                            password,
                        },
                    }) => {
        try {
            // const user = await UserModel.phoneNumberExist(phoneNumber);
            // if (!user) {
            //     return Promise.reject(new Error("User not found."));
            // }
            const user = await UserModel.find({phoneNumber});

            // const comparePassword = await user.comparePassword(password.toString());
            // if (!comparePassword) {
            //     return Promise.reject(new Error("Password is incorrect."));
            // }

            console.log(user)
            const accessToken = await jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });

            return {
                accessToken,
                // roles: user.roles,
                user,
            };
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default signIn;