import { JobModel, JobTC } from "../../models/job";
import { TutorModel } from "../../models/tutor";

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

    return { newJobs, startedJobs: startedJobsCount, finishedJobs: finishedJobsCount };
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
  resolve: async ({ args: { tutorId, jobId } }) => {
    await TutorModel.findByIdAndUpdate(tutorId, {
      $addToSet: {
        jobs: jobId,
      },
    });
    const job = await JobModel.findByIdAndUpdate(jobId, {
      assignedTutor: tutorId,
    });
    return job;
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
  resolve: async ({ args: { tutorId, jobId } }) => {
    await TutorModel.findByIdAndUpdate(tutorId, {
      $pull: {
        jobs: jobId,
      },
      $addToSet: {
        previousJobs: jobId,
      },
    });
    const job = await JobModel.findByIdAndUpdate(jobId, {
      assignedTutor: null,
      $addToSet: { previouslyAssignedTutors: tutorId },
    });
    return job;
  },
};

const jobsFix = {
  name: "jobsFix",
  kind: "mutation",
  type: JobTC,
  args: {},
  resolve: async () => {
    const jobs = await JobModel.find();
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].assignedTutor !== null && jobs[i].status === "Started") {
        await TutorModel.findByIdAndUpdate(jobs[i].assignedTutor, {
          $addToSet: { jobs: jobs[i]._id },
        });
      }
    }
  },
};

export default { jobsInfo, jobAssignTutor, jobRemoveTutor, jobsFix };
