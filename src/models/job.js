import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const JobSchema = new Schema(
    {
        customerName: {
            type: String,
            // required: true,
        },
        phoneNumber: {
            type: Number,
            // required: true,
        },
        location: {
            type: String,
            // required: true,
            lowercase: true
        },
        serverType: {
            type: String,
            // required: true,
        },
        learningDays: [String],
        startTime: {
            type: String,
            // required: true,
        },
        hoursPerDay: {
            type: Number,
            // required: true,
        },
        pricePerHour: {
            type: Number,
            // required: true,
        },
        tutorGender: {
            type: String,
            // required: true,
            trim: true
        },
        gradeLevel: {
            type: Number,
            // required: true,
        },
        subjects: [String],
        dateStarted: Date,
        payments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Payment'
            }
        ],
        assignedTutor: {
            type: Schema.Types.ObjectId,
            ref: 'Tutor'
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
