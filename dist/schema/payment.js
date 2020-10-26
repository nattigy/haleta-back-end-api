"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentMutation = exports.PaymentQuery = undefined;

var _payment = require("../models/payment");

const PaymentQuery = {
  paymentById: _payment.PaymentTC.getResolver('findById'),
  paymentByIds: _payment.PaymentTC.getResolver('findByIds'),
  paymentOne: _payment.PaymentTC.getResolver('findOne'),
  paymentMany: _payment.PaymentTC.getResolver('findMany'),
  paymentCount: _payment.PaymentTC.getResolver('count'),
  paymentConnection: _payment.PaymentTC.getResolver('connection'),
  paymentPagination: _payment.PaymentTC.getResolver('pagination')
};
const PaymentMutation = {
  paymentCreateOne: _payment.PaymentTC.getResolver('createOne'),
  paymentCreateMany: _payment.PaymentTC.getResolver('createMany'),
  paymentUpdateById: _payment.PaymentTC.getResolver('updateById'),
  paymentUpdateOne: _payment.PaymentTC.getResolver('updateOne'),
  paymentUpdateMany: _payment.PaymentTC.getResolver('updateMany'),
  paymentRemoveById: _payment.PaymentTC.getResolver('removeById'),
  paymentRemoveOne: _payment.PaymentTC.getResolver('removeOne'),
  paymentRemoveMany: _payment.PaymentTC.getResolver('removeMany')
};
exports.PaymentQuery = PaymentQuery;
exports.PaymentMutation = PaymentMutation;