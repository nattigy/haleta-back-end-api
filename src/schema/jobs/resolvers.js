import { JobModel, JobTC } from "../../models/job";
import { TutorModel } from "../../models/tutor";
import { PaymentModel } from "../../models/payment.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const jobStart = {
  name: "jobStart",
  kind: "mutation",
  type: JobTC,
  args: {
    jobId: "String!",
    startDate: "String!",
  },
  resolve: async ({
                    args: {
                      jobId,
                      startDate,
                    },
                  }) => {
    const nextPayment = new Date(new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000);
    const payment = await PaymentModel.create({
      month: months[new Date(nextPayment).getMonth()],
      tutorPaid: false,
      totalHours: 0,
      amount: 0,
      ourCut: 0,
      netPayment: 0,
      paymentAt: nextPayment,
      depositedAt: null,
      paidAt: null,
      job: jobId,
    });
    await JobModel.findByIdAndUpdate(jobId, {
      status: "Started",
      startDate,
      nextPayment,
      callForPayment: false,
      nextCall: new Date(new Date(startDate).getTime() + 15 * 24 * 60 * 60 * 1000),
      $addToSet: { payments: payment._id },
    });
  },
};

const startNextMonth = {
  name: "startNextMonth",
  kind: "mutation",
  type: JobTC,
  args: {
    jobId: "String!",
    startDate: "String!",
  },
  resolve: async ({
                    args: {
                      jobId,
                      startDate,
                    },
                  }) => {
    const nextPayment = new Date(new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000);
    const payment = await PaymentModel.create({
      month: months[new Date(nextPayment).getMonth()],
      tutorPaid: false,
      totalHours: 0,
      amount: 0,
      ourCut: 0,
      netPayment: 0,
      paymentAt: nextPayment,
      depositedAt: null,
      paidAt: null,
      job: jobId,
    });
    await JobModel.findByIdAndUpdate(jobId, {
      nextPayment,
      callForPayment: false,
      nextCall: new Date(new Date(startDate).getTime() + 15 * 24 * 60 * 60 * 1000),
      $addToSet: { payments: payment._id },
    });
  },
};

const makePayment = {
  name: "makePayment",
  kind: "mutation",
  type: JobTC,
  args: {
    jobId: "String!",
    paymentId: "String!",
    totalHours: "Float!",
    amount: "Float!",
    ourCut: "Float!",
    netPayment: "Float!",
    depositedAt: "String!",
  },
  resolve: async ({
                    args: {
                      jobId,
                      paymentId,
                      totalHours,
                      amount,
                      ourCut,
                      netPayment,
                      depositedAt,
                    },
                  }) => {
    const payment = await PaymentModel.findByIdAndUpdate(paymentId, {
      totalHours,
      amount,
      ourCut,
      netPayment,
      depositedAt,
    });
    await JobModel.findByIdAndUpdate(jobId, {
      $addToSet: {
        paymentsArchive: {
          totalHours,
          amount,
          ourCut,
          netPayment,
          depositedAt,
          month: payment.month,
        },
      },
      $pull: { payments: paymentId },
    });
    await PaymentModel.findByIdAndDelete(paymentId);
  },
};

const jobCreateSubJob = {
  name: "jobCreateSubJob",
  kind: "mutation",
  type: JobTC,
  args: {
    jobId: "String!",
  },
  resolve: async ({ args: { jobId } }) => {
    const job = await JobModel.findById(jobId);
    const newJob = await JobModel.create({
      ...job._doc,
      main: false,
      parentJob: job._id,
      assignedTutor: null,
      previouslyAssignedTutors: [],
      subJobs: [],
      payments: [],
      paymentsArchive: [],
    });
    await JobModel.findByIdAndUpdate(jobId, {
      $addToSet: { subJobs: newJob._id },
    });
    return newJob;
  },
};

const jobsInfo = {
  name: "jobsInfo",
  kind: "mutation",
  type: "JobsInfo",
  args: {},
  resolve: async () => {
    const newJobs = await JobModel.find({ status: "New" }).count();
    const startedJobs = await JobModel.find({ status: "Started" });
    const finishedJobs = await JobModel.find({ status: "Done" });
    let startedJobsCount = 0;
    let finishedJobsCount = 0;
    startedJobs.map(startedCount);

    function startedCount(job) {
      startedJobsCount += job.numberOfChildren;
      if (job.numberOfChildren === 0)
        startedJobsCount += 1;
    }

    finishedJobs.map(finishedCount);

    function finishedCount(job) {
      finishedJobsCount += job.numberOfChildren;
      if (job.numberOfChildren === 0)
        finishedJobsCount += 1;
    }

    return {
      newJobs,
      startedJobs: startedJobsCount,
      finishedJobs: finishedJobsCount,
    };
  },
};

const jobAssignTutor = {
  name: "jobAssignTutor",
  kind: "mutation",
  type: JobTC,
  args: {
    tutorId: "String!",
    jobId: "String!",
  },
  resolve: async ({
                    args: {
                      tutorId,
                      jobId,
                    },
                  }) => {
    await TutorModel.findByIdAndUpdate(tutorId, {
      $addToSet: {
        jobs: jobId,
      },
    });
    return JobModel.findByIdAndUpdate(jobId, {
      assignedTutor: tutorId,
    });
  },
};

const jobRemoveTutor = {
  name: "jobRemoveTutor",
  kind: "mutation",
  type: JobTC,
  args: {
    tutorId: "String!",
    jobId: "String!",
  },
  resolve: async ({
                    args: {
                      tutorId,
                      jobId,
                    },
                  }) => {
    await TutorModel.findByIdAndUpdate(tutorId, {
      $pull: {
        jobs: jobId,
      },
      $addToSet: {
        previousJobs: jobId,
      },
    });
    return JobModel.findByIdAndUpdate(jobId, {
      assignedTutor: null,
      $addToSet: { previouslyAssignedTutors: tutorId },
    });
  },
};

const jobsFix = {
  name: "jobsFix",
  kind: "mutation",
  type: JobTC,
  args: {},
  resolve: async () => {
    const jobs = await JobModel.find();
    jobs.map(async j => {
      await JobModel.findByIdAndUpdate(j._id, {
        main: true,
      });
    });
  },
};

export default {
  jobStart,
  jobsInfo,
  jobAssignTutor,
  jobRemoveTutor,
  jobsFix,
  makePayment,
  startNextMonth,
  jobCreateSubJob,
};
