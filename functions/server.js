const firebase = require("firebase");
const firebaseConfig = require("./utils/config");
const cors = require("cors");
const workoutRouter = require("./resources/workout/workout.router");
const likeRouter = require("./resources/likes/like.router");
const { signin, signup, protect } = require("./utils/auth");
const app = require("express")();

firebase.initializeApp(firebaseConfig);
app.use(cors({ origin: true }));

app.post("/signin", signin);
app.post("/signup", signup);

app.use("/workouts", protect, workoutRouter);
app.use("/likes", protect, likeRouter);

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.json(err.message);
  } else {
    res.end();
  }
});

module.exports = app;
