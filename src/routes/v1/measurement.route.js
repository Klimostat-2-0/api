const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const measurementValidation = require('../../validations/measurement.validation');
const measurementController = require('../../controllers/measurement.controller');

const router = express.Router();

router
	.route('/')
	.post(auth('station'), validate(measurementValidation.createMeasurement), measurementController.createMeasurement)
	.get(auth(), validate(measurementValidation.getMeasurements), measurementController.getMeasurements);

router
	.route('/:measurementId')
	.get(auth(), validate(measurementValidation.getMeasurement), measurementController.getMeasurement);

module.exports = router;