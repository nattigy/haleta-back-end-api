import { TutorModel, TutorTC } from "../../models/tutor";

const resetTutors = {
  name: "resetTutors",
  kind: "mutation",
  type: TutorTC,
  args: {},
  resolve: async () => {
    const tutors = await TutorModel.find();
    for (let i = 0; i < tutors.length; i++) {
      // const tt = await TutorModel.findById(tutors[i]._id);
      console.log(tutors[i]._id, tutors[i].serviceType, i + 1);
      // if (tt.serviceType.indexOf("in-person") === -1 || tt.serviceType.indexOf("online") === -1){
      //   tt.serviceType.push("in-person");
      // }
      // await tt.save();
    }
  },
};

export default { resetTutors };
