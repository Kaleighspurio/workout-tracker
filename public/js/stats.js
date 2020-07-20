// get all workout data from back-end

fetch('/api/workouts/range')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    populateChart(data);
  });

API.getWorkoutsInRange();

function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}
function populateChart(data) {
  // Lets just use the last 10 workouts to display the data
  const reducedData = data.slice(-10);
  console.log(reducedData);
  // I added this so the date will appear on the chart
  const dates = [];
  reducedData.forEach((workout) => {
    date = workout.day;
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    dates.push(new Date(date).toLocaleDateString(options));
  });
  console.log(dates);

  let durations = duration(reducedData);
  let pounds = calculateTotalWeight(reducedData);
  let workouts = workoutNames(reducedData);
  // let poundsPerExercise = poundsPerExercise(reducedData);
  // let durationPerExcercise = durationPerExcercise(reducedData);
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  // **** This is silly because it will only ever display the first 7 workouts in the database.....
  // It will never display the newer ones past the 1st 7....
  // And the days of the week won't necessarily line up with
  // the day that the workout was done on.
  // TODO: Make this better...
  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      // changed this so that the actual date of the workouts would appear instead of an arbitrary weekday.
      labels: dates,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Excercises Performed',
          backgroundColor: colors,
          data: durationPerExcercise(reducedData),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Excercises Performed (minutes)',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Excercises Performed (pounds)',
          backgroundColor: colors,
          data: poundsPerExercise(reducedData),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Excercises Performed (pounds)',
      },
    },
  });
}

// ***** I changed this so that it calculates the total workout duration for the line graph
// before it only took the duration of the first exercise.
function duration(data) {
  let durations = [];
  data.forEach((workout) => {
    const exercises = workout.exercises;
    let totalDuration = 0;
    exercises.forEach((exercise) => {
      totalDuration = exercise.duration + totalDuration;
    });
    durations.push(totalDuration);
  });

  console.log(durations);
  return durations;
}

// This function is only used on the first pie chart to display
// it displays the duration of each individual exercise
function durationPerExcercise(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });

  return durations;

}

// I fixed/refactored this so that is displays information that makes sense.
// It now adds together the weights for each workout and displays them correctly on the chart
// (it was functional with the starter code, but wasn't logically displayed- it didn't add together the weight of all exercises if there would multiple exercises per workout. Now it does)
function calculateTotalWeight(data) {
  const totals = [];
  data.forEach((workout) => {
    const exercises = workout.exercises;
    let workoutTotalWeight = 0;
    exercises.forEach((exercise) => {
      if (exercise.weight) {
        workoutTotalWeight = workoutTotalWeight + exercise.weight;
      }
    });
    // push each totalweight to the totals array
    totals.push(workoutTotalWeight);
  });
  return totals;
}

function poundsPerExercise(data) {
  let total = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      total.push(exercise.weight);
    });
  });

  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}
