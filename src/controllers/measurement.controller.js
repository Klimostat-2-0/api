const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { measurementService } = require('../services');

const createMeasurement = catchAsync(async (req, res) => {
	const measurement = await measurementService.createMeasurement(req.body);
	res.status(httpStatus.CREATED).send(measurement);
});

const getMeasurements = catchAsync(async (req, res) => {
	const filter = pick(req.query, ['temperature', 'humidity', 'co2', 'timestamp', 'station', 'fromTimestamp', 'toTimestamp']);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const result = await measurementService.queryMeasurements(filter, options);
	res.send(result);
});

const getMeasurement = catchAsync(async (req, res) => {
	const measurement = await measurementService.getMeasurementById(req.params.measurementId);
	if (!measurement) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Measurement not found');
	}
	res.send(measurement);
});

module.exports = {
	createMeasurement,
	getMeasurements,
	getMeasurement,
};