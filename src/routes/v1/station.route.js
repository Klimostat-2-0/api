const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const stationValidation = require('../../validations/station.validation');
const stationController = require('../../controllers/station.controller');

const router = express.Router();

router
	.route('/')
	.post(auth('getUsers'), validate(stationValidation.createStation), stationController.createStation)
	.get(auth(), validate(stationValidation.getStations), stationController.getStations);

router
	.route('/:stationId')
	.get(auth(), validate(stationValidation.getStation), stationController.getStation)
	.patch(auth('getUsers'), validate(stationValidation.updateStation), stationController.updateStation)
	.delete(auth('manageUsers'), validate(stationValidation.deleteStation), stationController.deleteStation);

module.exports = router;