const fs = require("fs");
const express = require("express");
const morgan = require('morgan');

const app = express();


// 1) MIDDLEWARE
app.use(morgan('dev'));

app.use(express.json());

app.use((req , res , next) => {
    console.log("Hello From the middleware");
    next();
})
// app.use((req , res , next) => {
//     req.requestTime = new Date().toISOString();
//     next();
// })
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`)
);

// I use JSON.parse befor reading because this data in json format and i wanna data in Java script object foermat so i use json.parse

// 2) ROUTE HANDLER
const getAllTours = (req, res) => {
    // console.log(requestTime)
  res.status(200).json({
    status: "success",
    dataLength: tours.length,
    // requestedAt: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  let id = req.params.id * 1;
  const tour = tours.find((data) => data.id == id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Write Correct Id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Write Correct Id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Write Correct Id",
    });
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
};

// app.get('/api/v1/tours' , getAllTours);
// app.post('/api/v1/tours' , createTour);
// app.get('/api/v1/tours/:id' , getTour);
// app.patch('/api/v1/tours/:id' , updateTour);
// app.delete('/api/v1/tours/:id' , deleteTour);

// 3) ROUTES

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// 4) SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
