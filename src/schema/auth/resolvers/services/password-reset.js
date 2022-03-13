import crypto from "crypto";
import moment from "moment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const resetPassword = {
    name: "resetPassword",
    type: "Succeed!",
    args: {email: "String!"},
    resolve: async ({args: {email}}) => {
        try {
            const user = await UserModel.findOne({email});
            if (!user) {
                return Promise.reject(new Error("User not found."));
            }

            const token = crypto.randomBytes(48, (err, buffer) => buffer.toString("hex"));
            const expiresIn = moment().add(7, "days");

            user.set({
                account: {
                    resetPassword: {
                        token,
                        expiresIn,
                    },
                },
            });

            await user.save();

            // userMail.resetPassword(user, token);

            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const newPassword = {
    name: "newPassword",
    type: "AccessToken!",
    args: {
        token: "String!",
        newPassword: "String!",
    },
    resolve: async ({
                        args: {
                            token,
                            newPassword,
                        },
                    }) => {
        try {
            const user = await UserModel.findOne({
                "account.resetPassword.token": token,
            });
            if (!user) {
                return Promise.reject(new Error("Access Token is not valid or has expired."));
            }

            const hash = bcrypt.hashSync(newPassword, 10);

            user.set({
                password: hash,
                account: {
                    resetPassword: {
                        token: null,
                        expiresIn: null,
                    },
                },
            });

            await user.save();

            const accessToken = await jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });

            return {accessToken};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const changePassword = {
    name: "changePassword",
    type: "Succeed!",
    args: {
        currentPassword: "String!",
        newPassword: "String!",
    },
    resolve: async ({
                        args: {
                            currentPassword,
                            newPassword,
                        },
                        context: {user},
                    }) => {
        try {
            const comparePassword = await user.comparePassword(currentPassword);
            if (!comparePassword) {
                return Promise.reject(new Error("Current password is incorrect."));
            }

            const hash = bcrypt.hashSync(newPassword, 10);

            user.set({password: hash});

            await user.save();

            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default {resetPassword, newPassword, changePassword}