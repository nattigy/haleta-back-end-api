import { SchemaComposer } from "graphql-compose";
import { AuthMutation } from "./auth";
import { UserQuery, UserMutation } from "./user";
// import { JobMutation, JobQuery } from "./job";
// import { PaymentMutation, PaymentQuery } from "./payment";
// import { TutorMutation, TutorQuery } from "./tutor";

// import db from "../utils/db"; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...UserQuery,
  // ...JobQuery,
  // ...PaymentQuery,
  // ...TutorQuery,
});

schemaComposer.Mutation.addFields({
  ...AuthMutation,
  ...UserMutation,
  // ...JobMutation,
  // ...PaymentMutation,
  // ...TutorMutation,
});

export default schemaComposer.buildSchema();
