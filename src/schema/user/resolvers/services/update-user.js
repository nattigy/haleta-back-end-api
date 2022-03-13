import {UserModel} from "../../../../models/user";
import {userService} from "../../../../utils/user-service";

const updateUser = {
    name: "updateUser",
    type: "User!",
    args: {
        firstName: "String",
        lastName: "String",
        email: "String",
        phoneNumber: "String",
    },
    resolve: async ({
                        args: {
                            firstName,
                            lastName,
                            email,
                            phoneNumber,
                        },
                        context: { user },
                    }) => {
        try {
            let {
                account: {
                    verification: { verified },
                },
            } = user, verifyRequest = false;

            if (user.email !== email) {
                const userExist = await UserModel.findOne({ email });
                if (userExist) {
                    return Promise.reject(new Error("Email has already been taken."));
                }
                verified = false;
                verifyRequest = true;
            }

            user.set({
                email,
                firstName,
                lastName,
                account: {
                    verification: {
                        verified,
                    },
                },
            });

            await user.save();

            if (verifyRequest) {
                await userService.verifyRequest(user);

                // userMail.verifyRequest(user, token);
            }

            return user;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default updateUser;