import {UserModel, UserTC} from "../../../../models/user";
import {userService} from "../../../../utils/user-service";

const getUser = {
    name: "getUser",
    type: UserTC,
    resolve: async ({ context: { accessToken } }) => {
        const user = await userService.getUser(accessToken.replace("Bearer ", ""));
        return UserModel.findById(user._id);
    },
};

export default getUser