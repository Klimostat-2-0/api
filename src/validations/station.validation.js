const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createStation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.string().required(),
    roomNr: Joi.number().integer().required(),
  }),
};

const getStations = {
  query: Joi.object().keys({
    name: Joi.string(),
    location: Joi.string(),
    roomNr: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStation = {
  params: Joi.object().keys({
    stationId: Joi.string().custom(objectId),
  }),
};

const updateStation = {
  params: Joi.object().keys({
    stationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      location: Joi.string(),
      roomNr: Joi.number().integer(),
    })
    .min(1),
};

const deleteStation = {
  params: Joi.object().keys({
    stationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStation,
  getStations,
  getStation,
  updateStation,
  deleteStation,
};