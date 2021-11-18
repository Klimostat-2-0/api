const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { stationService } = require('../services');

const createStation = catchAsync(async (req, res) => {
	const station = await stationService.createStation(req.body, req.user);
	res.status(httpStatus.CREATED).send(station);
});

const getStations = catchAsync(async (req, res) => {
	const filter = pick(req.query, ['name','roomNr', 'location']);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const result = await stationService.queryStations(filter, options);
	res.send(result);
});

const getStation = catchAsync(async (req, res) => {
	const station = await stationService.getStationById(req.params.stationId);
	if (!station) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Station not found');
	}
	res.send(station);
});

const updateStation = catchAsync(async (req, res) => {
	const station = await stationService.updateStationById(req.params.stationId, req.body);
	res.send(station);
});

const deleteStation = catchAsync(async (req, res) => {
	await stationService.deleteStationById(req.params.stationId);
	res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
	createStation,
	getStations,
	getStation,
	updateStation,
	deleteStation,
};