import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const PaymentSchema = new Schema(
    {
        month: {
            type: String,
            trim: true,
            // required: true,
        },
        deposited: {
            type: Boolean,
            // required: true,
            default: false
        },
        tutorPaid: {
            type: Boolean,
            // required: true,
            default: false
        },
        amount: {
            type: Boolean,
            // required: true,
        },
        refNumber: {
            type: String,
            // required: true,
        },
        bankAccountName: {
            type: String,
            // required: true,
        },
        depositedAt: {
            type: Date,
            // required: true,
        },
        paidAt: {
            type: Date,
            // required: true,
        },
        nextPayment: {
            type: Date,
            // required: true,
        },
        job: {
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }
    },
    {
        collection: 'payments',
    }
);

PaymentSchema.plugin(timestamps);

PaymentSchema.index({ createdAt: 1, updatedAt: 1 });

export const Payment = mongoose.model('Payment', PaymentSchema);
export const PaymentTC = composeWithMongoose(Payment);
