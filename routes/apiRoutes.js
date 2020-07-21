const router = require('express').Router();

const db = require('../models');

router.get('/workouts', (req, res) => {
  db.Workout.findOne({}, {}, { sort: { day: -1 } })
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/workouts/:id', (req, res) => {
  console.log(req.body, 'This is in the put');
  db.Workout.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/workouts', (req, res) => {
  console.log(req.body, 'this is in the post');
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      console.log(dbWorkout, 'workout posted');
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/workouts/range', (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
