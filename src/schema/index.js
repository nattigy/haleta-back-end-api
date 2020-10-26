import { SchemaComposer } from "graphql-compose";
import { UserQuery, UserMutation } from "./user";
import { TutorQuery, TutorMutation } from "./tutor";
import { JobQuery, JobMutation } from "./job";
import { PaymentQuery, PaymentMutation } from "./payment";

import db from "../utils/db"; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...UserQuery,
  ...TutorQuery,
  ...JobQuery,
  ...PaymentQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...TutorMutation,
  ...JobMutation,
  ...PaymentMutation,
});

export default schemaComposer.buildSchema();
