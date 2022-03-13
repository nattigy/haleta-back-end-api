import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

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

export {JobModel, JobTC, JobSchema};
