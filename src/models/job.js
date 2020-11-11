import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

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
        serverType: {
            type: String,
        },
        learningDays: [String],
        startTime: {
            type: String,
        },
        hoursPerDay: {
            type: Number,
        },
        pricePerHour: {
            type: Number,
        },
        tutorGender: {
            type: String,
        },
        gradeLevel: {
            type: Number,
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
