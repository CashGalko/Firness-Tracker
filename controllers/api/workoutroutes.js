const router = require("express").Router();
const { Workout } = require("../../models");

// Builds the workout based on user input
router.post("/workouts", async (req, res) => {
  try {
    const workoutData = await Workout.create({});
    console.log(workoutData);
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates a specific workout based on the ID
router.put("/workouts/:id", async (req, res) => {
  try {
    console.log("Workout ID" + req.params.id)
    console.log("Exercises" + req.body)
    const workoutData = await Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { new: true }
    );
    console.log(workoutData);
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/workouts", async (req, res) => {
  try{
// Sums the duration of all workouts to output a total duration for the specificed time span
    const workoutData = await Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
console.log()
  res.status(200).json(workoutData)
} catch(err) {
    res.status(500).json(err)
}
});

// Specifically gets the workout data for the previous week.
router.get("/workouts/range", async (req,res) => {
    try{
        const workoutData = await Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]).sort({_id: -1}).limit(7)

      res.status(200).json(workoutData)
    } catch(err) {
        res.status(500).json(err)
    }
    });


// deletes the workout.
router.delete("/workouts", async (req,res) => {
    try {
    const workoutData = await Workout.findByIdAndDelete(req.body);
    res.status(200).json(true)
    console.log(workoutData);
} catch(err) {
    res.status(500).json(err)
}
});

module.exports = router;