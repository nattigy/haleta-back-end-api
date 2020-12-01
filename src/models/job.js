import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import ChildSchema from "./child";

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
            type: [String]
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
            type: [String],
        },
        ageRange: {
            type: String
        },
        educationLevel: {
            type: String
        },
        tutorGender: {
            type: String,
        },
        dateStarted: {
            type: Date
        },
        dateFinished: {
            type: Date
        },
        numberOfChildren: {
            type: Number,
        },
        status: {
            type: String,
            enum: ['Done', 'Canceled', 'Started', 'New']
        },
        children: {
            type: [ChildSchema],
            default: [],
        },
        payments: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Payment',
                }
            ],
        },
        assignedTutor: {
            type: Schema.Types.ObjectId,
            ref: 'Tutor',
        }
    },
    {
        collection: 'jobs',
    }
);

JobSchema.plugin(timestamps);

JobSchema.index({ createdAt: 1, updatedAt: 1 });

export const Job = mongoose.model('Job', JobSchema);
export const JobTC = composeWithMongoose(Job);
