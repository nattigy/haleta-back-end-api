import { Schema } from 'mongoose';

export const ChildSchema = new Schema(
    {
        focusPoint: {
            type: String,
        },
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
            default: []
        },
        dateStarted: {
            type: Date
        },
    }
);

export default ChildSchema;
