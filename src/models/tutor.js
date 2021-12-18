import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";
import { composeWithMongoose } from "graphql-compose-mongoose";

const bankInfoSchema = new Schema({
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
});

const TutorSchema = new Schema(
  {
    firebaseID: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    fullName: {
      type: [String],
      index: true,
    },
    gender: {
      type: [String],
      index: true,
    },
    profilePic: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    status: {
      type: Boolean,
    },
    phoneNumber: {
      type: String,
    },
    education: {
      type: String,
    },
    g12Result: {
      type: Number,
    },
    g10Result: {
      type: Number,
    },
    university: {
      type: String,
    },
    currentJobStatus: {
      type: [String],
      index: true,
    },
    pitch: {
      type: String,
    },
    bankInfo: {
      type: bankInfoSchema,
    },
    serviceType: {
      type: [String],
      index: true,
    },
    subjects: {
      type: [String],
      index: true,
    },
    gradeLevels: {
      type: [Number],
      index: true,
    },
    newGradeLevels: {
      type: [String],
      index: true,
    },
    workingDays: {
      type: [String],
      index: true,
    },
    yourLocation: {
      type: String,
    },
    locations: {
      type: [String],
      index: true,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    clientsWorkedWith: {
      type: Number,
    },
    currentClients: {
      type: Number,
    },
    totalHoursWorked: {
      type: Number,
    },
    totalAmountEarned: {
      type: Number,
    },
    rating: {
      type: Number,
      index: true,
    },
    availability: {
      type: Boolean,
    },
    isBlocked: {
      type: Boolean,
    },
    jobs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Job",
        },
      ],
    },
    previousJobs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Job",
        },
      ],
    },
  },
  {
    collection: "tutors",
  }
);

TutorSchema.plugin(timestamps);
TutorSchema.index({ createdAt: 1, updatedAt: 1 });

const TutorModel = mongoose.model("Tutor", TutorSchema);
const TutorTC = composeWithMongoose(TutorModel);

export { TutorModel, TutorTC, TutorSchema };
