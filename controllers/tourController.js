const Tour  = require('../models/tourModels'); 



// exports.checkBody = (req , res , next) => {
//   if(!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price'
//     })
//   }
//   next();
// }
exports.getAllTours = (req, res) => {
  // console.log(requestTime)
  res.status(200).json({
    status: "success",
    // dataLength: tours.length,
    // requestedAt: req.requestTime,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  let id = req.params.id * 1;
  // const tour = tours.find((data) => data.id == id);
  res.status(200).json({
    status: "success",
    data: {
      // tour: tour,
    },
  });
};

exports.createTour = async (req, res) => {
  try{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    })
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
};