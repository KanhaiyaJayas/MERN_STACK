const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tour-routes");
const userRouter = require("./routes/user-routes");

const app = express();

// 1) MIDDLEWARE
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
  app.use(morgan("dev"));
}


app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello From the middleware");
  next();
});
// app.use((req , res , next) => {
//     req.requestTime = new Date().toISOString();
//     next();
// })

// I use JSON.parse befor reading because this data in json format and i wanna data in Java script object foermat so i use json.parse

// 2) ROUTE HANDLER

// 3) ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
