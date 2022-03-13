// import admin from "../../config/firebase-config";
import role from "../../utils/roles";
import { userService } from "../../utils/user-service";
import jwt from "jsonwebtoken";

const authMiddleware = {
  isAuth: async (resolve, source, args, context, info) => {
    const { accessToken } = context;

    // const user = await userService.getUser(accessToken?.replace("Bearer ", ""));

console.log("accessToken")
console.log(accessToken)
    const user = jwt.verify(accessToken?.split(" ")[1], process.env.JWT_SECRET);
console.log("user")
console.log(user)
    if (!user) {
      return Promise.reject(new Error("You must be authorized."));
    }

    return resolve(source, args, context, info);
  },
  isGuest: async (resolve, source, args, context, info) => {
    const { user } = context;

    if (user) {
      return Promise.reject(new Error("You have already authorized."));
    }

    return resolve(source, args, context, info);
  },
  isAdmin: async (resolve, source, args, context, info) => {
    const { accessToken } = context;

    const user = await userService.getUser(accessToken?.replace("Bearer ", ""));

    if (!user.roles.includes(role.ADMIN)) {
      return Promise.reject(new Error("Access denied."));
    }

    return resolve(source, args, context, info);
  },
  isOwner: async (resolve, source, args, context, info) => {
    const { accessToken } = context;

    const user = await userService.getUser(accessToken?.replace("Bearer ", ""));

    if (!user.roles.includes(role.OWNER) && !user.roles.includes(role.ADMIN)) {
      return Promise.reject(new Error("Access denied."));
    }

    return resolve(source, args, context, info);
  },
  isPhoneVerified: async (resolve, source, args, context, info) => {
    // const { phoneVerification } = context;
    // let phoneNumber = "";
    //
    // await admin
    //   .auth()
    //   .verifyIdToken(phoneVerification)
    //   .then((decodedToken) => {
    //     phoneNumber = decodedToken.phone_number;
    //   })
    //   .catch(() => Promise.reject(new Error("Error happened!")));
    // if (phoneNumber === "") {
    //   return Promise.reject(new Error("Phone number not detected!"));
    // }
    // context.phoneNumber = phoneNumber;
    // return resolve(source, args, context, info);
  },
  isValidated: async (resolve, source, args, context, info) => {
    const { accessToken } = context;

    const user = await userService.getUser(accessToken?.replace("Bearer ", ""));

    if (user._id.toString() !== args._id.toString()) {
      if (user.roles.includes(role.ADMIN)) {
        return resolve(source, args, context, info);
      }
      return Promise.reject(new Error("Access denied."));
    }

    return resolve(source, args, context, info);
  },
  isVerified: (resolve, source, args, context, info) => {
    const {
      user: {
        account: {
          verification: { verified },
        },
      },
    } = context;

    if (!verified) {
      return Promise.reject(new Error("You must be verified."));
    }
    return resolve(source, args, context, info);
  },
  isUnverified: (resolve, source, args, context, info) => {
    const {
      user: {
        account: {
          verification: { verified },
        },
      },
    } = context;

    if (verified) {
      return Promise.reject(new Error("You have already verified."));
    }
    return resolve(source, args, context, info);
  },
};

export { authMiddleware };
