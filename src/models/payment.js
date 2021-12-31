import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";
import { composeWithMongoose } from "graphql-compose-mongoose";

const PaymentSchema = new Schema(
  {
    month: {
      type: String,
      trim: true,
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
    discount: {
      type: Number,
      default: 0,
    },
    netPayment: {
      type: Number,
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
  },
);

PaymentSchema.plugin(timestamps);

PaymentSchema.index({
  createdAt: 1,
  updatedAt: 1,
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);
const PaymentTC = composeWithMongoose(PaymentModel);

export { PaymentModel, PaymentTC, PaymentSchema };
