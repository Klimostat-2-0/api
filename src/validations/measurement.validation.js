const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMeasurement = {
  body: Joi.object().keys({
    temperature: Joi.number().required(),
    humidity: Joi.number().required(),
    co2: Joi.number().required(),
    timestamp: Joi.date().required(),
    station: Joi.string().custom(objectId).required(),
  }),
};

const getMeasurements = {
  query: Joi.object().keys({
    temperature: Joi.number(),
    humidity: Joi.number(),
    co2: Joi.number(),
    timestamp: Joi.date(),
    station: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMeasurement = {
  params: Joi.object().keys({
    measurementId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMeasurement,
  getMeasurements,
  getMeasurement,
};