import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const TutorSchema = new Schema(
    {
        firebaseID: {
            type: String,
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
        price: {
            type: Number,
            index: true,
        },
        priceForG1_4: {
            type: Number,
            index: true
        },
        priceForG5_8: {
            type: Number,
            index: true
        },
        priceForG9_10: {
            type: Number,
            index: true
        },
        priceForG11_12: {
            type: Number,
            index: true
        },
        bankAccountNumber: {
            type: String,
        },
        bankAccountName: {
            type: String,
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
        workingDays: {
            type: [String],
            index: true,
        },
        locations: {
            type: [String],
            index: true,
        },
        startTime: {
            type: String
        },
        endTime: {
            type: String
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
            type: Number,
            index: true,
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
