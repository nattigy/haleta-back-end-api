import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {UserModel} from "../../../../models/user";

const signUp = {
    name: "signUp",
    type: "AccessToken!",
    args: {
        firstName: "String!",
        middleName: "String!",
        lastName: "String!",
        password: "String!",
        phoneNumber: "String!",
    },
    resolve: async ({
                        args: {
                            firstName,
                            middleName,
                            lastName,
                            password,
                            phoneNumber
                        },
                        context: {
                            phoneVerification,
                        },
                    }) => {
        try {
            console.log("here 1")
            // let user = await UserModel.phoneNumberExist(phoneNumber);
            // if (user) {
            //     console.log("here 2")
            //     return Promise.reject(new Error("Phone Number has already been taken."));
            // }

            // user = await UserModel.emailExist(email);
            // if (user) {
            //   return Promise.reject(new Error("Email has already been taken."));
            // }
            // const salt = bcrypt.genSalt(10);
            // const hash = bcrypt.hashSync(password, salt);

            let user = await new UserModel({
                firstName,
                middleName,
                lastName,
                phoneNumber,
                password,
                // password: hash,
                // roles: [roles.OWNER],
                // account: {
                //     phoneVerification: {
                //         verified: true,
                //         token: phoneVerification,
                //     },
                // },
            }).save();
            console.log("here 3")
            const accessToken = await jwt.sign({
                _id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                // roles: user.roles,
            }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });

            // await userService.verifyRequest(user);

            // userMail.verifyRequest(user, token);

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

export default signUp;