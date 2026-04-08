const express = require("express");
const app = express();
require("dotenv").config();
const { forgotPassword } = require("../controllers/userController");
const port = process.env.PORT || 5000;
const { apiLimiter } = require("../middleware");

// Server hardware information
const si = require("systeminformation");
si.cpu()
  .then((data) => {
    console.log("--Server Information--");
    console.log("Brand: " + data.brand);
    console.log("Physical cores: " + data.physicalCores);
    console.log("Speed: " + data.speed);
  })
  .catch((error) => console.error(error));

// cors management
const cors = require("cors");
app.options(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      "https://acquired-winter-369109.firebaseapp.com",
    ],
    optionsSuccessStatus: 200,
  }),
);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://acquired-winter-369109.firebaseapp.com",
    ],
    optionsSuccessStatus: 200,
  }),
);
// mongo
require("../config/db");

// routes
const userRouter = require("../routes/userRoutes");
const formRouter = require("../routes/formRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);
app.use(apiLimiter);

app.use("/api/users", userRouter);
app.use("/api/forms", formRouter);

app.post("/api/forgot-password", forgotPassword);
// app.get("/api/forgot-password/:id/:token", resetPasswordFormLink);
//app.post("/api/forgot-password/:id/:token", verifyAndResetPassword);

app.get("/", (req, res) => {
  res.send("FMS api");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
