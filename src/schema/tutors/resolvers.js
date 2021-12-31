import { TutorModel, TutorTC } from "../../models/tutor";

const resetTutors = {
  name: "resetTutors",
  kind: "mutation",
  type: TutorTC,
  args: {},
  resolve: async () => {
    const tutors = await TutorModel.find();
    for (let i = 0; i < tutors.length; i++) {
      console.log(tutors[i]._id);
      let tt = await TutorModel.findById(tutors[i]._id);
      tt.locations = tt.locations.map(l => l.toLowerCase());
      await tt.save();
    }
  },
};

export default { resetTutors };
