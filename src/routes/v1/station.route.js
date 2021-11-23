const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const stationValidation = require('../../validations/station.validation');
const stationController = require('../../controllers/station.controller');

const router = express.Router();

router
	.route('/')
	.head(function (req, res) {res.send({})})
	.post(auth('newStation'), validate(stationValidation.createStation), stationController.createStation)
	.get(auth(), validate(stationValidation.getStations), stationController.getStations);

router
	.route('/limit/:stationId')
	.get(validate(stationValidation.getStation), stationController.getStationLimit)

router
	.route('/:stationId')
	.get(auth(), validate(stationValidation.getStation), stationController.getStation)
	.patch(auth('manageStation'), validate(stationValidation.updateStation), stationController.updateStation)
	.delete(auth('manageStation'), validate(stationValidation.deleteStation), stationController.deleteStation);

module.exports = router;