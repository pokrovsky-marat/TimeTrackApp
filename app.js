const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const tourRouter = require("./routes/projectRouter");
const reviewRouter = require("./routes/actRouter");
const viewsRouter = require("./routes/viewsRouter");
const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/globalErrorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const app = express();
const ejs = require("ejs");
const cookieParser = require("cookie-parser");

//Global Middleware
//Security HTTP Headers
app.use(helmet());
//Limit a number of requests from 1 IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);
//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Body parser, reading data from data to req.body
app.use(express.json({ limit: "10kb" })); //Limit body size
app.use(express.urlencoded());
//Cookie-parser
app.use(cookieParser());
//Sanitize against NoSQL query injections
app.use(mongoSanitize());
//Sanitize against XSS
app.use(xss());
//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);
//Serving static files
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use((req, res, next) => {
  req.requestedTime = new Date();
  next();
});

//3) Routes
app.use("/", viewsRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/reviews", reviewRouter);
//4)Handling With Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404)); //Pass "err" to the next middlware function
});

//Global Error Handling
app.use(globalErrorController);
module.exports = app;
