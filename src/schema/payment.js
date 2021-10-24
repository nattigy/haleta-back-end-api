import {PaymentTC} from '../models/payment';
import {JobTC} from '../models/job';

const PaymentQuery = {
  paymentById: PaymentTC.getResolver('findById'),
  paymentByIds: PaymentTC.getResolver('findByIds'),
  paymentOne: PaymentTC.getResolver('findOne'),
  paymentMany: PaymentTC.getResolver('findMany'),
  paymentCount: PaymentTC.getResolver('count'),
  paymentConnection: PaymentTC.getResolver('connection'),
  paymentPagination: PaymentTC.getResolver('pagination'),
  paymentJob: PaymentTC.addRelation(
    'job',
    {
      resolver: () => JobTC.getResolver('findById'),
      prepareArgs: {
        _id: (source) => source.job,
      },
      projection: {job: 1},
    }
  ),
};

const PaymentMutation = {
  paymentCreateOne: PaymentTC.getResolver('createOne'),
  paymentCreateMany: PaymentTC.getResolver('createMany'),
  paymentUpdateById: PaymentTC.getResolver('updateById'),
  paymentUpdateOne: PaymentTC.getResolver('updateOne'),
  paymentUpdateMany: PaymentTC.getResolver('updateMany'),
  paymentRemoveById: PaymentTC.getResolver('removeById'),
  paymentRemoveOne: PaymentTC.getResolver('removeOne'),
  paymentRemoveMany: PaymentTC.getResolver('removeMany'),
};

export {PaymentQuery, PaymentMutation};