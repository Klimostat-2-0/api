const httpStatus = require('http-status');
const { Station } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Station
 * @param {Object}  stationBody
 * @returns {Promise<Station>}
 */
const createStation = async (stationBody) => {
	if (await Station.isNameTaken(stationBody.name)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
	}
	const station = await Station.create(stationBody);
	return station;
};

/**
 * Query for Stations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStations = async (filter, options) => {
	const stations = await Station.paginate(filter, options);
	return stations;
};

/**
 * Get station by id
 * @param {ObjectId} id
 * @returns {Promise<Station>}
 */
const getStationById = async (id) => {
	return Station.findById(id);
};

/**
 * Update Station by id
 * @param {ObjectId} stationId
 * @param {Object} updateBody
 * @returns {Promise<Station>}
 */
const updateStationById = async (stationId, updateBody) => {
	const station = await getStationById(stationId);
	if (!station) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Station not found');
	}
	if (updateBody.name && (await Station.isNameTaken(updateBody.name))) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
	}
	Object.assign(station, updateBody);
	await station.save();
	return station;
};

/**
 * Delete Station by id
 * @param {ObjectId} stationId
 * @returns {Promise<Station>}
 */
const deleteStationById = async (stationId) => {
	const station = await getStationById(stationId);
	if (!station) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Station not found');
	}
	await station.remove();
	return station;
};

module.exports = {
	createStation,
	queryStations,
	getStationById,
	updateStationById,
	deleteStationById,
};