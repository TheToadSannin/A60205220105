const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const router = express.Router();

app.use(express.json());

app.use('/api', require('./routes/fetchTrain.js'))

app.listen(5000, () => {
  console.log("listening");
});
