import { Schema } from "mongoose";

export const ChildSchema = new Schema({
  hoursPerDay: {
    type: Number,
  },
  pricePerHour: {
    type: Number,
  },
  gradeLevel: {
    type: Number,
  },
  subjects: {
    type: [String],
    default: [],
  },
  dateStarted: {
    type: Date,
  },
});

export default ChildSchema;
