import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const ChildSchema = new Schema({
  hoursPerDay: {
    type: Number,
  },
  pricePerHour: {
    type: Number,
  },
  gradeLevel: {
    type: String,
  },
  subjects: {
    type: [String],
    default: [],
  },
  dateStarted: {
    type: Date,
  },
});

export const JobSchema = new Schema(
  {
    customerName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    location: {
      type: String,
    },
    serviceType: {
      type: String,
    },
    learningDays: {
      type: [String],
    },
    startTime: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    forWho: {
      type: String,
    },
    hoursPerDay: {
      type: Number,
    },
    pricePerHour: {
      type: Number,
    },
    focusPoint: {
      type: String,
    },
    ageRange: {
      type: String,
    },
    educationLevel: {
      type: String,
    },
    tutorGender: {
      type: String,
    },
    dateStarted: {
      type: Date,
    },
    dateFinished: {
      type: Date,
    },
    nextPayment: {
      type: Date,
    },
    nextCall: {
      type: Date,
    },
    callFor: {
      type: Boolean,
    },
    numberOfChildren: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Done", "Canceled", "Started", "New"],
    },
    children: {
      type: [ChildSchema],
      default: [],
    },
    payments: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Payment",
        },
      ],
    },
    assignedTutor: {
      type: Schema.Types.ObjectId,
      ref: "Tutor",
    },
  },
  {
    collection: "jobs",
  }
);

JobSchema.plugin(timestamps);

JobSchema.index({createdAt: 1, updatedAt: 1});

export const Job = mongoose.model("Job", JobSchema);
export const JobTC = composeWithMongoose(Job);
