const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const measurementSchema = mongoose.Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    co2: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date, 
      required: true,
    },
    station: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Station',
			required: true,
		},
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
measurementSchema.plugin(toJSON);
measurementSchema.plugin(paginate);

/**
 * @typedef Measurement
 */
const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
