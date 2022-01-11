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

/**
 * @swagger
 * tags:
 *   name: Measurement
 *   description: Measurement management and retrieval
 */

/**
 * @swagger
 * /measurement:
 *   post:
 *     summary: Create a Measurement
 *     description: Only stations can create a Measurement.
 *     tags: [Measurement]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - temperature
 *               - humidity
 *               - co2
 *               - timestamp
 *             properties:
 *               temperature:
 *                 type: integer
 *               humidity:
 *                 type: integer
 *               co2:
 *                 type: integer
 *               timestamp:
 *                 type: string
 *             example:
 *               temperature: 12
 *               humidity: 55
 *               co2: 550
 *               timestamp: 2021-11-30T10:49:04.745+00:00
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Measurement'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Measurements
 *     description: Only logged in users can retrieve all Measurements.
 *     tags: [Measurement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: temperature
 *         schema:
 *           type: number
 *         description: temp.
 *       - in: query
 *         name: humidity
 *         schema:
 *           type: number
 *         description: humid.
 *       - in: query
 *         name: co2
 *         schema:
 *           type: number
 *         description: co2
 *       - in: query
 *         name: timestamp
 *         schema:
 *           type: string
 *         description: timestamp
 *       - in: query
 *         name: fromTimestamp
 *         schema:
 *           type: string
 *         description: timestamp from
 *       - in: query
 *         name: toTimestamp
 *         schema:
 *           type: string
 *         description: timestamp to
 *       - in: query
 *         name: station
 *         schema:
 *           type: string
 *         description: station
 *       - in: query
 *         name: roomNr
 *         schema:
 *           type: integer
 *         description: RoomNumber
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of stations
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Measurement'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /measurement/{id}:
 *   get:
 *     summary: Get a Measurement
 *     description: Logged in users can fetch a measurement
 *     tags: [Measurement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Measurement id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Measurement'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
*/