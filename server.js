const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

mongoose.connect("mongodb://localhost:27017/CRUD", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('DB connection successful');
}).catch(err => {
  console.log(err )
});

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name']
  },
  rating: {
    type: Number,
    default: true,
    unique: true
  },
  price: {
    type: Number,
    required: [true , 'A tour must have a price']
  }
});
const Tour = mongoose.model('Tour' , tourSchema);

const newTour = new Tour({
  name: "Helicopter",
  rating: 4.5,
  price: 100000
});

newTour.save().then((data) => {
  console.log(data)
}).catch((err) => {
  console.log('Err')
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
