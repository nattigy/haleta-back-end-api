import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";
import { composeWithMongoose } from "graphql-compose-mongoose";

export const ReferenceSchema = new Schema({
  refNumber: {
    type: String,
  },
  bankAccountName: {
    type: String,
  },
});

export const PaymentSchema = new Schema(
  {
    month: {
      type: String,
      trim: true,
    },
    deposited: {
      type: String,
      default: "NOT_DEPOSITED",
      enum: ["NOT_DEPOSITED", "HALF", "FULL"],
    },
    tutorPaid: {
      type: Boolean,
      default: false,
    },
    totalHours: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    ourCut: {
      type: Number,
    },
    netPayment: {
      type: Number,
    },
    reference: {
      type: [ReferenceSchema],
      default: [],
    },
    bankAccountName: {
      type: String,
    },
    depositedAt: {
      type: Date,
      index: true,
    },
    paidAt: {
      type: Date,
    },
    paymentAt: {
      type: Date,
      index: true,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
  },
  {
    collection: "payments",
  }
);

PaymentSchema.plugin(timestamps);

PaymentSchema.index({ createdAt: 1, updatedAt: 1 });

export const Payment = mongoose.model("Payment", PaymentSchema);
export const PaymentTC = composeWithMongoose(Payment);
