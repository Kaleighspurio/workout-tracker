const router = require('express').Router();

const db = require('../models');

router.get('/workouts', (req, res) => {
  db.Workout.findOne({}, {}, { sort: { day: -1 } })
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(500).json(err)
    });
});

router.put('/workouts/:id', (req, res) => {
  db.Workout.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(500).json(err)
    });
});

router.post('/workouts', (req, res) => {
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      console.log(dbWorkout, 'workout posted');
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(500).json(err)
    });
});

router.get('/workouts/range', (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(500).json(err)
    });
});

module.exports = router;
