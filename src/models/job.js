import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";

const PaymentSchema = new Schema(
  {
    month: {
      type: String,
      trim: true,
    },
    tutorPaid: {
      type: Boolean,
      default: false,
    },
    totalHours: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    ourCut: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    netPayment: {
      type: Number,
    },
    depositedAt: {
      type: Date,
      index: true,
    },
    paidAt: {
      type: Date,
    },
  },
);

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

const JobSchema = new Schema(
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
    registrationDate: {
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
      index: true,
    },
    callForPayment: {
      type: Boolean,
    },
    numberOfChildren: {
      type: Number,
    },
    fromWeb: {
      type: Boolean,
      default: false
    },
    main: {
      type: Boolean,
      default: true
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
    paymentsArchive: {
      type: [PaymentSchema],
      default: [],
    },
    assignedTutor: {
      type: Schema.Types.ObjectId,
      ref: "Tutor",
    },
    previouslyAssignedTutors: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Tutor",
        },
      ],
    },
  },
  {
    collection: "jobs",
  },
);

JobSchema.plugin(timestamps);
JobSchema.index({
  createdAt: 1,
  updatedAt: 1,
});

const JobModel = mongoose.model("Job", JobSchema);
const JobTC = composeWithMongoose(JobModel);

schemaComposer.createObjectTC({
  name: "JobsInfo",
  fields: {
    newJobs: "Float!",
    startedJobs: "Float!",
    finishedJobs: "Float!",
  },
});

export { JobModel, JobTC, JobSchema };
