import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise;

const connection = mongoose.connect(
  "mongodb+srv://nattigy:WBlgKJDacalZ2oK5@cluster0.ifqtm.mongodb.net/haleta-tutors-db?retryWrites=true&w=majority",
  {
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true,
  }
);

mongoose.set("useCreateIndex", true);

connection
  .then((db) => db)
  .catch((err) => {
    console.log(err);
  });

export default connection;
