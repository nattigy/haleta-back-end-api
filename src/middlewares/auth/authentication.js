import jwt from "jsonwebtoken";

// import redis from "../config/redis-config";
import { UserModel } from "../../models/user";

const authentication = async (req, res, next) => {
  console.log("nathnael1")
  try {
    const {
      headers: { authorization },
    } = req;
    if (!authorization) {
      return next();
      return Promise.reject(new Error("Access denied. No token provided."));
    }

    const accessToken = authorization.split(" ")[1];

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decoded) {
      return next();
    }

    // const isExpired = await redis.get(`expiredToken:${accessToken}`);
    // if (isExpired) {
    //   return next();
    // }

    if (decoded.exp * 1000 < Date.now()) {
      return next();
      return Promise.reject(new Error("Expired or invalidated token."));
    }

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return next();
      return Promise.reject(new Error("Expired or invalidated token."));
    }

    console.log("nathnael")
    Object.assign(req, {
      user: {name: "nathnael"},
      accessToken,
    });

    return next();
  } catch (error) {
    return Promise.reject(new Error("Error Happened!"));
  }
};

export { authentication };


// ------------- authorization ------------------

// let check_user_action = async (req,action,resource) =>{
//   if(!['updateOwn','deleteOwn'].includes(action)){
//     return true
//   }
//
//   const userResource = new Set()
//
//   if(resource == 'tender'){
//     let userTender = await Tender.find({ creator_user: req.user._id })
//     userTender.forEach(tender => userResource.add(`${tender._id}`))
//
//   }else if(resource == 'company'){
//     let userCompany = await Company.find({ creator_user: req.user._id })
//     userCompany.forEach(company => userResource.add( `${company._id}`))
//
//   }else if(resource == 'award'){
//     let userAward = await Award.find({ creator_user: req.user._id })
//     userAward.forEach(award => userResource.add(`${award._id}`))
//   }
//
//   if(!userResource.has(req.params.id)){
//     return false
//   }
//
//   return true
// }
//
//
//
// exports.authorize = function (action, resource) {
//   return async (req, res, next) => {
//     try {
//       const permission = roles.can(req.user.role)[action](resource);
//
//       if (!permission.granted) {
//         return res.status(401).send("You don't have enough permission to perform this action");
//       }
//
//       let result = await check_user_action(req,action,resource)
//       if(!result){
//         return res.status(401).send({ param: resource , msg: `You are not authorized to edit this ${resource}.` })
//       }
//
//       next()
//     } catch (error) {
//       return res.status(401).send("You don't have enough permission to perform this action")
//     }
//   }
// }
