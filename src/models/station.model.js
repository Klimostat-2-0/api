const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const stationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roomNr: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    co2_limit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
stationSchema.plugin(toJSON);
stationSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The stations name
 * @param {ObjectId} [excludeStationId] - The id of the station to be excluded
 * @returns {Promise<boolean>}
 */
 stationSchema.statics.isNameTaken = async function (name, excludeStationId) {
  const station = await this.findOne({ name, _id: { $ne: excludeStationId } });
  return !!station;
};

/**
 * @typedef Station
 */
const Station = mongoose.model('Station', stationSchema);

module.exports = Station;
