const express = require('express')
const app = express();
const getTrainController = require('../controllers/getTrainController')

const router = express.Router();

router.get("/getTrains",getTrainController.handleGetTrain)

module.exports = router;
