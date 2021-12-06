const httpStatus = require('http-status');
const { Measurement } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Measurement
 * @param {Object}  measurementBody
 * @returns {Promise<Measurement>}
 */
const createMeasurement = async (measurementBody) => {
	const measurement = await Measurement.create(measurementBody);
	return measurement;
};

/**
 * Query for Measurements
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMeasurements = async (filter, options) => {
	if (filter.fromTimestamp) {
		filter.timestamp = {$gt:new Date(filter.fromTimestamp)}
	}
	delete filter.fromTimestamp
	console.log(filter)
	const measurements = await Measurement.paginate(filter, options);
	return measurements;
};

/**
 * Get Measurement by id
 * @param {ObjectId} id
 * @returns {Promise<Measurement>}
 */
const getMeasurementById = async (id) => {
	return Measurement.findById(id);
};

module.exports = {
	createMeasurement,
	queryMeasurements,
	getMeasurementById,
};