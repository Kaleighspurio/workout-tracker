const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        trim: true,
        required: true,
      },
      distance: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    },
  ],
  totalDuration: {
    type: Number,
    // get: 
    // set: (exercises) => {
    //     let totalDuration = 0;
    //     exercises.forEach((exercise) => {
    //         totalDuration += exercise.duration;
    //     });
    //     return totalDuration;
    // },
    required: true,
  },
});

// const exercises = WorkoutSchema.get(exercises);

// WorkoutSchema.totalDuration.set((exercises) => {
//   let totalDuration = 0;
//   exercises.forEach((exercise) => {
//     totalDuration += exercise.duration;
//   });
//   return totalDuration;
// });

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
