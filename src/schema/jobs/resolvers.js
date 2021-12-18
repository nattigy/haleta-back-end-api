import { JobModel, JobTC } from "../../models/job";
import { TutorModel } from "../../models/tutor";

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
      if (jobs[i].assignedTutor !== null && jobs[i].status === "Started"){
       await TutorModel.findByIdAndUpdate(jobs[i].assignedTutor, {
         $addToSet: {jobs: jobs[i]._id}
       });
      }
    }
  },
};

export default { jobAssignTutor, jobRemoveTutor, jobsFix };
