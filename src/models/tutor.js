import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const TutorSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        middleName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            required: true,
        },
        university: {
            type: String,
            required: true,
        },
        currentJobStatus: {
            type: String,
            required: true,
        },
        pitch: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        bankAccountNumber: {
            type: Number,
            required: true,
        },
        bankAccountName: {
            type: String,
            required: true,
        },
        serviceType: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        subjects: {
            type: [String],
            required: true
        },
        gradeLevels: {
            type: [Number],
            required: true
        },
        workingDays: {
            type: [String],
            lowercase: true,
            required: true
        },
        locations: {
            type: [String],
            lowercase: true,
            required: true
        },
        clientsWorkedWith: {
            type: Number
        },
        currentClients: {
            type: Number
        },
        totalHoursWorked: {
            type: Number
        },
        totalAmountEarned: {
            type: Number
        },
        rating: {
            type: Number
        },
        availability: {
            type: Boolean
        },
        jobs: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Job'
                }
            ]
        },
    },
    {
        collection: 'tutors',
    }
);

TutorSchema.plugin(timestamps);

TutorSchema.index({ createdAt: 1, updatedAt: 1 });

export const Tutor = mongoose.model('Tutor', TutorSchema);
export const TutorTC = composeWithMongoose(Tutor);
