const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const ApiError = require('../../utils/ApiError');
const { measurementService, stationService } = require('../../services');

const router = express.Router();

router
	.route('/json/measurements')
	.get(auth(), async (req, res) => {
    options = {limit: Number.MAX_SAFE_INTEGER};
    const result = await measurementService.queryMeasurements({}, options);
	  res.send(result.results);
  });

router
	.route('/json/stations')
	.get(auth(), async (req, res) => {
    options = {limit: Number.MAX_SAFE_INTEGER};
    const result = await stationService.queryStations({}, options);
	  res.send(result.results);
  });

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Export
 *   description: to export
 */
/**
 * /json/measurements
 *   get:
 *     summary: Export measurements db
 *     description: Only logged in users can retrieve all data.
 *     tags: [Export]
 *     security:
 *       - bearerAuth: []
 * /json/stations
 *   get:
 *     summary: Export stations db
 *     description: Only logged in users can retrieve all data.
 *     tags: [Export]
 *     security:
 *       - bearerAuth: []
 */