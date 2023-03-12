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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
