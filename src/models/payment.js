import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const PaymentSchema = new Schema(
    {
        month: {
            type: String,
            trim: true,
        },
        deposited: {
            type: Boolean,
            default: false
        },
        tutorPaid: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number,
        },
        refNumber: {
            type: String,
        },
        bankAccountName: {
            type: String,
        },
        depositedAt: {
            type: Date,
        },
        paidAt: {
            type: Date,
        },
        nextPayment: {
            type: Date,
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
