import {SchemaComposer} from "graphql-compose";
import {AuthMutation} from "./auth";
import {UserMutation, UserQuery} from "./user";
import { JobMutation, JobQuery } from "./job";
// import { TutorMutation, TutorQuery } from "./tutor";

// import db from "../utils/db"; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
    ...UserQuery,
    ...JobQuery,
    // ...TutorQuery,
});

schemaComposer.Mutation.addFields({
    ...AuthMutation,
    ...UserMutation,
    ...JobMutation,
    // ...TutorMutation,
});

export default schemaComposer.buildSchema();
